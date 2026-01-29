/*=====================================
  Load and Populate Contact Page Content
=====================================*/
document.addEventListener('DOMContentLoaded', async () => {
  const contactPage = document.getElementById('contact-page');
  if (!contactPage) return;

  try {
    const response = await fetch('/data/contact.json');
    if (!response.ok) throw new Error('Failed to load contact.json');
    
    const data = await response.json();

    // Populate hero section
    const intro = document.getElementById('contact-intro');
    if (intro) intro.textContent = data.intro;

    // Populate contact information
    const email = document.getElementById('contact-email');
    if (email) {
      email.textContent = data.contactInfo.email;
      email.href = `mailto:${data.contactInfo.email}`;
    }

    const phone = document.getElementById('contact-phone');
    if (phone) {
      phone.textContent = data.contactInfo.phone;
      const cleanPhone = data.contactInfo.phone.replace(/\D/g, '');
      phone.href = `tel:+1${cleanPhone}`;
    }

    const hours = document.getElementById('contact-hours');
    if (hours) hours.textContent = data.contactInfo.hours;

    const address = document.getElementById('contact-address');
    if (address) address.textContent = data.contactInfo.address;

    // Populate social links
    const instagram = document.getElementById('social-instagram');
    if (instagram) instagram.href = data.social.instagram;

    const tiktok = document.getElementById('social-tiktok');
    if (tiktok) tiktok.href = data.social.tiktok;

    // Populate form placeholders and labels
    const nameInput = document.getElementById('name');
    if (nameInput) nameInput.placeholder = data.formFields.namePlaceholder;

    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.placeholder = data.formFields.emailPlaceholder;

    const phoneInput = document.getElementById('phone');
    if (phoneInput) phoneInput.placeholder = data.formFields.phonePlaceholder;

    const messageInput = document.getElementById('message');
    if (messageInput) messageInput.placeholder = data.formFields.messagePlaceholder;

    // Populate event type dropdown
    const eventTypeSelect = document.getElementById('event-type');
    if (eventTypeSelect && data.formFields.eventTypes) {
      data.formFields.eventTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase().replace(/\s+/g, '-');
        option.textContent = type;
        eventTypeSelect.appendChild(option);
      });
    }

    // Populate submit button text
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.textContent = data.formFields.submitText;

    // Populate FAQ section
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer && data.faq) {
      data.faq.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        const question = document.createElement('button');
        question.className = 'faq-question';
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        question.innerHTML = `
          <span>${item.question}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        `;
        
        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.id = `faq-answer-${index}`;
        answer.setAttribute('aria-hidden', 'true');
        answer.innerHTML = `<p>${item.answer}</p>`;
        
        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqContainer.appendChild(faqItem);

        // Add click handler for FAQ accordion
        question.addEventListener('click', () => {
          const isExpanded = question.getAttribute('aria-expanded') === 'true';
          question.setAttribute('aria-expanded', !isExpanded);
          answer.setAttribute('aria-hidden', isExpanded);
          question.querySelector('.faq-icon').textContent = isExpanded ? '+' : '−';
        });
      });
    }

  } catch (error) {
    console.error('Error loading contact page content:', error);
  }
});

/*=====================================
  Form Submission Handler
=====================================*/
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check honeypot field
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value !== '') {
      console.warn('Spam detected');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Success message
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = `
          <h3>Thank you for your inquiry!</h3>
          <p>We've received your message and will get back to you within 24-48 hours.</p>
        `;
        form.replaceWith(successMsg);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Error message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'form-error';
      errorMsg.innerHTML = `
        <p>Sorry, there was an error sending your message. Please try again or contact us directly at <a href="mailto:info@ariaamore.com">info@ariaamore.com</a></p>
      `;
      form.insertBefore(errorMsg, submitBtn);
      
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Remove error message after 5 seconds
      setTimeout(() => errorMsg.remove(), 5000);
    }
  });
});
