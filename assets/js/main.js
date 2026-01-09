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
      // HERO
      const heroTitle = document.querySelector('.hero .envelope-body h1');
      const heroSubtitle = document.querySelector('.hero .envelope-body h2');
      const heroSeparator = document.querySelector('.hero .envelope-body .victorian-separator');
      const heroLetterHeading = document.querySelector('.hero-letter h1');
      const heroLetterText = document.querySelector('.hero-letter p');
      const heroLetterCta = document.querySelector('.hero-letter-btn');
      const heroIconsWrapper = document.querySelector('.hero-icons-wrapper');
      heroTitle.textContent = data.hero.title;
      heroSubtitle.textContent = data.hero.subtitle;
      heroSeparator.src = data.hero.separator;
      heroLetterHeading.textContent = data.hero.letter.heading;
      heroLetterText.textContent = data.hero.letter.text;
      heroLetterCta.textContent = data.hero.letter.ctaText;
      heroLetterCta.href = data.hero.letter.ctaHref;
      heroIconsWrapper.innerHTML = '';
      data.hero.letter.icons.forEach(icon => {
        const img = document.createElement('img');
        img.src = icon.src;
        img.alt = icon.alt;
        img.className = 'hero-icons';
        heroIconsWrapper.appendChild(img);
      });
      // EVENTS
      const eventGrid = document.querySelector('.event-grid');
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
      eventsCta.textContent = data.eventsCta;
      // PERFORMERS
      const carousel = document.querySelector('#performers .carousel');
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
      // TESTIMONIALS
      const testimonialCarousel = document.querySelector('.testimonial-carousel');
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
  document.querySelector('#performers .next').addEventListener('click', () => { 
    activeIndex = (activeIndex + 1) % total; 
    updateCarousel(); 
  });
  document.querySelector('#performers .prev').addEventListener('click', () => { 
    activeIndex = (activeIndex - 1 + total) % total; 
    updateCarousel(); 
  });
  // Wait until performers are loaded from JSON
  setTimeout(() => {
    cards = Array.from(document.querySelectorAll('#performers .staff'));
    total = cards.length;
    updateCarousel();
  }, 200);
});
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("event-banner-container", "/components/event-banner.html")
    .then(container => {
      if (!container) return;
      const banner = container.querySelector('#event-banner');
      const closeBtn = container.querySelector('#event-banner-close');
      if (banner && closeBtn) {
        // Hide banner if previously dismissed
        if (localStorage.getItem('eventBannerDismissed') === 'true') {
          banner.style.display = 'none';
          return;
        }
        // Close button functionality
        closeBtn.addEventListener('click', () => {
          banner.style.display = 'none';
          localStorage.setItem('eventBannerDismissed', 'true');
        });
      }
    });
});
const curtain = document.querySelector(".curtain-wrapper");
// Open curtains on page load
setTimeout(() => curtain.classList.add("open"), 100);
// Navigation with curtain animation
document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    curtain.classList.remove("open");
    setTimeout(() => window.location.href = link.href, 1400);
  });
});
