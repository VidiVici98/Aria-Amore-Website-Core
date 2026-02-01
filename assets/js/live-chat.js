/**
 * Free Live Chat Widget Integration
 * Using Tawk.to - 100% Free forever, no credit card required
 * 
 * Features:
 * - Real-time messaging
 * - Mobile apps available
 * - Visitor monitoring
 * - Customizable widget
 * - No maintenance cost
 */

(function() {
  'use strict';

  const LiveChat = {
    /**
     * Initialize Tawk.to chat widget
     * Replace with your actual Tawk.to Property ID and Widget ID
     */
    initTawkTo: function() {
      // Tawk.to widget will be initialized here
      // Site owner needs to:
      // 1. Sign up at https://www.tawk.to (100% free)
      // 2. Get their Property ID and Widget ID
      // 3. Replace the IDs below
      
      const propertyId = 'YOUR_PROPERTY_ID'; // Replace with actual ID from Tawk.to
      const widgetId = 'YOUR_WIDGET_ID'; // Replace with actual ID from Tawk.to
      
      // Only initialize if IDs are set
      if (propertyId !== 'YOUR_PROPERTY_ID' && widgetId !== 'YOUR_WIDGET_ID') {
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        
        (function(){
          var s1 = document.createElement("script");
          var s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
        
        // Customize widget appearance
        Tawk_API.onLoad = function(){
          // Set custom color to match Aria Amore branding
          Tawk_API.setAttributes({
            name: '',
            email: ''
          }, function(error){});
        };
      } else {
        // Show fallback contact button if Tawk.to not configured
        this.showFallbackButton();
      }
    },

    /**
     * Show fallback contact button if live chat not configured
     */
    showFallbackButton: function() {
      const button = document.createElement('button');
      button.className = 'fallback-chat-button';
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.75 2.53 15.38 3.44 16.74L2 22L7.26 20.56C8.62 21.47 10.25 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.54 20 9.16 19.58 8 18.85L7.5 18.55L4.5 19.5L5.45 16.5L5.15 16C4.42 14.84 4 13.46 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
          <circle cx="16" cy="12" r="1" fill="currentColor"/>
        </svg>
        <span>Contact Us</span>
      `;
      button.setAttribute('aria-label', 'Open contact options');
      button.onclick = () => this.showContactOptions();
      
      document.body.appendChild(button);
    },

    /**
     * Show contact options modal
     */
    showContactOptions: function() {
      const modal = document.createElement('div');
      modal.className = 'contact-modal';
      modal.innerHTML = `
        <div class="contact-modal-content">
          <button class="modal-close" aria-label="Close">&times;</button>
          <h3>Get In Touch</h3>
          <p>We'd love to hear from you!</p>
          
          <div class="contact-options">
            <a href="/contact.html" class="contact-option">
              <span class="option-icon">✉️</span>
              <span class="option-text">
                <strong>Contact Form</strong>
                <small>Send us a detailed message</small>
              </span>
            </a>
            
            <a href="tel:+18435552742" class="contact-option">
              <span class="option-icon">📞</span>
              <span class="option-text">
                <strong>Call Us</strong>
                <small>(843) 555-2742</small>
              </span>
            </a>
            
            <a href="mailto:info@ariaamore.com" class="contact-option">
              <span class="option-icon">📧</span>
              <span class="option-text">
                <strong>Email Us</strong>
                <small>info@ariaamore.com</small>
              </span>
            </a>
            
            <a href="https://www.instagram.com/ariaamore.art" target="_blank" rel="noopener" class="contact-option">
              <span class="option-icon">📱</span>
              <span class="option-text">
                <strong>DM on Instagram</strong>
                <small>@ariaamore.art</small>
              </span>
            </a>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Close modal on background click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
      
      // Close button
      modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
      });
      
      // ESC key to close
      document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape' && document.querySelector('.contact-modal')) {
          modal.remove();
          document.removeEventListener('keydown', closeOnEsc);
        }
      });
    },

    /**
     * Initialize chat widget
     */
    init: function() {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initTawkTo());
      } else {
        this.initTawkTo();
      }
    }
  };

  // Make available globally
  window.LiveChat = LiveChat;

  // Auto-initialize
  LiveChat.init();
})();
