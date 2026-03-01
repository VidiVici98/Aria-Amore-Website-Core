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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4.58 16.59L4 17.17V4H20V16Z" fill="currentColor"/>
          <path d="M7 9H17V11H7V9Z" fill="currentColor"/>
          <path d="M7 12H14V14H7V12Z" fill="currentColor"/>
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
              <span class="option-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                </svg>
              </span>
              <span class="option-text">
                <strong>Contact Form</strong>
                <small>Send us a detailed message</small>
              </span>
              <span class="option-arrow">→</span>
            </a>
            
            <a href="tel:+18435552742" class="contact-option" data-option="phone">
              <span class="option-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                </svg>
              </span>
              <span class="option-text">
                <strong>Call Us</strong>
                <small>(843) 555-2742</small>
              </span>
              <span class="option-arrow">→</span>
            </a>
            
            <a href="mailto:info@ariaamore.com" class="contact-option" data-option="email">
              <span class="option-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                </svg>
              </span>
              <span class="option-text">
                <strong>Email Us</strong>
                <small>info@ariaamore.com</small>
              </span>
              <span class="option-arrow">→</span>
            </a>
            
            <a href="https://www.instagram.com/ariaamore.art" target="_blank" rel="noopener" class="contact-option" data-option="instagram">
              <span class="option-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="currentColor"/>
                </svg>
              </span>
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
