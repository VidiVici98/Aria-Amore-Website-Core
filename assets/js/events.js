document.addEventListener('DOMContentLoaded', async () => {
  const eventsPage = document.getElementById('events-page');
  if (!eventsPage) return;
  const upcomingSection = document.getElementById('upcoming-events');
  const archivedList = document.getElementById('archived-events-list');
  const calendarWrapper = document.querySelector('.events-calendar-wrapper');
  const toggleArchiveBtn = document.getElementById('toggle-archived-events');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // =========================
  // LOAD EVENTS DATA
  // =========================
  let events = [];
  try {
    const res = await fetch('/data/events.json');
    if (!res.ok) throw new Error('Failed to load events.json');
    const data = await res.json();
    events = data.events || [];
  } catch (err) {
    console.error(err);
    return;
  }
  // =========================
  // SORT & SPLIT EVENTS
  // =========================
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcomingEvents = [];
  const archivedEvents = [];
  events.forEach(ev => {
    const evDate = new Date(ev.date);
    evDate.setHours(0, 0, 0, 0);
    (evDate >= today ? upcomingEvents : archivedEvents).push(ev);
  });
  // =========================
  // HELPERS
  // =========================
  function googleCalendarLink(ev) {
    const start = new Date(ev.date).toISOString().replace(/[-:]|\.\d{3}/g, '');
    const end = new Date(new Date(ev.date).getTime() + 2 * 60 * 60 * 1000)
      .toISOString().replace(/[-:]|\.\d{3}/g, '');
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: ev.title,
      dates: `${start}/${end}`,
      location: ev.address,
      details: ev.description
    });
    return `https://www.google.com/calendar/render?${params.toString()}`;
  }
  function shareEvent(ev) {
    const url = `${location.origin}${location.pathname}#${ev.id}`;
    if (navigator.share) {
      navigator.share({
        title: ev.title,
        text: ev.description,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Event link copied to clipboard');
      });
    }
  }
  function scrollToEventWithHighlight(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('event-highlight');
    setTimeout(() => target.classList.remove('event-highlight'), 2000);
    history.pushState(null, '', `#${id}`);
  }
function renderCalendarMonth(year, month, eventsForMonth) {
  const tableBody = document.querySelector('.events-calendar tbody');
  const label = document.getElementById('calendar-month-label');
  tableBody.innerHTML = '';
  label.textContent = new Date(year, month)
    .toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let row = document.createElement('tr');
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement('td'));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    if (row.children.length === 7) {
      tableBody.appendChild(row);
      row = document.createElement('tr');
    }
    const cell = document.createElement('td');
    const ev = eventsForMonth.find(e => {
      const d = new Date(e.date);
      return d.getDate() === day;
    });
    if (ev) {
      const link = document.createElement('a');
      link.href = `#${ev.id}`;
      link.className = 'calendar-event';
      link.textContent = day;
      // Tooltip data
      link.dataset.tooltip = `
${ev.title}
${new Date(ev.date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
${ev.address}
      `.trim();
      link.addEventListener('click', e => {
        e.preventDefault();
        scrollToEventWithHighlight(ev.id);
      });
      cell.appendChild(link);
    } else {
      cell.textContent = day;
    }
    row.appendChild(cell);
  }
  tableBody.appendChild(row);
}
  // =========================
  // RENDER EVENT CARD
  // =========================
  function renderEventCard(ev, isArchived = false) {
    const article = document.createElement('article');
    article.id = ev.id;
    article.className = `event-card ${isArchived ? 'archived' : 'upcoming'}`;
    article.dataset.eventId = ev.id;
    article.innerHTML = `
      <div class="event-content">
        <div class="event-media-wrapper">
          <img src="${ev.image}" alt="${ev.title}">
        </div>
        <div class="event-description">
          <p>${ev.description}</p>
          <img class="victorian-separator" src="/assets/media/images/victorian-separator.svg" alt="" role="presentation">
          <ul class="event-details">
            <li>
              <time datetime="${ev.date}">
                ${new Date(ev.date).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })} · ${new Date(ev.date).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </time>
            </li>
            <li>${ev.venue}</li>
            <li>${ev.address}</li>
            <li>${ev.performers.join(' | ')}</li>
            <li>${ev.admission}</li>
          </ul>
          <img class="victorian-separator" src="/assets/media/images/victorian-separator.svg" alt="" role="presentation">
          <div class="share-icons-wrapper">
            <strong class="spread-word">Save The Date & Spread The Word</strong>
            <a href="${googleCalendarLink(ev)}" target="_blank" rel="noopener">
              <img src="/assets/media/images/google-calendar.svg" class="share-icons">
            </a>
            <button data-action="share" aria-label="Share event">
              <img src="/assets/media/images/share-icon.svg" class="share-icons">
            </button>
          </div>
        </div>
      </div>
    `;
    return article;
  }
  // =========================
  // POPULATE EVENTS
  // =========================
  upcomingSection.innerHTML = '';
  upcomingEvents.forEach(ev => upcomingSection.appendChild(renderEventCard(ev)));
  archivedList.innerHTML = '';
  archivedEvents.forEach(ev => archivedList.appendChild(renderEventCard(ev, true)));
  // =========================
  // EVENT DELEGATION (SHARE)
  // =========================
  eventsPage.addEventListener('click', e => {
    const shareBtn = e.target.closest('[data-action="share"]');
    if (!shareBtn) return;

    const card = shareBtn.closest('.event-card');
    const ev = events.find(e => e.id === card.dataset.eventId);
    if (ev) shareEvent(ev);
  });
