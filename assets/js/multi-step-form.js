/**
 * Multi-Step Form Component for Aria Amore
 * Provides a smooth, user-friendly multi-step form experience
 */

(function(window) {
    'use strict';

    const MultiStepForm = {
        currentStep: 1,
        totalSteps: 0,
        formElement: null,
        stepsData: {},

        /**
         * Initialize multi-step form
         * @param {string} formId - The ID of the form to convert to multi-step
         * @param {object} options - Configuration options
         */
        init: function(formId, options = {}) {
            this.formElement = document.getElementById(formId);
            if (!this.formElement) {
                console.error('Form not found:', formId);
                return;
            }

            // Default options
            const defaultOptions = {
                showProgressBar: true,
                showStepNumbers: true,
                validateOnNext: true,
                animationDuration: 300,
                onStepChange: null,
                onComplete: null
            };

            this.options = { ...defaultOptions, ...options };
            this.currentStep = 1;
            
            // Wrap form fields in steps
            this.setupSteps();
            
            // Create progress indicator
            if (this.options.showProgressBar) {
                this.createProgressBar();
            }
            
            // Create navigation buttons
            this.createNavigation();
            
            // Show first step
            this.showStep(1);
            
            // Handle form submission
            this.formElement.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.currentStep === this.totalSteps) {
                    if (this.options.onComplete) {
                        this.options.onComplete(this.formElement);
                    } else {
                        this.formElement.submit();
                    }
                }
            });
        },

        /**
         * Organize form fields into steps
         */
        setupSteps: function() {
            const steps = this.formElement.querySelectorAll('.form-step');
            
            if (steps.length === 0) {
                console.error('No .form-step elements found in form');
                return;
            }
            
            this.totalSteps = steps.length;
            
            steps.forEach((step, index) => {
                step.setAttribute('data-step', index + 1);
                step.style.display = 'none';
                
                // Store step data
                this.stepsData[index + 1] = {
                    element: step,
                    title: step.getAttribute('data-step-title') || `Step ${index + 1}`,
                    fields: step.querySelectorAll('input, select, textarea')
                };
            });
        },

        /**
         * Create progress bar
         */
        createProgressBar: function() {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'form-progress-container';
            progressContainer.setAttribute('role', 'navigation');
            progressContainer.setAttribute('aria-label', 'Form progress');
            
            const progressBar = document.createElement('div');
            progressBar.className = 'form-progress-bar';
            progressBar.innerHTML = '<div class="form-progress-fill"></div>';
            
            const stepsIndicator = document.createElement('div');
            stepsIndicator.className = 'form-steps-indicator';
            
            // Create step dots
            for (let i = 1; i <= this.totalSteps; i++) {
                const stepDot = document.createElement('div');
                stepDot.className = 'form-step-dot';
                stepDot.setAttribute('data-step', i);
                stepDot.innerHTML = `
                    <span class="step-number">${i}</span>
                    <span class="step-title">${this.stepsData[i].title}</span>
                `;
                stepsIndicator.appendChild(stepDot);
            }
            
            progressContainer.appendChild(progressBar);
            progressContainer.appendChild(stepsIndicator);
            
            // Insert before form fields
            this.formElement.insertBefore(progressContainer, this.formElement.firstChild);
        },

        /**
         * Create navigation buttons
         */
        createNavigation: function() {
            const navContainer = document.createElement('div');
            navContainer.className = 'form-navigation';
            
            const prevButton = document.createElement('button');
            prevButton.type = 'button';
            prevButton.className = 'form-nav-btn form-prev-btn';
            prevButton.innerHTML = '← Previous';
            prevButton.addEventListener('click', () => this.previousStep());
            
            const nextButton = document.createElement('button');
            nextButton.type = 'button';
            nextButton.className = 'form-nav-btn form-next-btn';
            nextButton.innerHTML = 'Next →';
            nextButton.addEventListener('click', () => this.nextStep());
            
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.className = 'form-nav-btn form-submit-btn';
            submitButton.innerHTML = 'Send Inquiry';
            submitButton.style.display = 'none';
            
            navContainer.appendChild(prevButton);
            navContainer.appendChild(nextButton);
            navContainer.appendChild(submitButton);
            
            // Append to form
            this.formElement.appendChild(navContainer);
        },

        /**
         * Show specific step
         */
        showStep: function(stepNumber) {
            if (stepNumber < 1 || stepNumber > this.totalSteps) {
                return;
            }
            
            // Hide all steps
            Object.values(this.stepsData).forEach(step => {
                step.element.style.display = 'none';
            });
            
            // Show current step
            this.stepsData[stepNumber].element.style.display = 'block';
            this.currentStep = stepNumber;
            
            // Update progress bar
            this.updateProgress();
            
            // Update navigation buttons
            this.updateNavigation();
            
            // Scroll to top of form
            this.formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Focus first field in step
            const firstField = this.stepsData[stepNumber].fields[0];
            if (firstField && firstField.type !== 'hidden') {
                setTimeout(() => firstField.focus(), 100);
            }
            
            // Call callback
            if (this.options.onStepChange) {
                this.options.onStepChange(stepNumber, this.totalSteps);
            }
        },

        /**
         * Update progress bar
         */
        updateProgress: function() {
            const progressFill = this.formElement.querySelector('.form-progress-fill');
            const stepDots = this.formElement.querySelectorAll('.form-step-dot');
            
            if (progressFill) {
                const percentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
                progressFill.style.width = percentage + '%';
            }
            
            if (stepDots) {
                stepDots.forEach((dot, index) => {
                    const stepNum = index + 1;
                    dot.classList.remove('active', 'completed');
                    
                    if (stepNum === this.currentStep) {
                        dot.classList.add('active');
                    } else if (stepNum < this.currentStep) {
                        dot.classList.add('completed');
                    }
                });
            }
        },

        /**
         * Update navigation button visibility
         */
        updateNavigation: function() {
            const prevBtn = this.formElement.querySelector('.form-prev-btn');
            const nextBtn = this.formElement.querySelector('.form-next-btn');
            const submitBtn = this.formElement.querySelector('.form-submit-btn');
            
            if (prevBtn) {
                prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-block';
            }
            
            if (nextBtn && submitBtn) {
                if (this.currentStep === this.totalSteps) {
                    nextBtn.style.display = 'none';
                    submitBtn.style.display = 'inline-block';
                } else {
                    nextBtn.style.display = 'inline-block';
                    submitBtn.style.display = 'none';
                }
            }
        },

        /**
         * Validate current step
         */
        validateCurrentStep: function() {
            if (!this.options.validateOnNext) {
                return true;
            }
            
            const currentStepData = this.stepsData[this.currentStep];
            let isValid = true;
            
            currentStepData.fields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                    field.classList.add('invalid');
                    
                    // Show error if FormValidator is available
                    if (window.FormValidator) {
                        window.FormValidator.validateField(field);
                    }
                } else {
                    field.classList.remove('invalid');
                }
            });
            
            return isValid;
        },

        /**
         * Go to next step
         */
        nextStep: function() {
            if (this.validateCurrentStep()) {
                this.showStep(this.currentStep + 1);
            }
        },

        /**
         * Go to previous step
         */
        previousStep: function() {
            this.showStep(this.currentStep - 1);
        },

        /**
         * Go to specific step
         */
        goToStep: function(stepNumber) {
            this.showStep(stepNumber);
        }
    };

    // Expose to global scope
    window.MultiStepForm = MultiStepForm;

})(window);
