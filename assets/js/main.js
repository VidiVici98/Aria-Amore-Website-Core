document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // HEADER & FOOTER LOAD
  // =======================
  function loadComponent(containerId, filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        return response.text();
      })
      .then(data => {
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = data;
        return container; // return for chaining
      })
      .catch(err => console.error(err));
  }
  loadComponent("site-header-container", "/components/header.html");
  loadComponent("site-footer-container", "/components/footer.html");
  loadComponent("event-banner-container", "/components/event-banner.html");

  // =======================
  // HOMEPAGE JSON POPULATION
  // =======================
  (async () => {
    try {
      const res = await fetch('/data/homepage.json');
      if (!res.ok) throw new Error('Failed to load homepage.json');
      const data = await res.json();
      // HERO (only for index.html with envelope design)
      const heroTitle = document.querySelector('.hero .envelope-body h1');
      const heroSubtitle = document.querySelector('.hero .envelope-body h2');
      const heroSeparator = document.querySelector('.hero .envelope-body .victorian-separator');
      const heroLetterHeading = document.querySelector('.hero-letter h1');
      const heroLetterText = document.querySelector('.hero-letter p');
      const heroLetterCta = document.querySelector('.hero-letter-btn');
      const heroIconsWrapper = document.querySelector('.hero-icons-wrapper');
      if (heroTitle) heroTitle.textContent = data.hero.title;
      if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
      if (heroSeparator) heroSeparator.src = data.hero.separator;
      if (heroLetterHeading) heroLetterHeading.textContent = data.hero.letter.heading;
      if (heroLetterText) heroLetterText.textContent = data.hero.letter.text;
      if (heroLetterCta) {
        heroLetterCta.textContent = data.hero.letter.ctaText;
        heroLetterCta.href = data.hero.letter.ctaHref;
      }
      if (heroIconsWrapper) {
        heroIconsWrapper.innerHTML = '';
        data.hero.letter.icons.forEach(icon => {
          const img = document.createElement('img');
          img.src = icon.src;
          img.alt = icon.alt;
          img.className = 'hero-icons';
          heroIconsWrapper.appendChild(img);
        });
      }
      // EVENTS (only for index.html)
      const eventGrid = document.querySelector('.event-grid');
      if (eventGrid) {
        eventGrid.innerHTML = '';
        data.events.forEach(ev => {
          const div = document.createElement('div');
          div.className = 'event';
          div.innerHTML = `
            <img src="${ev.icon}" alt="${ev.title} Icon">
            <h3>${ev.title}</h3>
            <p>${ev.description}</p>
          `;
          eventGrid.appendChild(div);
        });
        const eventsCta = document.querySelector('.event-grid + p.cta');
        if (eventsCta) eventsCta.textContent = data.eventsCta;
      }
      // PERFORMERS (handled by home.js for modern browsers)
      const carousel = document.querySelector('#performers .carousel');
      if (carousel) {
        carousel.innerHTML = '';
        data.performers.forEach((perf, i) => {
          const div = document.createElement('div');
          div.className = 'staff';
          div.dataset.index = i;
          div.innerHTML = `
            <div class="content-wrapper">
              <div class="staff-inner">
                <img class="artist-portrait" src="${perf.portrait}" alt="${perf.name}">
                <h3>${perf.name}</h3>
                <a href="${perf.link}" class="btn">Learn More</a>
              </div>
            </div>
          `;
          // Corner images
          const cornerClasses = ['top-right','top-left','bottom-right','bottom-left'];
          data.performerCornerImages.forEach((src, idx) => {
            const corner = document.createElement('img');
            corner.src = src;
            corner.className = `corner corner-${cornerClasses[idx]}`;
            corner.alt = 'Floral Corner';
            div.appendChild(corner);
          });
          carousel.appendChild(div);
        });
      }
      // TESTIMONIALS (handled by home.js for modern browsers)
      const testimonialCarousel = document.querySelector('.testimonial-carousel');
      if (testimonialCarousel) {
        testimonialCarousel.innerHTML = '';
        data.testimonials.forEach((t, idx) => {
          const div = document.createElement('div');
          div.className = 'testimonial-slide';
          if (idx === 0) div.classList.add('active'); // first slide active
          div.innerHTML = `
            <div class="stars-wrapper">
              ${'<img class="stars" src="/assets/media/images/star.svg" alt="Star">'.repeat(t.stars)}
            </div>
            <p class="testimonial-text">"${t.text}"</p>
            <cite class="testimonial-author">${t.author}</cite>
          `;
          testimonialCarousel.appendChild(div);
        });
        // Activate testimonial carousel after DOM is populated
        const slides = Array.from(testimonialCarousel.querySelectorAll('.testimonial-slide'));
        if (slides.length > 1) {
          let activeIndex = 0;
          function showSlide(index) {
            slides.forEach((slide, i) => {
              slide.classList.toggle('active', i === index);
            });
          }
          function nextSlide() {
            activeIndex = (activeIndex + 1) % slides.length;
            showSlide(activeIndex);
          }
          showSlide(activeIndex);
          setInterval(nextSlide, 5000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  })();
  // =======================
  // MOBILE MENU
  // =======================
  const waitForDOM = setInterval(() => {
    const toggleButton = document.getElementById('aaMobileToggle');
    const mobileMenu = document.getElementById('aaMobileMenu');
    const body = document.body;
    if (!toggleButton || !mobileMenu) return;
    clearInterval(waitForDOM);
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.toggle('aa-open');
      toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggleButton.textContent = isOpen ? '✕' : '☰';
      body.style.overflow = isOpen ? 'hidden' : '';
    };
    toggleButton.addEventListener('click', toggleMenu);
    mobileMenu.addEventListener('click', e => {
      if (e.target.classList.contains('aa-mobile-link')) {
        mobileMenu.classList.remove('aa-open');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.textContent = '☰';
        body.style.overflow = '';
      }
    });
  }, 50);
  // =======================
  // PERFORMERS CAROUSEL
  // =======================
  let cards = [];
  let total = 0;
  let activeIndex = 0;
  function updateCarousel() {
    cards.forEach((card, i) => {
      const offset = (i - activeIndex + total) % total;
      let angle, xOffset, zOffset, scale;

      if (offset === 0) { angle = 0; xOffset = 0; zOffset = 250; scale = 1; card.style.opacity = "1"; card.style.zIndex = "3"; }
      else if (offset === 1) { angle = 15; xOffset = 650; zOffset = 100; scale = 0.85; card.style.opacity = "0.6"; card.style.zIndex = "2"; }
      else if (offset === total - 1) { angle = -15; xOffset = -650; zOffset = 100; scale = 0.85; card.style.opacity = "0.6"; card.style.zIndex = "2"; }
      else { angle = 0; xOffset = 0; zOffset = 0; scale = 0.7; card.style.opacity = "0"; card.style.zIndex = "1"; }
      card.style.transform = `translateX(${xOffset}px) translateZ(${zOffset}px) scale(${scale}) rotateY(${angle}deg)`;
    });
  }
  const nextBtn = document.querySelector('#performers .next');
  const prevBtn = document.querySelector('#performers .prev');
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { 
      activeIndex = (activeIndex + 1) % total; 
      updateCarousel(); 
    });
    prevBtn.addEventListener('click', () => { 
      activeIndex = (activeIndex - 1 + total) % total; 
      updateCarousel(); 
    });
  }
  // Wait until performers are loaded from JSON
  setTimeout(() => {
    cards = Array.from(document.querySelectorAll('#performers .staff'));
    total = cards.length;
    updateCarousel();
  }, 200);

  // =======================
  // EVENT BANNER
  // =======================
  // Setup event banner with next upcoming event after it loads
  setTimeout(async () => {
    const banner = document.querySelector('#event-banner');
    const closeBtn = document.querySelector('#event-banner-close');
    if (!banner || !closeBtn) return;

    // Hide banner if previously dismissed
    if (localStorage.getItem('eventBannerDismissed') === 'true') {
      banner.style.display = 'none';
      return;
    }

    // Fetch events and find next upcoming event
    try {
      const res = await fetch('/data/events.json');
      if (!res.ok) throw new Error('Failed to load events.json');
      const data = await res.json();
      const events = data.events || [];

      // Get today's date at start of day
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find next upcoming event
      const upcomingEvents = events
        .filter(ev => {
          const evDate = new Date(ev.date);
          evDate.setHours(0, 0, 0, 0);
          return evDate >= today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      if (upcomingEvents.length === 0) {
        // No upcoming events, hide banner
        banner.style.display = 'none';
        return;
      }

      // Update banner with next upcoming event
      const nextEvent = upcomingEvents[0];
      const eventDate = new Date(nextEvent.date);
      const dateStr = eventDate.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric'
      });

      const bannerText = banner.querySelector('p');
      const bannerLink = banner.querySelector('a');

      if (bannerText) {
        bannerText.innerHTML = `Don't Miss: <span>${nextEvent.title}</span> - ${nextEvent.performers?.[0] || 'Live Performance'} ${dateStr}!`;
      }
      if (bannerLink) {
        bannerLink.href = `/events.html#${nextEvent.id}`;
      }
    } catch (err) {
      console.error('Error updating event banner:', err);
    }

    // Close button functionality
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      localStorage.setItem('eventBannerDismissed', 'true');
    });
  }, 500);

  // =======================
  // CURTAIN ANIMATION
  // =======================
  const curtain = document.querySelector(".curtain-wrapper");
  if (curtain) {
    // Open curtains on page load - use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(() => {
        curtain.classList.add("open");
        // Hide the curtain wrapper after animation completes (2s transition + buffer)
        setTimeout(() => {
          curtain.style.display = "none";
        }, 2500);
      }, 50);
    });
    // Navigation with curtain animation
    document.querySelectorAll("a[href]").forEach(link => {
      link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        
        // Skip external links, anchors, and special protocols
        if (!href || 
            href.startsWith("http") ||
            href.startsWith("//") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("javascript:") ||
            href.startsWith("#") ||
            link.target === "_blank" ||
            link.hasAttribute("data-no-transition")) {
          return;
        }
        
        e.preventDefault();
        // Show curtain wrapper again for closing animation
        curtain.style.display = "flex";
        curtain.classList.remove("open");
        
        // Navigate after curtain animation
        setTimeout(() => {
          // Ensure .html extension is present for navigation
          let newHref = href;
          if (!newHref.endsWith('.html') && !newHref.includes('?') && !newHref.includes('#')) {
            // Only add .html if it's a simple page link without query/hash
            if (newHref.endsWith('/')) {
              newHref = newHref + 'index.html';
            } else if (!newHref.includes('.')) {
              newHref = newHref + '.html';
            }
          }
          window.location.href = newHref;
        }, 1400);
      });
    });
  }
});
