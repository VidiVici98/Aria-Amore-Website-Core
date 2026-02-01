// Alternative Homepage Interactive Features

// Package Selection
function selectPackage(packageName) {
  alert(`Great choice! You've selected the ${packageName} package. Redirecting to booking form...`);
  // In production, this would redirect to services.html#rsvp with the package pre-selected
  window.location.href = '/services.html#rsvp';
}

// Calendar Functionality
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function generateCalendar() {
  const daysContainer = document.getElementById('calendar-days');
  if (!daysContainer) return;
  
  daysContainer.innerHTML = '';
  
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Simulated booked dates (in production, this would come from an API)
  const bookedDates = [5, 12, 18, 25];
  
  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day';
    daysContainer.appendChild(emptyDay);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    if (bookedDates.includes(day)) {
      dayElement.classList.add('booked');
    } else {
      dayElement.classList.add('available');
      dayElement.onclick = (event) => selectDate(day, event);
    }
    
    daysContainer.appendChild(dayElement);
  }
  
  updateMonthDisplay();
}

function selectDate(day, event) {
  const days = document.querySelectorAll('.calendar-day');
  days.forEach(d => d.classList.remove('selected'));
  if (event && event.target) {
    event.target.classList.add('selected');
  }
  alert(`You've selected ${getMonthName(currentMonth)} ${day}, ${currentYear}. Continue to booking?`);
  // In production, this would store the date and proceed to booking form
}

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
}

function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

function updateMonthDisplay() {
  const monthElement = document.getElementById('calendar-month');
  if (monthElement) {
    monthElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
  }
}

// FAQ Toggle
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// Video Player
function playVideo(videoId) {
  alert(`Playing video: ${videoId}. In production, this would open a modal with the embedded video.`);
  // In production, this would open a modal with an embedded YouTube/Vimeo player
}

// Newsletter Subscription with Enhanced UX
function subscribeNewsletter(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const email = emailInput.value.trim();
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNewsletterMessage(form, 'Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Subscribing...';
  submitBtn.disabled = true;
  
  // Simulate API call (replace with actual implementation)
  setTimeout(() => {
    // Success feedback
    showNewsletterMessage(form, `Thank you for subscribing! You'll receive your 10% discount code at ${email} shortly.`, 'success');
    form.reset();
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
    
    // TODO: In production, integrate with email service (e.g., Mailchimp, SendGrid)
    // Example: fetch('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
  }, 1000);
}

// Display newsletter feedback messages
function showNewsletterMessage(form, message, type) {
  // Remove existing message
  const existingMsg = form.querySelector('.newsletter-message');
  if (existingMsg) existingMsg.remove();
  
  // Create new message
  const messageEl = document.createElement('div');
  messageEl.className = `newsletter-message newsletter-${type}`;
  messageEl.setAttribute('role', 'alert');
  messageEl.setAttribute('aria-live', 'polite');
  messageEl.textContent = message;
  
  // Insert after form
  form.parentNode.insertBefore(messageEl, form.nextSibling);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    messageEl.style.opacity = '0';
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}


// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize calendar
  generateCalendar();
  
  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
