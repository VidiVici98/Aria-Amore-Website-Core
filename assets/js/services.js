/*=====================================
  Carousel Logic
=====================================*/
const carousel = document.querySelector('.carousel');
const cards = Array.from(document.querySelectorAll('.plan'));
const total = cards.length;
let activeIndex = 0;

function updateCarousel() {
  cards.forEach((card, i) => {
    const offset = (i - activeIndex + total) % total;
    let angle, xOffset, zOffset, scale;

    if (offset === 0) {
      angle = 0;
      xOffset = 0;
      zOffset = 250;
      scale = 1;
      card.style.opacity = "1";
      card.style.zIndex = "3";
    } 
    else if (offset === 1) {
      angle = 15;
      xOffset = 650;
      zOffset = 100;
      scale = 0.85;
      card.style.opacity = "0.6";
      card.style.zIndex = "2";
    } 
    else if (offset === total - 1) {
      angle = -15;
      xOffset = -650;
      zOffset = 100;
      scale = 0.85;
      card.style.opacity = "0.6";
      card.style.zIndex = "2";
    } 
    else {
      angle = 0;
      xOffset = 0;
      zOffset = 0;
      scale = 0.7;
      card.style.opacity = "0";
      card.style.zIndex = "1";
    }

    card.style.transform = `
      translateX(${xOffset}px)
      translateZ(${zOffset}px)
      scale(${scale})
      rotateY(${angle}deg)
    `;
  });
}

document.querySelector('.next').addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % total;
  updateCarousel();
});

document.querySelector('.prev').addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + total) % total;
  updateCarousel();
});

updateCarousel();

/*=====================================
  Fetch & Embed Packages From JSON
=====================================*/
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/data/services.json");
    if (!response.ok) throw new Error("Failed to load services.json");

    const data = await response.json();
    const headingEl = document.getElementById("packages-heading");
    if (headingEl) headingEl.textContent = data.heading;

    const planEls = document.querySelectorAll(".carousel .plan");
    data.plans.forEach((plan, index) => {
      const planEl = planEls[index];
      if (!planEl) return;

      const titleEl = planEl.querySelector(".plan-title");
      const featuresEl = planEl.querySelector(".features");
      const priceEl = planEl.querySelector(".price");
      const btnEl = planEl.querySelector(".btn");

      if (titleEl) titleEl.textContent = plan.name;
      if (priceEl) priceEl.textContent = plan.price;
      if (btnEl) btnEl.textContent = plan.buttonText;

      if (featuresEl) {
        featuresEl.innerHTML = plan.features
          .map(feature => `<li>${feature}</li>`)
          .join("");
      }
    });
  } catch (err) {
    console.error("Error embedding service data:", err);
  }
});

/*=====================================
  Smooth Scroll + Auto-Select RSVP Package + Prefill Artist
=====================================*/
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const artistFromURL = params.get("artist");
  const packageFromURL = params.get("package");

  // Prefill Special Requests with Artist
  if (artistFromURL) {
    const notesField = document.getElementById("notes");
    if (notesField) notesField.value = `Requesting artist: ${artistFromURL}`;

    // Scroll to RSVP form
    const rsvpSection = document.querySelector(".rsvp-section");
    if (rsvpSection) rsvpSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Select package if passed via URL
  if (packageFromURL) {
    setTimeout(() => {
      const radio = document.querySelector(
        `.rsvp-form input[name="package"][value="${packageFromURL.toLowerCase()}"]`
      );
      if (radio) radio.checked = true;
    }, 600);
  }

  // Attach click listeners to all carousel buttons
  document.querySelectorAll(".carousel .plan .btn").forEach(button => {
    button.addEventListener("click", () => {
      const planCard = button.closest(".plan");
      const titleEl = planCard?.querySelector(".plan-title");
      if (!titleEl) return;

      const planName = titleEl.textContent.trim().toLowerCase();

      let packageValue = "";
      if (planName.includes("serenade")) packageValue = "serenade";
      else if (planName.includes("aria")) packageValue = "aria";
      else if (planName.includes("grand")) packageValue = "grand-opera";

      const rsvpSection = document.querySelector(".rsvp-section");
      if (rsvpSection) rsvpSection.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        const radio = document.querySelector(
          `.rsvp-form input[name="package"][value="${packageValue}"]`
        );
        if (radio) radio.checked = true;

        // Optional highlight effect
        const form = document.querySelector(".rsvp-form");
        if (form) {
          const highlight = document.createElement("div");
          highlight.style.position = "absolute";
          highlight.style.top = "0";
          highlight.style.left = "0";
          highlight.style.width = "100%";
          highlight.style.height = "100%";
          highlight.style.background = "rgba(255, 255, 0, 0.15)";
          highlight.style.pointerEvents = "none";
          highlight.style.transition = "opacity 1s ease";
          form.style.position = "relative";
          form.appendChild(highlight);
          setTimeout(() => (highlight.style.opacity = "0"), 500);
          setTimeout(() => highlight.remove(), 1500);
        }
      }, 600);
    });
  });
});
