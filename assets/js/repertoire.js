/**
 * Repertoire Catalog JavaScript
 * Handles filtering, searching, and displaying the repertoire
 */

(function() {
  'use strict';

  let repertoireData = null;
  let filteredPieces = [];
  let activeFilters = {
    category: 'all',
    voiceType: 'all',
    mood: 'all',
    search: ''
  };

  // Load repertoire data
  async function loadRepertoire() {
    try {
      const response = await fetch('/data/repertoire.json');
      repertoireData = await response.json();
      initializeFilters();
      displayRepertoire();
      displayVoiceTypes();
    } catch (error) {
      console.error('Error loading repertoire:', error);
      showError();
    }
  }

  // Initialize filter buttons
  function initializeFilters() {
    // Category filters
    const categoryFilters = document.getElementById('category-filters');
    repertoireData.categories.forEach(function(category) {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.textContent = category.name;
      btn.dataset.filter = category.id;
      btn.addEventListener('click', function() {
        setFilter('category', category.id);
      });
      categoryFilters.appendChild(btn);
    });

    // Voice type filters
    const voiceFilters = document.getElementById('voice-filters');
    const uniqueVoices = new Set();
    repertoireData.categories.forEach(function(category) {
      category.pieces.forEach(function(piece) {
        uniqueVoices.add(piece.voiceType);
      });
    });
    uniqueVoices.forEach(function(voice) {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.textContent = voice;
      btn.dataset.filter = voice.toLowerCase();
      btn.addEventListener('click', function() {
        setFilter('voiceType', voice);
      });
      voiceFilters.appendChild(btn);
    });

    // Mood filters
    const moodFilters = document.getElementById('mood-filters');
    repertoireData.moods.slice(0, 8).forEach(function(mood) {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.textContent = mood;
      btn.dataset.filter = mood.toLowerCase();
      btn.addEventListener('click', function() {
        setFilter('mood', mood);
      });
      moodFilters.appendChild(btn);
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function(e) {
      activeFilters.search = e.target.value.toLowerCase();
      displayRepertoire();
    });
  }

  // Set active filter
  function setFilter(type, value) {
    // Update active filters
    if (type === 'category') {
      activeFilters.category = activeFilters.category === value ? 'all' : value;
    } else if (type === 'voiceType') {
      activeFilters.voiceType = activeFilters.voiceType === value ? 'all' : value;
    } else if (type === 'mood') {
      activeFilters.mood = activeFilters.mood === value ? 'all' : value;
    }

    // Update button states
    updateFilterButtons();
    displayRepertoire();
  }

  // Update filter button active states
  function updateFilterButtons() {
    // Category buttons
    document.querySelectorAll('#category-filters .filter-btn').forEach(function(btn) {
      if (btn.dataset.filter === 'all') {
        btn.classList.toggle('active', activeFilters.category === 'all');
      } else {
        btn.classList.toggle('active', btn.dataset.filter === activeFilters.category);
      }
    });

    // Voice type buttons
    document.querySelectorAll('#voice-filters .filter-btn').forEach(function(btn) {
      if (btn.dataset.filter === 'all') {
        btn.classList.toggle('active', activeFilters.voiceType === 'all');
      } else {
        btn.classList.toggle('active', btn.textContent === activeFilters.voiceType);
      }
    });

    // Mood buttons
    document.querySelectorAll('#mood-filters .filter-btn').forEach(function(btn) {
      if (btn.dataset.filter === 'all') {
        btn.classList.toggle('active', activeFilters.mood === 'all');
      } else {
        btn.classList.toggle('active', btn.textContent === activeFilters.mood);
      }
    });
  }

  // Filter pieces based on active filters
  function filterPieces() {
    filteredPieces = [];
    
    repertoireData.categories.forEach(function(category) {
      // Category filter
      if (activeFilters.category !== 'all' && category.id !== activeFilters.category) {
        return;
      }

      category.pieces.forEach(function(piece) {
        // Voice type filter
        if (activeFilters.voiceType !== 'all' && 
            piece.voiceType.toLowerCase().indexOf(activeFilters.voiceType.toLowerCase()) === -1) {
          return;
        }

        // Mood filter
        if (activeFilters.mood !== 'all' && 
            piece.mood.indexOf(activeFilters.mood) === -1) {
          return;
        }

        // Search filter
        if (activeFilters.search) {
          const searchStr = activeFilters.search;
          const matchesSearch = 
            piece.title.toLowerCase().indexOf(searchStr) > -1 ||
            piece.composer.toLowerCase().indexOf(searchStr) > -1 ||
            piece.description.toLowerCase().indexOf(searchStr) > -1 ||
            piece.mood.some(function(m) { return m.toLowerCase().indexOf(searchStr) > -1; });
          
          if (!matchesSearch) {
            return;
          }
        }

        filteredPieces.push({
          ...piece,
          categoryName: category.name,
          categoryId: category.id
        });
      });
    });

    // Sort by popularity
    filteredPieces.sort(function(a, b) { return b.popularity - a.popularity; });
  }

  // Display repertoire
  function displayRepertoire() {
    filterPieces();
    
    const container = document.getElementById('catalog-container');
    
    if (filteredPieces.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <h3>No pieces found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      `;
      return;
    }

    // Group by category if showing all categories
    if (activeFilters.category === 'all') {
      const grouped = {};
      filteredPieces.forEach(function(piece) {
        if (!grouped[piece.categoryId]) {
          grouped[piece.categoryId] = {
            name: piece.categoryName,
            pieces: []
          };
        }
        grouped[piece.categoryId].pieces.push(piece);
      });

      container.innerHTML = '';
      Object.keys(grouped).forEach(function(catId) {
        const section = createCategorySection(grouped[catId]);
        container.appendChild(section);
      });
    } else {
      // Show single category
      const category = repertoireData.categories.find(function(c) { 
        return c.id === activeFilters.category; 
      });
      container.innerHTML = '';
      const section = createCategorySection({
        name: category.name,
        pieces: filteredPieces
      });
      container.appendChild(section);
    }
  }

  // Create category section
  function createCategorySection(data) {
    const section = document.createElement('div');
    section.className = 'category-section reveal-on-scroll';
    
    section.innerHTML = `
      <div class="category-header">
        <h2>${data.name}</h2>
      </div>
      <div class="pieces-grid">
        ${data.pieces.map(function(piece) { return createPieceCard(piece); }).join('')}
      </div>
    `;
    
    return section;
  }

  // Create piece card HTML
  function createPieceCard(piece) {
    return `
      <div class="piece-card opera-card-hover" data-piece="${piece.title}">
        <div class="piece-header">
          <div class="piece-title">
            <h3>${piece.title}</h3>
            <div class="piece-composer">${piece.composer}</div>
          </div>
          <div class="popularity-badge">
            <span>⭐</span>
            <span>${piece.popularity}%</span>
          </div>
        </div>
        
        <div class="piece-meta">
          <span class="meta-tag voice">${piece.voiceType}</span>
          <span class="meta-tag">⏱ ${piece.duration}</span>
          <span class="meta-tag">🌐 ${piece.language}</span>
          ${piece.opera !== 'N/A' ? `<span class="meta-tag">🎭 ${piece.opera}</span>` : ''}
        </div>
        
        <p class="piece-description">${piece.description}</p>
        
        <div class="mood-tags">
          ${piece.mood.map(function(mood) { 
            return `<span class="mood-tag">${mood}</span>`; 
          }).join('')}
        </div>
        
        <div class="piece-actions">
          <button class="action-btn btn-listen" onclick="playPreview('${piece.audioSample}', '${piece.title}')">
            🎵 Listen
          </button>
          <button class="action-btn btn-request" onclick="requestPiece('${piece.title}')">
            ✉️ Request
          </button>
        </div>
      </div>
    `;
  }

  // Display voice types guide
  function displayVoiceTypes() {
    const container = document.getElementById('voice-types-grid');
    
    container.innerHTML = repertoireData.voiceTypes.map(function(voice) {
      return `
        <div class="voice-type-card">
          <h3>${voice.name}</h3>
          <div class="voice-range">Range: ${voice.range}</div>
          <p>${voice.description}</p>
          <div class="voice-characteristics">
            ${voice.characteristics.map(function(char) {
              return `<span class="characteristic-tag">${char}</span>`;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // Show error message
  function showError() {
    const container = document.getElementById('catalog-container');
    container.innerHTML = `
      <div class="no-results">
        <h3>Unable to Load Repertoire</h3>
        <p>Please try refreshing the page.</p>
      </div>
    `;
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadRepertoire);
  } else {
    loadRepertoire();
  }

})();

// Global functions for piece interactions
function playPreview(audioSrc, title) {
  // Create audio player modal or use existing player
  alert('Audio preview: ' + title + '\n(Audio player integration coming soon)');
  console.log('Playing:', audioSrc);
}

function requestPiece(title) {
  // Navigate to contact form with pre-filled request
  const message = encodeURIComponent('I would like to request: ' + title);
  window.location.href = '/contact.html?request=' + message;
}
