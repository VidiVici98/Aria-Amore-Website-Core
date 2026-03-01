/**
 * Phone Number Formatting Enhancement
 * Auto-formats phone numbers as user types (US format)
 */

(function() {
  'use strict';

  /**
   * Format phone number to (XXX) XXX-XXXX
   * @param {string} value - Raw phone number value
   * @returns {string} Formatted phone number
   */
  function formatPhoneNumber(value) {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  }

  /**
   * Initialize phone formatting on page load
   */
  function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
      // Add placeholder if not already set
      if (!input.placeholder) {
        input.placeholder = '(555) 123-4567';
      }

      // Add descriptive text for accessibility
      if (!input.getAttribute('aria-describedby')) {
        const describerId = `${input.id || 'phone'}-description`;
        const description = document.createElement('span');
        description.id = describerId;
        description.className = 'field-description';
        description.textContent = 'Format: (555) 123-4567';
        description.style.cssText = 'display: block; font-size: 0.85rem; color: #666; margin-top: 0.25rem;';
        
        input.setAttribute('aria-describedby', describerId);
        input.parentNode.appendChild(description);
      }

      // Format on input
      input.addEventListener('input', function(e) {
        const cursorPosition = this.selectionStart;
        const oldLength = this.value.length;
        
        // Format the value
        this.value = formatPhoneNumber(this.value);
        
        // Adjust cursor position after formatting
        const newLength = this.value.length;
        const diff = newLength - oldLength;
        
        // Set cursor position (accounting for added formatting characters)
        if (diff > 0) {
          this.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
        } else {
          this.setSelectionRange(cursorPosition, cursorPosition);
        }
      });

      // Remove formatting on blur if empty or invalid
      input.addEventListener('blur', function() {
        const cleaned = this.value.replace(/\D/g, '');
        if (cleaned.length > 0 && cleaned.length < 10) {
          // Add validation feedback for incomplete numbers
          this.setCustomValidity('Please enter a complete 10-digit phone number');
        } else {
          this.setCustomValidity('');
        }
      });

      // Clear validation on focus
      input.addEventListener('focus', function() {
        this.setCustomValidity('');
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhoneFormatting);
  } else {
    initPhoneFormatting();
  }

  // Re-initialize if new content is dynamically loaded
  window.reinitPhoneFormatting = initPhoneFormatting;
})();
