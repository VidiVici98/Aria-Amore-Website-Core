(async () => {
  const res = await fetch('data/artists.json');
  const artists = await res.json();
  const grid = document.querySelector('.artists-grid');
  const template = document.getElementById('artist-template');

  // Populate Artists Grid
  artists.forEach(artist => {
    const clone = template.content.cloneNode(true);
    const article = clone.querySelector('.artist');
    article.id = `artist-${artist.id}`;
    article.dataset.artist = artist.id;

    // Portrait
    const img = clone.querySelector('.artist-portrait img');
    img.src = artist.portrait;
    img.alt = `${artist.name} portrait`;
    clone.querySelector('.artist-portrait').setAttribute('aria-label', `View ${artist.name} details`);

    // Name and Bio
    clone.querySelector('.artist-name').textContent = artist.name;
    const bioEl = clone.querySelector('.artist-bio');
    bioEl.id = `bio-${artist.id}`;
    bioEl.textContent = artist.bio;
    clone.querySelector('.read-more').setAttribute('data-target', `bio-${artist.id}`);

    // Audio
    const audioList = clone.querySelector('.audio-list');
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

    // Booking
    const bookBtn = clone.querySelector('.book-btn');
    const defaultPackage = 'Serenade';
    bookBtn.href = `services.html?artist=${encodeURIComponent(artist.name)}&package=${encodeURIComponent(defaultPackage)}`;
    bookBtn.setAttribute('aria-label', `Request ${artist.name} for ${defaultPackage}`);

    grid.appendChild(clone);
  });

  // =============================
  // Artist Interactions
  // =============================
  initArtistInteractions();

  function initArtistInteractions() {
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

    // Attach play button events
    document.querySelectorAll('.play-btn').forEach(btn => {
      btn.addEventListener('click', () => onPlayButtonClick(btn));
      btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlayButtonClick(btn); } });
    });

    document.addEventListener('visibilitychange', () => { if (document.hidden) stopActive(); });

    // =============================
    // Modal Logic
    // =============================
    const modal = document.getElementById('artist-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalPortrait = document.getElementById('modal-portrait');
    const modalName = document.getElementById('modal-name');
    const modalBio = document.getElementById('modal-bio');
    const modalAudioList = document.getElementById('modal-audio-list');
    const modalInstagram = document.getElementById('modal-instagram');
    const modalFacebook = document.getElementById('modal-tiktok');
    const modalBook = document.getElementById('modal-book');

    function openModal(artist) {
      stopActive();
      modalPortrait.src = artist.portrait;
      modalPortrait.alt = `${artist.name} portrait`;
      modalName.textContent = artist.name;
      modalBio.textContent = artist.modalBio || artist.bio;

      // Audio inside modal
      modalAudioList.innerHTML = '';
      artist.tracks.forEach(track => {
        const item = document.createElement('div');
        item.className = 'audio-item';
        item.dataset.track = track.id;
        item.innerHTML = `
          <button class="play-btn" aria-pressed="false" aria-label="Play ${artist.name}'s preview of ${track.title}" data-audio="modal-${track.id}-src">
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
          <audio id="modal-${track.id}-src" preload="none">
            <source src="${track.src}" type="audio/mpeg">
          </audio>
        `;
        modalAudioList.appendChild(item);
      });

      // Social
      modalInstagram.href = artist.social?.instagram || '#';
      modalFacebook.href = artist.social?.tiktok || '#';
      modalBook.onclick = () => window.location.href = `services.html?artist=${encodeURIComponent(artist.name)}&package=Serenade`;

      // Open modal
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Audio buttons inside modal
      modalAudioList.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', () => onPlayButtonClick(btn));
        btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlayButtonClick(btn); } });
      });

      modalClose.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      stopActive();
    }

    // Open modal when clicking portrait or name
    document.querySelectorAll('.artist-portrait, .artist-name').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.closest('.artist').dataset.artist;
        const artist = artists.find(a => a.id === id);
        if (artist) openModal(artist);
      });
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    });

    modalBackdrop.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }
})();
