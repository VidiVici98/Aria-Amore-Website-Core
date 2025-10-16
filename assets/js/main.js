document.addEventListener("DOMContentLoaded", () => {
  function loadComponent(containerId, filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        return response.text();
      })
      .then(data => {
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = data;
      })
      .catch(err => console.error(err));
  }

  // Call it for header and footer
  loadComponent("site-header-container", "/public/components/header.html"); // <-- adjust path
  loadComponent("site-footer-container", "/public/components/footer.html"); // <-- adjust path
});
// === HAMBURGER MENU TOGGLE ===
document.getElementById("menu-toggle").addEventListener("click", function () {
  let menu = document.getElementById("mobile-menu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
});

// === FLIPPING FORM ===
document.getElementById("flipForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  document.querySelector(".flip-container").classList.add("flipped");
});
function flipBack() {
  document.querySelector(".flip-container").classList.remove("flipped");
}
// main.js - Aria Amore - interactive quote + mini booking funnel
// Assumes the HTML you provided is present. This file is intentionally
// defensive about parsing prices (handles "$500", "$1.500", "$1,500", etc.)

(() => {
  'use strict';

  /* -------------------------
     Helper functions
     ------------------------- */

  // Parse a price string robustly into a number (dollars).
  // Accepts formats like "$500", "$1,500", "$1.500", "$99.99", "75"
  function parsePrice(priceStr) {
    if (!priceStr) return 0;
    // extract first chunk that looks like a price
    const match = priceStr.match(/-?[\d.,]+/);
    if (!match) return 0;
    let s = match[0];

    // If dot is used as thousands separator (e.g. "1.500") we want 1500.
    // Heuristic: if there's a '.' and the group after '.' has length 3 -> thousands separator
    // Otherwise treat '.' as decimal point.
    if (s.includes('.') && s.split('.').pop().length === 3 && !s.includes(',')) {
      s = s.replace(/\./g, ''); // remove thousand dots
    }

    // Remove commas used as thousands separators
    s = s.replace(/,/g, '');

    // Remove any non-digit/period/neg sign (shouldn't be necessary but safe)
    s = s.replace(/[^\d.\-]/g, '');

    // If there's still multiple periods (rare) remove all but first
    const parts = s.split('.');
    if (parts.length > 2) {
      s = parts.shift() + '.' + parts.join('');
    }

    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  }

  // Format number to USD currency (no cents if whole dollar)
  function formatUSD(n) {
    if (Number.isInteger(n)) {
      return '$' + n.toLocaleString();
    } else {
      return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

  // Create a modal element (used for booking)
  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'aa-modal-overlay';
    overlay.innerHTML = `
      <div class="aa-modal" role="dialog" aria-modal="true" aria-label="Booking form">
        <button class="aa-modal-close" aria-label="Close">&times;</button>
        <div class="aa-modal-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  /* -------------------------
     DOM references & state
     ------------------------- */

  const packagePlans = Array.from(document.querySelectorAll('.pricing-table .plan'));
  const quoteContainer = document.querySelector('#quote-container .quote-items') || document.querySelector('#quote-container');
  const addonCheckboxes = Array.from(document.querySelectorAll('.column label.checkbox-btn input[type="checkbox"]'));
  const addonLabels = Array.from(document.querySelectorAll('.column label.checkbox-btn'));
  const quoteButton = document.querySelector('#quote-container .btn') || null; // "Book Now!" button
  let selectedPackage = null; // { el, name, price }
  const selectedAddons = new Map(); // labelEl -> {name, price}

  if (!quoteContainer) {
    console.warn('Quote container not found. Verify HTML structure.');
  }

  /* -------------------------
     Initialize packages
     ------------------------- */

  function readPackageInfo(planEl) {
    const title = planEl.querySelector('h2')?.innerText?.trim() || 'Package';
    const priceText = planEl.querySelector('.price')?.innerText || planEl.querySelector('.price')?.textContent || '';
    const price = parsePrice(priceText);
    return { el: planEl, title, price, rawPriceText: priceText };
  }

  const packages = packagePlans.map(readPackageInfo);

  // Mark first package as default selected
  if (packages.length > 0) {
    selectPackage(packages[0].el);
  }

  /* -------------------------
     Package selection & UI
     ------------------------- */

  function deselectAllPackages() {
    packagePlans.forEach(p => p.classList.remove('selected'));
  }

  function selectPackage(planEl) {
    deselectAllPackages();
    planEl.classList.add('selected');
    const pkg = readPackageInfo(planEl);
    selectedPackage = pkg;
    updateQuoteUI();
  }

  // Attach click listeners to each plan's "Choose Package" button
  packagePlans.forEach(planEl => {
    const btn = planEl.querySelector('a.btn, button.btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        selectPackage(planEl);
        // Smooth scroll quote into view
        document.querySelector('#quote-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    // Also allow clicking the whole plan to select
    planEl.addEventListener('click', (e) => {
      // avoid selecting when clicking on internal interactive elements like links or buttons
      if (e.target.closest('a, button, input')) return;
      selectPackage(planEl);
    });
  });

  /* -------------------------
     Add-ons initialization
     ------------------------- */

  function readAddonFromLabel(labelEl) {
    // Expect the structure: <label><input><span>Label text + $100</span></label>
    const span = labelEl.querySelector('span');
    const text = (span?.innerText || labelEl.innerText || '').trim();
    // Try to parse price from text
    const price = parsePrice(text);
    // name: text without price portion
    const name = text.replace(/[\+\-]?\s*\$?[\d.,]+/g, '').trim() || text;
    return { labelEl, name, price, rawText: text };
  }

  // Build an array of addon objects; attach change listeners
  const addons = addonLabels.map(readAddonFromLabel);

  addons.forEach(({ labelEl, name, price }) => {
    const input = labelEl.querySelector('input[type="checkbox"]');
    if (!input) return;
    input.addEventListener('change', async (e) => {
      if (input.checked) {
        // If the addon didn't have an explicit price (price === 0 and text doesn't include dollar sign),
        // prompt the user to enter a custom price (for "Additional Requests")
        const includesDollar = /\$\s*[\d.,]+/.test(labelEl.innerText);
        if (!includesDollar && price === 0) {
          const response = prompt(`Enter a price (in USD) for "${name}" or press Cancel to keep it unchecked:`, '0');
          if (response === null) {
            // user cancelled -> uncheck
            input.checked = false;
            return;
          }
          const entered = parsePrice(response);
          if (entered <= 0) {
            alert('Please enter a positive number for the custom add-on.');
            input.checked = false;
            return;
          }
          selectedAddons.set(labelEl, { name, price: entered });
        } else {
          selectedAddons.set(labelEl, { name, price });
        }
      } else {
        selectedAddons.delete(labelEl);
      }
      updateQuoteUI();
    });
  });

  /* -------------------------
     Quote UI updater
     ------------------------- */

  function updateQuoteUI() {
    // Clear existing quote area contents and rebuild
    // We will look for specific fields (Package:, Add-Ons:, Total) — but to be robust, we recreate them.
    if (!quoteContainer) return;

    // Find or create wrapper
    const wrapper = quoteContainer;
    wrapper.innerHTML = `
      <h2><b>Quick Quote</b></h2>
      <div class="aa-quote-row"><h3><b>Package:</b></h3><div class="aa-quote-package"></div></div>
      <div class="aa-quote-row"><h3><b>Add-Ons:</b></h3><ul class="aa-quote-addons"></ul></div>
      <img src="/assets/media/images/victorian-separator.svg" width="80%">
      <h3 class="total"><b>Total</b></h3>
    `;

    const pkgEl = wrapper.querySelector('.aa-quote-package');
    const addonsEl = wrapper.querySelector('.aa-quote-addons');
    const totalEl = wrapper.querySelector('.total');

    // Package text
    if (selectedPackage) {
      pkgEl.innerText = `${selectedPackage.title} — ${formatUSD(selectedPackage.price)}`;
    } else {
      pkgEl.innerText = 'No package selected';
    }

    // Addons
    addonsEl.innerHTML = '';
    let addonsTotal = 0;
    for (const addon of selectedAddons.values()) {
      const li = document.createElement('li');
      li.innerText = `${addon.name} — ${formatUSD(addon.price)}`;
      addonsEl.appendChild(li);
      addonsTotal += Number(addon.price || 0);
    }

    // Total
    const packagePrice = selectedPackage ? Number(selectedPackage.price || 0) : 0;
    // Digit-by-digit careful arithmetic: convert to cents to avoid floating rounding issues
    const centsTotal = Math.round((packagePrice + addonsTotal) * 100);
    const finalTotal = centsTotal / 100;
    totalEl.innerText = `Total: ${formatUSD(finalTotal)}`;

    // Ensure Book Now button is present and updated
    if (!document.querySelector('#quote-container .aa-book-now')) {
      const b = document.createElement('button');
      b.className = 'btn aa-book-now';
      b.type = 'button';
      b.innerText = 'Book Now!';
      b.addEventListener('click', openBookingModal);
      // append after the quote
      wrapper.parentElement.appendChild(b);
    }
  }

  /* -------------------------
     Booking modal & funnel (simple)
     ------------------------- */

  let modalOverlay = null;

  function openBookingModal() {
    // Create modal if not present
    if (!modalOverlay) modalOverlay = createModal();
    const body = modalOverlay.querySelector('.aa-modal-body');
    body.innerHTML = '';

    // Pre-fill values
    const packageTitle = selectedPackage ? selectedPackage.title : '';
    const totalText = selectedPackage ? formatUSD(selectedPackage.price + Array.from(selectedAddons.values()).reduce((s, a) => s + a.price, 0)) : formatUSD(0);

    // Build form HTML
    body.innerHTML = `
      <h2>Book a Performance</h2>
      <p><strong>Selected Package:</strong> ${packageTitle}</p>
      <p><strong>Estimated Total:</strong> ${totalText}</p>
      <form id="aa-booking-form" class="aa-booking-form">
        <label>Name: <input name="name" type="text" required></label>
        <label>Email: <input name="email" type="email" required></label>
        <label>Phone: <input name="phone" type="tel"></label>
        <label>Event Date: <input name="date" type="date" required></label>
        <label>Notes / Venue / Time: <textarea name="message" rows="3"></textarea></label>
        <button type="submit" class="btn aa-submit-btn">Submit Request</button>
      </form>
      <div class="aa-booking-status" style="display:none;"></div>
    `;

    // Show overlay
    modalOverlay.style.display = 'block';
    document.body.classList.add('aa-modal-open');

    // Close handlers
    modalOverlay.querySelector('.aa-modal-close').onclick = closeModal;
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) closeModal();
    };

    // Form submit
    const form = modalOverlay.querySelector('#aa-booking-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBookingForm(new FormData(form));
    });
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.style.display = 'none';
    document.body.classList.remove('aa-modal-open');
  }

  function submitBookingForm(formData) {
    const statusEl = modalOverlay.querySelector('.aa-booking-status');
    const submitBtn = modalOverlay.querySelector('.aa-submit-btn');
    submitBtn.disabled = true;
    statusEl.style.display = 'block';
    statusEl.innerText = 'Submitting...';

    // Build payload
    const payload = {
      package: selectedPackage ? selectedPackage.title : null,
      packagePrice: selectedPackage ? selectedPackage.price : 0,
      addons: Array.from(selectedAddons.values()).map(a => ({ name: a.name, price: a.price })),
      total: (selectedPackage ? selectedPackage.price : 0) + Array.from(selectedAddons.values()).reduce((s, a) => s + a.price, 0),
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        message: formData.get('message')
      },
      submittedAt: new Date().toISOString()
    };

    // Simulate API request (replace with fetch to your backend endpoint)
    setTimeout(() => {
      // For now, we just log the payload and show success
      console.log('Booking payload (replace with real API call):', payload);
      statusEl.innerHTML = '<strong>Thanks! Your request has been submitted.</strong><p>We will follow up within 24-48 hours to confirm details.</p>';
      submitBtn.style.display = 'none';
      // Optionally close modal after a timeout
      setTimeout(closeModal, 2500);
    }, 900);
  }

  /* -------------------------
     Accessibility + keyboard
     ------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* -------------------------
     Init & initial render
     ------------------------- */

  // Build initial set of selected addons from any pre-checked checkboxes
  addons.forEach(({ labelEl, name, price }) => {
    const input = labelEl.querySelector('input[type="checkbox"]');
    if (input && input.checked) {
      selectedAddons.set(labelEl, { name, price });
    }
  });

  updateQuoteUI();

  // Expose a small API for future JSON-driven integration
  window.AriaAmore = window.AriaAmore || {};
  window.AriaAmore.getQuote = function () {
    return {
      package: selectedPackage ? { title: selectedPackage.title, price: selectedPackage.price } : null,
      addons: Array.from(selectedAddons.values()).map(a => ({ name: a.name, price: a.price })),
      total: (selectedPackage ? selectedPackage.price : 0) + Array.from(selectedAddons.values()).reduce((s, a) => s + a.price, 0)
    };
  };

})();
