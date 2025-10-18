/* Interaction JS
   - play/pause single audio at a time
   - toggle waveform animation by adding/removing .playing on .audio-item
   - read-more expand/collapse
   - lightbox for portraits (click portrait)
   - accessibility: keyboard activation, Escape to close audio/lightbox
*/
(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    // Play controls
    const playButtons = Array.from(document.querySelectorAll('.play-btn'));
    let activeAudio = null;
    let activeItem = null;
  
    function stopActive() {
      if (!activeAudio) return;
      activeAudio.pause();
      activeAudio.currentTime = 0;
      if (activeItem) activeItem.classList.remove('playing');
      const btn = activeItem && activeItem.querySelector('.play-btn');
      if (btn) btn.classList.remove('playing');
      activeAudio = null;
      activeItem = null;
    }
  
    function onPlayButtonClick(btn) {
      const audioId = btn.getAttribute('data-audio');
      if (!audioId) return;
      const audio = document.getElementById(audioId);
      if (!audio) return;
  
      // Toggle same audio
      if (activeAudio === audio) {
        // pause
        audio.pause();
        if (activeItem) activeItem.classList.remove('playing');
        btn.classList.remove('playing');
        activeAudio = null;
        activeItem = null;
        return;
      }
  
      // stop other
      if (activeAudio && activeAudio !== audio) stopActive();
  
      // play chosen
      audio.play().then(() => {
        activeAudio = audio;
        activeItem = btn.closest('.audio-item');
        if (activeItem) activeItem.classList.add('playing');
        btn.classList.add('playing');
  
        // When audio completes
        audio.onended = () => {
          if (activeItem) activeItem.classList.remove('playing');
          btn.classList.remove('playing');
          activeAudio = null;
          activeItem = null;
        };
      }).catch(err => {
        console.warn('Playback failed', err);
      });
    }
  
    // Attach handlers to play buttons
    playButtons.forEach(btn => {
      btn.addEventListener('click', () => onPlayButtonClick(btn));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlayButtonClick(btn); }
      });
    });
  
    // Pause active audio if user navigates away or hits Escape
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopActive(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') { stopActive(); closeLightbox(); } });
  
    // Read more toggles
    const readButtons = Array.from(document.querySelectorAll('.read-more'));
    readButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.getAttribute('data-target'));
        if (!target) return;
        const open = target.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        btn.textContent = open ? 'Read less' : 'Read more';
      });
    });
  
    // Lightbox for portraits
    const lightbox = document.getElementById('lightbox');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
  
    function openLightbox(src, alt = '') {
      if (!src) return;
      // pause any playing audio
      stopActive();
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      // trap focus on close for accessibility
      lightboxClose.focus();
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '#';
      lightboxImg.alt = '';
      document.body.style.overflow = '';
    }
  
    // portrait elements open lightbox
    document.querySelectorAll('.artist-portrait').forEach(p => {
      p.addEventListener('click', () => {
        const img = p.querySelector('img');
        openLightbox(img ? img.src : '', img ? img.alt : '');
      });
      p.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); p.click(); }
      });
    });
  
    lightboxBackdrop.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
  })();