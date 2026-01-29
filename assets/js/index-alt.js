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

// Newsletter Subscription
function subscribeNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  alert(`Thank you for subscribing with: ${email}\n\nYou'll receive your 10% discount code via email shortly!`);
  event.target.reset();
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
