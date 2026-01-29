/**
 * Form Validation Library for Aria Amore
 * Provides comprehensive client-side form validation with security features
 */

(function(window) {
    'use strict';

    const FormValidator = {
        /**
         * Initialize form validation
         * @param {string} formId - The ID of the form to validate
         * @param {object} options - Validation options
         */
        init: function(formId, options = {}) {
            const form = document.getElementById(formId);
            if (!form) {
                console.error('Form not found:', formId);
                return;
            }

            // Default options
            const defaultOptions = {
                realTimeValidation: true,
                honeypot: true,
                preventDoubleSubmit: true,
                submitHandler: null
            };

            const settings = { ...defaultOptions, ...options };

            // Add honeypot field if enabled
            if (settings.honeypot) {
                this.addHoneypot(form);
            }

            // Add page load time for bot detection
            this.addPageLoadTime(form);

            // Set up real-time validation
            if (settings.realTimeValidation) {
                this.setupRealTimeValidation(form);
            }

            // Handle form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (settings.preventDoubleSubmit && form.classList.contains('submitting')) {
                    return;
                }

                if (this.validateForm(form)) {
                    form.classList.add('submitting');
                    
                    if (settings.submitHandler) {
                        settings.submitHandler(form, this.getFormData(form));
                    } else {
                        form.submit();
                    }
                }
            });
        },

        /**
         * Add honeypot field (invisible to users, catches bots)
         */
        addHoneypot: function(form) {
            const honeypot = document.createElement('input');
            honeypot.type = 'text';
            honeypot.name = 'extra_info';
            honeypot.style.position = 'absolute';
            honeypot.style.left = '-9999px';
            honeypot.tabIndex = -1;
            honeypot.setAttribute('aria-hidden', 'true');
            honeypot.setAttribute('autocomplete', 'off');
            form.appendChild(honeypot);
        },

        /**
         * Add page load time for bot detection
         */
        addPageLoadTime: function(form) {
            const timeInput = document.createElement('input');
            timeInput.type = 'hidden';
            timeInput.name = 'pageLoadTime';
            timeInput.value = Math.floor(Date.now() / 1000);
            form.appendChild(timeInput);
        },

        /**
         * Set up real-time validation on input fields
         */
        setupRealTimeValidation: function(form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    if (input.classList.contains('invalid')) {
                        this.validateField(input);
                    }
                });
            });
        },

        /**
         * Validate individual field
         */
        validateField: function(field) {
            const value = field.value.trim();
            const type = field.type;
            const required = field.hasAttribute('required');
            let isValid = true;
            let errorMessage = '';

            // Clear previous errors
            this.clearFieldError(field);

            // Check required
            if (required && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            }
            // Email validation
            else if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }
            // Phone validation
            else if (field.name === 'phone' && value) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            }
            // URL validation
            else if (type === 'url' && value) {
                try {
                    new URL(value);
                } catch {
                    isValid = false;
                    errorMessage = 'Please enter a valid URL';
                }
            }
            // Number validation
            else if (type === 'number' && value) {
                const min = field.getAttribute('min');
                const max = field.getAttribute('max');
                const numValue = parseFloat(value);
                
                if (min !== null && numValue < parseFloat(min)) {
                    isValid = false;
                    errorMessage = `Value must be at least ${min}`;
                }
                if (max !== null && numValue > parseFloat(max)) {
                    isValid = false;
                    errorMessage = `Value must be at most ${max}`;
                }
            }
            // Date validation
            else if (type === 'date' && value) {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (field.hasAttribute('data-min-date-today') && selectedDate < today) {
                    isValid = false;
                    errorMessage = 'Date must be today or in the future';
                }
            }
            // Custom pattern validation
            else if (field.hasAttribute('pattern') && value) {
                const pattern = new RegExp(field.getAttribute('pattern'));
                if (!pattern.test(value)) {
                    isValid = false;
                    errorMessage = field.getAttribute('data-error-message') || 'Invalid format';
                }
            }

            // Apply validation result
            if (isValid) {
                field.classList.remove('invalid');
                field.classList.add('valid');
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                this.showFieldError(field, errorMessage);
            }

            return isValid;
        },

        /**
         * Validate entire form
         */
        validateForm: function(form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            let isValid = true;

            inputs.forEach(input => {
                // Skip hidden fields except honeypot check
                if (input.type === 'hidden' && input.name !== 'extra_info') {
                    return;
                }

                // Check honeypot
                if (input.name === 'extra_info' && input.value) {
                    isValid = false;
                    return;
                }

                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        },

        /**
         * Show field error message
         */
        showFieldError: function(field, message) {
            let errorElement = field.parentElement.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.style.color = '#dc3545';
                errorElement.style.fontSize = '0.875rem';
                errorElement.style.marginTop = '0.25rem';
                errorElement.style.display = 'block';
                field.parentElement.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', errorElement.id || 'error-' + field.name);
        },

        /**
         * Clear field error message
         */
        clearFieldError: function(field) {
            const errorElement = field.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        },

        /**
         * Get form data as object
         */
        getFormData: function(form) {
            const formData = new FormData(form);
            const data = {};
            
            for (const [key, value] of formData.entries()) {
                if (key !== 'extra_info') { // Exclude honeypot
                    data[key] = value;
                }
            }
            
            return data;
        },

        /**
         * Sanitize input (basic XSS prevention)
         */
        sanitizeInput: function(input) {
            return input
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        }
    };

    // Expose to global scope
    window.FormValidator = FormValidator;

})(window);
