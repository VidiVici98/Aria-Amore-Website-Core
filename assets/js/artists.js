(async () => {
  // Load artist data
  const res = await fetch('/data/artists.json');
  const artists = await res.json();

  const grid = document.querySelector('.artists-grid');
  const template = document.getElementById('artist-template');

  artists.forEach(artist => {
    const clone = template.content.cloneNode(true);
    const article = clone.querySelector('.artist');
    article.id = `artist-${artist.id}`;

    const img = clone.querySelector('.artist-portrait img');
    img.src = artist.portrait;
    img.alt = `${artist.name} portrait`;
    clone.querySelector('.artist-portrait').setAttribute('aria-label', `View ${artist.name} photo`);

    const nameEl = clone.querySelector('.artist-name');
    nameEl.textContent = artist.name;

    const bioEl = clone.querySelector('.artist-bio');
    bioEl.id = `bio-${artist.id}`;
    bioEl.textContent = artist.bio;

    const readBtn = clone.querySelector('.read-more');
    readBtn.setAttribute('data-target', `bio-${artist.id}`);

    const audioList = clone.querySelector('.audio-list');
    audioList.setAttribute('aria-label', `Audio previews for ${artist.name}`);

    artist.tracks.forEach(track => {
      const item = document.createElement('div');
      item.className = 'audio-item';
      item.dataset.track = track.id;

      item.innerHTML = `
        <button class="play-btn" aria-pressed="false" aria-label="Play ${artist.name}'s preview of ${track.title}" data-audio="${track.id}-src">
          <span class="play-icon" aria-hidden="true"></span>
          <span class="pause-icon" aria-hidden="true"><span></span><span></span></span>
        </button>
        <div class="waveform" aria-hidden="true">
          ${'<div class="wavebar"></div>'.repeat(10)}
        </div>
        <div class="track-info">
          <p class="track-title">${track.title}</p>
          <p class="track-sub">${track.sub}</p>
        </div>
        <audio id="${track.id}-src" preload="none">
          <source src="${track.src}" type="audio/mpeg">
        </audio>
      `;
      audioList.appendChild(item);
    });

    const bookBtn = clone.querySelector('.book-btn');
    bookBtn.href = `/booking?s=${encodeURIComponent(artist.name)}`;
    bookBtn.setAttribute('aria-label', `Request ${artist.name}`);

    grid.appendChild(clone);
  });

  // Once DOM is populated, initialize interactions
  initArtistInteractions();

  /*=====================================
      Interactions (original logic)
  =====================================*/
  function initArtistInteractions() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

      if (activeAudio === audio) {
        audio.pause();
        if (activeItem) activeItem.classList.remove('playing');
        btn.classList.remove('playing');
        activeAudio = null;
        activeItem = null;
        return;
      }

      if (activeAudio && activeAudio !== audio) stopActive();
      audio.play().then(() => {
        activeAudio = audio;
        activeItem = btn.closest('.audio-item');
        if (activeItem) activeItem.classList.add('playing');
        btn.classList.add('playing');
        audio.onended = () => {
          if (activeItem) activeItem.classList.remove('playing');
          btn.classList.remove('playing');
          activeAudio = null;
          activeItem = null;
        };
      }).catch(err => console.warn('Playback failed', err));
    }

    playButtons.forEach(btn => {
      btn.addEventListener('click', () => onPlayButtonClick(btn));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlayButtonClick(btn); }
      });
    });

    document.addEventListener('visibilitychange', () => { if (document.hidden) stopActive(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') { stopActive(); closeLightbox(); } });

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

    const lightbox = document.getElementById('lightbox');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    function openLightbox(src, alt = '') {
      if (!src) return;
      stopActive();
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
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
  }
})();
