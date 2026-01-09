const toggleBtn = document.getElementById('toggle-archived-events');
const archivedList = document.getElementById('archived-events-list');
if (toggleBtn && archivedList) {
  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    archivedList.hidden = isExpanded;
    toggleBtn.textContent = isExpanded
      ? 'View Past Performances'
      : 'Hide Past Performances';
  });
}