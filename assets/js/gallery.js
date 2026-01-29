/**
 * Gallery Page JavaScript
 * Handles gallery filtering, lightbox modal, and dynamic content loading
 */

(function() {
  'use strict';
  
  let galleryData = null;
  let currentCategory = 'all';
  let currentLightboxIndex = 0;
  let filteredItems = [];
  
  /**
   * Initialize gallery when DOM is loaded
   */
  document.addEventListener('DOMContentLoaded', function() {
    loadGalleryData();
    initializeFilters();
    initializeLightbox();
  });
  
  /**
   * Load gallery data from JSON file
   */
  async function loadGalleryData() {
    try {
      const response = await fetch('/public/data/gallery.json');
      if (!response.ok) {
        throw new Error('Failed to load gallery data');
      }
      
      galleryData = await response.json();
      
      // Update hero content
      updateHeroContent();
      
      // Update stats
      updateStats();
      
      // Render initial gallery
      renderGallery();
      
    } catch (error) {
      console.error('Error loading gallery:', error);
      showErrorState();
    }
  }
  
  /**
   * Update hero section content
   */
  function updateHeroContent() {
    if (!galleryData || !galleryData.hero) return;
    
    const titleEl = document.getElementById('gallery-title');
    const subtitleEl = document.getElementById('gallery-subtitle');
    
    if (titleEl) titleEl.textContent = galleryData.hero.title;
    if (subtitleEl) subtitleEl.textContent = galleryData.hero.subtitle;
  }
  
  /**
   * Update stats section
   */
  function updateStats() {
    if (!galleryData || !galleryData.stats) return;
    
    const stats = galleryData.stats;
    
    updateStatElement('stat-performances', stats.totalPerformances);
    updateStatElement('stat-clients', stats.happyClients);
    updateStatElement('stat-year', stats.eventsThisYear);
    updateStatElement('stat-rating', stats.averageRating + '★');
  }
  
  function updateStatElement(id, value) {
    const el = document.getElementById(id);
    if (el) {
      // Animate number counting
      animateValue(el, 0, value);
    }
  }
  
  /**
   * Animate number counting
   */
  function animateValue(el, start, endValue) {
    // Extract number from value string (e.g., "500+" -> 500)
    const numMatch = String(endValue).match(/\d+/);
    if (!numMatch) {
      el.textContent = endValue;
      return;
    }
    
    const end = parseInt(numMatch[0]);
    const suffix = String(endValue).replace(/\d+/, '');
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);
      
      el.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
  
  /**
   * Initialize filter buttons
   */
  function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category and filter gallery
        currentCategory = this.dataset.category;
        renderGallery();
      });
    });
  }
  
  /**
   * Render gallery items based on current filter
   */
  function renderGallery() {
    const gridEl = document.getElementById('gallery-grid');
    if (!gridEl || !galleryData) return;
    
    // Filter items based on current category
    filteredItems = currentCategory === 'all' 
      ? galleryData.mediaItems 
      : galleryData.mediaItems.filter(item => item.category === currentCategory);
    
    // Clear grid
    gridEl.innerHTML = '';
    
    // Check if empty
    if (filteredItems.length === 0) {
      showEmptyState(gridEl);
      return;
    }
    
    // Render each item
    filteredItems.forEach((item, index) => {
      const itemEl = createGalleryItem(item, index);
      gridEl.appendChild(itemEl);
      
      // Stagger animation
      setTimeout(() => {
        itemEl.style.animationDelay = `${index * 0.1}s`;
      }, 10);
    });
  }
  
  /**
   * Create gallery item HTML element
   */
  function createGalleryItem(item, index) {
    const article = document.createElement('article');
    article.className = 'gallery-item';
    article.dataset.index = index;
    article.setAttribute('role', 'button');
    article.setAttribute('tabindex', '0');
    article.setAttribute('aria-label', `View ${item.title}`);
    
    // Media section
    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'gallery-item-media';
    
    if (item.type === 'video') {
      // Video thumbnail with play indicator
      const img = document.createElement('img');
      img.src = item.thumbnail;
      img.alt = item.title;
      img.loading = 'lazy';
      mediaDiv.appendChild(img);
      
      const playIndicator = document.createElement('div');
      playIndicator.className = 'video-indicator';
      playIndicator.setAttribute('aria-label', 'Play video');
      mediaDiv.appendChild(playIndicator);
    } else {
      // Image
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.title;
      img.loading = 'lazy';
      mediaDiv.appendChild(img);
    }
    
    // Info section
    const infoDiv = document.createElement('div');
    infoDiv.className = 'gallery-item-info';
    
    // Category badge
    const categorySpan = document.createElement('span');
    categorySpan.className = 'gallery-item-category';
    categorySpan.textContent = getCategoryName(item.category);
    infoDiv.appendChild(categorySpan);
    
    // Title
    const title = document.createElement('h3');
    title.className = 'gallery-item-title';
    title.textContent = item.title;
    infoDiv.appendChild(title);
    
    // Description
    const description = document.createElement('p');
    description.className = 'gallery-item-description';
    description.textContent = item.description;
    infoDiv.appendChild(description);
    
    // Meta information
    const meta = document.createElement('div');
    meta.className = 'gallery-item-meta';
    
    if (item.date) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = item.date;
      meta.appendChild(dateSpan);
    }
    
    if (item.location) {
      const locationSpan = document.createElement('span');
      locationSpan.textContent = item.location;
      meta.appendChild(locationSpan);
    }
    
    if (item.performers && item.performers.length > 0) {
      const performersSpan = document.createElement('span');
      performersSpan.textContent = item.performers.join(', ');
      meta.appendChild(performersSpan);
    }
    
    infoDiv.appendChild(meta);
    
    // Assemble article
    article.appendChild(mediaDiv);
    article.appendChild(infoDiv);
    
    // Add click/enter handlers for lightbox
    article.addEventListener('click', () => openLightbox(index));
    article.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
    
    return article;
  }
  
  /**
   * Get category display name
   */
  function getCategoryName(categoryId) {
    const categoryMap = {
      'weddings': 'Wedding',
      'corporate': 'Corporate',
      'holiday': 'Holiday',
      'private': 'Private Event'
    };
    return categoryMap[categoryId] || categoryId;
  }
  
  /**
   * Show empty state
   */
  function showEmptyState(gridEl) {
    gridEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎭</div>
        <h3>No Performances Found</h3>
        <p>We don't have any performances in this category yet. Check back soon!</p>
      </div>
    `;
  }
  
  /**
   * Show error state
   */
  function showErrorState() {
    const gridEl = document.getElementById('gallery-grid');
    if (!gridEl) return;
    
    gridEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Unable to Load Gallery</h3>
        <p>Please try refreshing the page.</p>
      </div>
    `;
  }
  
  /**
   * Initialize lightbox modal
   */
  function initializeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = modal?.querySelector('.lightbox-close');
    const prevBtn = modal?.querySelector('.lightbox-prev');
    const nextBtn = modal?.querySelector('.lightbox-next');
    
    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', showPreviousItem);
    }
    
    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', showNextItem);
    }
    
    // Close on background click
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeLightbox();
        }
      });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      const modal = document.getElementById('lightbox-modal');
      if (!modal || modal.style.display === 'none') return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPreviousItem();
          break;
        case 'ArrowRight':
          showNextItem();
          break;
      }
    });
  }
  
  /**
   * Open lightbox with specific item
   */
  function openLightbox(index) {
    currentLightboxIndex = index;
    showLightboxItem();
    
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
  
  /**
   * Close lightbox
   */
  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Show previous item in lightbox
   */
  function showPreviousItem() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    showLightboxItem();
  }
  
  /**
   * Show next item in lightbox
   */
  function showNextItem() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    showLightboxItem();
  }
  
  /**
   * Display current item in lightbox
   */
  function showLightboxItem() {
    const item = filteredItems[currentLightboxIndex];
    if (!item) return;
    
    const contentDiv = document.querySelector('.lightbox-content');
    if (!contentDiv) return;
    
    contentDiv.innerHTML = '';
    
    if (item.type === 'video' && item.videoUrl) {
      // Create iframe for video
      const iframe = document.createElement('iframe');
      iframe.src = item.videoUrl;
      iframe.title = item.title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      contentDiv.appendChild(iframe);
    } else if (item.type === 'image' && item.imageUrl) {
      // Create image element
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.title;
      contentDiv.appendChild(img);
    }
    
    // Update navigation button states
    updateLightboxButtons();
  }
  
  /**
   * Update lightbox navigation button states
   */
  function updateLightboxButtons() {
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (prevBtn) {
      prevBtn.style.display = filteredItems.length > 1 ? 'flex' : 'none';
    }
    
    if (nextBtn) {
      nextBtn.style.display = filteredItems.length > 1 ? 'flex' : 'none';
    }
  }
  
})();
