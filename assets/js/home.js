// home.js - Homepage-specific functionality for performers and testimonials

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch homepage data
    const res = await fetch('/data/homepage.json');
    if (!res.ok) throw new Error('Failed to load homepage.json');
    const data = await res.json();

    // =======================
    // PERFORMERS CAROUSEL
    // =======================
    const carousel = document.querySelector('#performer-carousel');
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

      // Initialize carousel controls after performers are loaded
      setTimeout(() => {
        const cards = Array.from(document.querySelectorAll('#performers .staff'));
        const total = cards.length;
        let activeIndex = 0;

        function updateCarousel() {
          cards.forEach((card, i) => {
            const offset = (i - activeIndex + total) % total;
            let angle, xOffset, zOffset, scale;

            if (offset === 0) { 
              angle = 0; xOffset = 0; zOffset = 250; scale = 1; 
              card.style.opacity = "1"; 
              card.style.zIndex = "3"; 
            } else if (offset === 1) { 
              angle = 15; xOffset = 650; zOffset = 100; scale = 0.85; 
              card.style.opacity = "0.6"; 
              card.style.zIndex = "2"; 
            } else if (offset === total - 1) { 
              angle = -15; xOffset = -650; zOffset = 100; scale = 0.85; 
              card.style.opacity = "0.6"; 
              card.style.zIndex = "2"; 
            } else { 
              angle = 0; xOffset = 0; zOffset = 0; scale = 0.7; 
              card.style.opacity = "0"; 
              card.style.zIndex = "1"; 
            }
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

        updateCarousel();
      }, 100);
    }

    // =======================
    // TESTIMONIALS CAROUSEL
    // =======================
    const testimonialCarousel = document.querySelector('#testimonial-carousel');
    if (testimonialCarousel) {
      testimonialCarousel.innerHTML = '';
      data.testimonials.forEach((t, idx) => {
        const div = document.createElement('div');
        div.className = 'testimonial-slide';
        if (idx === 0) div.classList.add('active');
        div.innerHTML = `
          <div class="stars-wrapper">
            ${'<img class="stars" src="/assets/media/images/star.svg" alt="Star">'.repeat(t.stars)}
          </div>
          <p class="testimonial-text">"${t.text}"</p>
          <cite class="testimonial-author">${t.author}</cite>
        `;
        testimonialCarousel.appendChild(div);
      });

      // Activate testimonial carousel auto-rotation
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
    console.error('Error loading homepage data:', err);
  }
});
