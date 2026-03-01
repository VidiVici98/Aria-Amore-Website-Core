/**
 * Opera-Themed Visual Effects
 * Adds theatrical animations and effects throughout the site
 */

(function() {
  'use strict';

  // Curtain Reveal Effect on Page Load
  function initCurtainReveal() {
    // Create curtain elements
    const curtainContainer = document.createElement('div');
    curtainContainer.id = 'opera-curtain';
    curtainContainer.innerHTML = `
      <div class="curtain-left"></div>
      <div class="curtain-right"></div>
      <div class="curtain-logo">
        <h1>Aria Amore</h1>
        <p>Preparing the stage...</p>
      </div>
    `;
    
    // Add to page
    document.body.insertBefore(curtainContainer, document.body.firstChild);
    
    // Trigger reveal immediately after a short delay
    setTimeout(function() {
      curtainContainer.classList.add('reveal');
      
      // Remove curtain after animation completes (1.2s transition + 300ms buffer)
      setTimeout(function() {
        curtainContainer.remove();
      }, 1500);
    }, 100);
    
    // Safety timeout: force remove if stuck after 3 seconds
    setTimeout(function() {
      if (curtainContainer && curtainContainer.parentNode) {
        curtainContainer.remove();
      }
    }, 3000);
  }

  // Spotlight Effect on Hover for Important Elements
  function initSpotlightEffects() {
    const spotlightElements = document.querySelectorAll('.spotlight-effect, .package-card, .artist-card');
    
    spotlightElements.forEach(function(element) {
      element.addEventListener('mouseenter', function(e) {
        const spotlight = document.createElement('div');
        spotlight.className = 'opera-spotlight';
        element.appendChild(spotlight);
        
        // Position spotlight at cursor
        element.addEventListener('mousemove', function(e) {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          spotlight.style.left = x + 'px';
          spotlight.style.top = y + 'px';
        });
      });
      
      element.addEventListener('mouseleave', function() {
        const spotlight = element.querySelector('.opera-spotlight');
        if (spotlight) spotlight.remove();
      });
    });
  }

  // Musical Note Animation
  function createFloatingNotes() {
    const noteContainer = document.createElement('div');
    noteContainer.id = 'floating-notes';
    document.body.appendChild(noteContainer);
    
    const notes = ['♩', '♪', '♫', '♬', '𝄞'];
    
    function createNote() {
      const note = document.createElement('div');
      note.className = 'floating-note';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = Math.random() * 100 + '%';
      note.style.animationDuration = (Math.random() * 3 + 4) + 's';
      note.style.fontSize = (Math.random() * 10 + 20) + 'px';
      note.style.opacity = Math.random() * 0.3 + 0.1;
      
      noteContainer.appendChild(note);
      
      // Remove after animation
      setTimeout(function() {
        note.remove();
      }, 7000);
    }
    
    // Create notes periodically
    setInterval(createNote, 3000);
  }

  // Gold Shimmer Effect on CTAs
  function initGoldShimmer() {
    const buttons = document.querySelectorAll('.cta-primary, .btn-primary, button[type="submit"]');
    
    buttons.forEach(function(button) {
      button.addEventListener('mouseenter', function() {
        const shimmer = document.createElement('div');
        shimmer.className = 'gold-shimmer';
        button.appendChild(shimmer);
        
        setTimeout(function() {
          shimmer.remove();
        }, 600);
      });
    });
  }

  // Theatrical Fade-In for Sections
  function initTheatricalFadeIn() {
    const sections = document.querySelectorAll('section, .content-section, article');
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-theatrical');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(function(section) {
      section.classList.add('theatrical-section');
      observer.observe(section);
    });
  }

  // Stage Lights Effect
  function initStageLights() {
    const hero = document.querySelector('.hero, .hero-alt, .page-hero');
    if (!hero) return;
    
    const lights = document.createElement('div');
    lights.className = 'stage-lights';
    lights.innerHTML = `
      <div class="light light-1"></div>
      <div class="light light-2"></div>
      <div class="light light-3"></div>
    `;
    hero.appendChild(lights);
  }

  // Applause Sound Effect (optional, user-triggered)
  function initApplauseEffect() {
    const bookingButtons = document.querySelectorAll('[data-applause-trigger]');
    
    bookingButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Visual applause effect
        const applause = document.createElement('div');
        applause.className = 'applause-visual';
        applause.textContent = '👏 👏 👏';
        button.parentElement.appendChild(applause);
        
        setTimeout(function() {
          applause.remove();
        }, 2000);
      });
    });
  }

  // Performance Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter');
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.textContent.replace(/[^\d]/g, ''));
          const duration = 2000;
          const increment = finalValue / (duration / 16);
          let current = 0;
          
          const timer = setInterval(function() {
            current += increment;
            if (current >= finalValue) {
              target.textContent = target.textContent.replace(/\d+/, finalValue);
              clearInterval(timer);
            } else {
              target.textContent = target.textContent.replace(/\d+/, Math.floor(current));
            }
          }, 16);
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
      observer.observe(counter);
    });
  }

  // Elegant Scroll Reveal
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    
    reveals.forEach(function(element) {
      observer.observe(element);
    });
  }

  // Initialize all effects
  function init() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Only init decorative animations if user hasn't requested reduced motion
      // NOTE: Curtain animation is now handled by main.js using the HTML curtain-wrapper
      // initCurtainReveal(); // DISABLED - conflicts with HTML curtain
      createFloatingNotes();
      initStageLights();
    }
    
    // Always init functional effects
    initSpotlightEffects();
    initGoldShimmer();
    initTheatricalFadeIn();
    initApplauseEffect();
    animateCounters();
    initScrollReveal();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
