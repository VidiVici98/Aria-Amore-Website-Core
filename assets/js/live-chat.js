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
     * For demo purposes, uses fallback with enhanced styling
     * To activate Tawk.to: Replace IDs below with your actual credentials
     */
    initTawkTo: function() {
      // DEMO MODE: Using fallback for demonstration
      // To activate live chat:
      // 1. Sign up at https://www.tawk.to (100% free, no credit card)
      // 2. Create a property for ariaamore.com
      // 3. Get your Property ID and Widget ID from the dashboard
      // 4. Replace the values below with your actual IDs
      
      const propertyId = 'DEMO_MODE'; // Replace with actual Property ID (e.g., '5a3d2f8c9b1e4a5b6c7d8e9f')
      const widgetId = 'DEMO_MODE'; // Replace with actual Widget ID (e.g., 'default' or '1gca9b7h8')
      
      // Only initialize if IDs are set
      if (propertyId !== 'DEMO_MODE' && widgetId !== 'DEMO_MODE' && 
          propertyId !== 'YOUR_PROPERTY_ID' && widgetId !== 'YOUR_WIDGET_ID') {
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
        
        // Customize widget appearance to match Aria Amore branding
        Tawk_API.onLoad = function(){
          // Set custom color to gold (#b08b4f)
          Tawk_API.setAttributes({
            name: '',
            email: ''
          }, function(error){});
          
          // Custom welcome message
          Tawk_API.addTags(['website-visitor'], function(error){});
        };
        
        // Track chat events
        Tawk_API.onChatStarted = function(){
          if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_started', {
              event_category: 'engagement',
              event_label: 'Tawk.to Chat'
            });
          }
        };
      } else {
        // Show enhanced fallback button with demo features
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
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-labelledby', 'contact-modal-title');
      modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = `
        <div class="contact-modal-content">
          <button class="modal-close" aria-label="Close contact options">&times;</button>
          <h3 id="contact-modal-title">Get In Touch</h3>
          <p>We'd love to hear from you! Choose your preferred way to connect:</p>
          
          <div class="contact-options">
            <a href="/contact.html" class="contact-option" data-option="form">
              <span class="option-icon">✉️</span>
              <span class="option-text">
                <strong>Contact Form</strong>
                <small>Send us a detailed message</small>
              </span>
              <span class="option-arrow">→</span>
            </a>
            
            <a href="tel:+18435552742" class="contact-option" data-option="phone">
              <span class="option-icon">📞</span>
              <span class="option-text">
                <strong>Call Us</strong>
                <small>(843) 555-2742</small>
              </span>
              <span class="option-arrow">→</span>
            </a>
            
            <a href="mailto:info@ariaamore.com" class="contact-option" data-option="email">
              <span class="option-icon">📧</span>
              <span class="option-text">
                <strong>Email Us</strong>
                <small>info@ariaamore.com</small>
              </span>
              <span class="option-arrow">→</span>
            </a>
            
            <a href="https://www.instagram.com/ariaamore.art" target="_blank" rel="noopener" class="contact-option" data-option="instagram">
              <span class="option-icon">📱</span>
              <span class="option-text">
                <strong>DM on Instagram</strong>
                <small>@ariaamore.art</small>
              </span>
              <span class="option-arrow">→</span>
            </a>
          </div>
          
          <div class="modal-footer">
            <p class="response-time">
              <span class="online-indicator"></span>
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Focus management for accessibility
      const closeBtn = modal.querySelector('.modal-close');
      closeBtn.focus();
      
      // Track modal open
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_modal_open', {
          event_category: 'engagement'
        });
      }
      
      // Close modal on background click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
      
      // Close button
      closeBtn.addEventListener('click', () => {
        this.closeModal(modal);
      });
      
      // Track option clicks
      modal.querySelectorAll('.contact-option').forEach(option => {
        option.addEventListener('click', () => {
          const optionType = option.dataset.option;
          if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_option_selected', {
              event_category: 'engagement',
              event_label: optionType
            });
          }
        });
      });
      
      // ESC key to close
      const escHandler = (e) => {
        if (e.key === 'Escape' && document.querySelector('.contact-modal')) {
          this.closeModal(modal);
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
      
      // Store handler for cleanup
      modal._escHandler = escHandler;
    },

    /**
     * Close modal with animation
     */
    closeModal: function(modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.remove();
        if (modal._escHandler) {
          document.removeEventListener('keydown', modal._escHandler);
        }
      }, 300);
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