// =========================
// CALENDAR WITH NAVIGATION
// =========================
if (calendarWrapper && upcomingEvents.length) {
  const monthMap = [...new Set(
    upcomingEvents.map(ev => {
      const d = new Date(ev.date);
      return `${d.getFullYear()}-${d.getMonth()}`;
    })
  )];
  let currentIndex = 0;
  const prevBtn = document.getElementById('calendar-prev');
  const nextBtn = document.getElementById('calendar-next');
  function updateCalendar() {
    const [year, month] = monthMap[currentIndex].split('-').map(Number);
    const eventsForMonth = upcomingEvents.filter(ev => {
      const d = new Date(ev.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
    renderCalendarMonth(year, month, eventsForMonth);
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === monthMap.length - 1;
  }
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCalendar();
    }
  });
  nextBtn.addEventListener('click', () => {
    if (currentIndex < monthMap.length - 1) {
      currentIndex++;
      updateCalendar();
    }
  });
  updateCalendar();
}
  // =========================
  // ARCHIVE TOGGLE
  // =========================
  if (toggleArchiveBtn) {
    toggleArchiveBtn.addEventListener('click', () => {
      const expanded = toggleArchiveBtn.getAttribute('aria-expanded') === 'true';
      toggleArchiveBtn.setAttribute('aria-expanded', String(!expanded));
      archivedList.hidden = expanded;
      toggleArchiveBtn.textContent = expanded
        ? 'View Past Performances'
        : 'Hide Past Performances';
    });
  }
  if (!archivedList.children.length && toggleArchiveBtn) {
    toggleArchiveBtn.style.display = 'none';
  }
  // =========================
  // DEEP LINK SUPPORT
  // =========================
  if (location.hash) {
    const id = location.hash.slice(1);
    const target = document.getElementById(id);
    if (target?.classList.contains('archived') &&
        toggleArchiveBtn?.getAttribute('aria-expanded') !== 'true') {
      toggleArchiveBtn.click();
    }
    setTimeout(() => scrollToEventWithHighlight(id), 300);
  }
});
// =========================
// IMAGE OPTIMIZATION
// =========================
document.querySelectorAll('.event-media-wrapper img').forEach(img => {
  img.loading = 'lazy';
  img.decoding = 'async';
});
// =========================
// ICS GENERATION
// =========================
function generateICS(ev) {
  const start = new Date(ev.date).toISOString().replace(/[-:]|\.\d{3}/g, '');
  const end = new Date(new Date(ev.date).getTime() + 2 * 60 * 60 * 1000)
    .toISOString().replace(/[-:]|\.\d{3}/g, '');
  return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aria Amore//Events//EN
BEGIN:VEVENT
UID:${ev.id}@ariaamore.com
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${ev.title}
LOCATION:${ev.address}
DESCRIPTION:${ev.description}
END:VEVENT
END:VCALENDAR`.trim();
}
// Delegate ICS clicks
document.getElementById('events-page').addEventListener('click', e => {
  const btn = e.target.closest('[data-action="ics"]');
  if (!btn) return;
  const card = btn.closest('.event-card');
  const evId = card.dataset.eventId;
  const ev = window.__EVENTS__?.find(e => e.id === evId);
  if (!ev) return;
  const blob = new Blob([generateICS(ev)], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ev.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
});
// =========================
// JSON-LD EVENT SCHEMA
// =========================
(function injectEventSchema() {
  if (!window.__EVENTS__) return;
  const schema = window.__EVENTS__.map(ev => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": ev.title,
    "startDate": ev.date,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": ev.venue,
      "address": ev.address
    },
    "description": ev.description
  }));
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
})();
// =========================
// CALENDAR MONTH NAVIGATION
// =========================
(function calendarNavigation() {
  const calendar = document.querySelector('.events-calendar-wrapper');
  if (!calendar || !window.__UPCOMING_EVENTS__) return;
  const months = [...new Set(
    window.__UPCOMING_EVENTS__.map(ev => {
      const d = new Date(ev.date);
      return `${d.getFullYear()}-${d.getMonth()}`;
    })
  )];
  let index = 0;
  const label = document.getElementById('calendar-month-label');
  const prev = document.getElementById('calendar-prev');
  const next = document.getElementById('calendar-next');
  function renderMonth(i) {
    const [year, month] = months[i].split('-').map(Number);
    window.renderCalendarMonth(year, month);
    label.textContent = new Date(year, month)
      .toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    prev.disabled = i === 0;
    next.disabled = i === months.length - 1;
  }
  prev?.addEventListener('click', () => renderMonth(--index));
  next?.addEventListener('click', () => renderMonth(++index));
  renderMonth(index);
})();
