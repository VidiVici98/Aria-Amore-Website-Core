/**
 * Social Sharing Buttons Component
 * Provides easy sharing to multiple social platforms
 */

(function() {
  'use strict';

  const SocialShare = {
    /**
     * Generate share URLs for different platforms
     */
    getShareUrls: function(config) {
      const url = encodeURIComponent(config.url || window.location.href);
      const title = encodeURIComponent(config.title || document.title);
      const description = encodeURIComponent(config.description || '');
      const image = encodeURIComponent(config.image || '');
      const hashtags = config.hashtags || 'AriaAmore,LiveOpera,WeddingMusic';
      
      return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`,
        whatsapp: `https://wa.me/?text=${title}%20${url}`,
        email: `mailto:?subject=${title}&body=${description}%20${url}`,
        copy: url
      };
    },

    /**
     * Open share popup window
     */
    openShareWindow: function(url, title) {
      const width = 600;
      const height = 500;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      window.open(
        url,
        title || 'Share',
        `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1`
      );
    },

    /**
     * Copy link to clipboard
     */
    copyToClipboard: function(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => {
          this.showCopyFeedback();
          return true;
        }).catch(err => {
          console.error('Failed to copy:', err);
          return false;
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          document.body.removeChild(textArea);
          this.showCopyFeedback();
          return true;
        } catch (err) {
          document.body.removeChild(textArea);
          console.error('Failed to copy:', err);
          return false;
        }
      }
    },

    /**
     * Show feedback when link is copied
     */
    showCopyFeedback: function() {
      const feedback = document.createElement('div');
      feedback.className = 'copy-feedback';
      feedback.textContent = '✓ Link copied to clipboard!';
      feedback.setAttribute('role', 'alert');
      feedback.setAttribute('aria-live', 'polite');
      
      document.body.appendChild(feedback);
      
      setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 300);
      }, 2000);
    },

    /**
     * Create share buttons HTML
     */
    createShareButtons: function(config = {}) {
      const urls = this.getShareUrls(config);
      const platforms = config.platforms || ['facebook', 'twitter', 'linkedin', 'pinterest', 'whatsapp', 'email', 'copy'];
      
      let html = '<div class="social-share-buttons" role="group" aria-label="Share this page">';
      html += '<h3 class="share-heading">Share This</h3>';
      html += '<div class="share-buttons-grid">';
      
      const icons = {
        facebook: '📘',
        twitter: '🐦',
        linkedin: '💼',
        pinterest: '📌',
        whatsapp: '💬',
        email: '✉️',
        copy: '🔗'
      };
      
      const labels = {
        facebook: 'Facebook',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        pinterest: 'Pinterest',
        whatsapp: 'WhatsApp',
        email: 'Email',
        copy: 'Copy Link'
      };
      
      platforms.forEach(platform => {
        if (urls[platform]) {
          html += `
            <button 
              class="share-btn share-btn-${platform}" 
              data-platform="${platform}"
              data-url="${urls[platform]}"
              aria-label="Share on ${labels[platform]}"
            >
              <span class="share-icon">${icons[platform]}</span>
              <span class="share-label">${labels[platform]}</span>
            </button>
          `;
        }
      });
      
      html += '</div></div>';
      return html;
    },

    /**
     * Initialize share buttons on the page
     */
    init: function(config = {}) {
      // Add share buttons to designated containers
      const containers = document.querySelectorAll('[data-social-share]');
      
      containers.forEach(container => {
        const pageConfig = {
          ...config,
          title: container.dataset.title || config.title,
          description: container.dataset.description || config.description,
          image: container.dataset.image || config.image,
          url: container.dataset.url || config.url
        };
        
        container.innerHTML = this.createShareButtons(pageConfig);
      });
      
      // Add click handlers
      document.addEventListener('click', (e) => {
        const shareBtn = e.target.closest('.share-btn');
        if (shareBtn) {
          e.preventDefault();
          const platform = shareBtn.dataset.platform;
          const url = shareBtn.dataset.url;
          
          if (platform === 'copy') {
            this.copyToClipboard(decodeURIComponent(url));
          } else {
            this.openShareWindow(url, platform);
          }
          
          // Track share event (if analytics available)
          if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
              method: platform,
              content_type: 'page',
              item_id: window.location.pathname
            });
          }
        }
      });
    }
  };

  // Make available globally
  window.SocialShare = SocialShare;

  // Auto-initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SocialShare.init());
  } else {
    SocialShare.init();
  }
})();
