/*=====================================
  Load and Populate About Page Content
=====================================*/
(() => {
  const faqContainer = document.querySelector('.faq-container');
  const faqTemplate = document.getElementById('faq-template');

  if (!faqContainer || !faqTemplate) return;

  // Fetch About data from JSON
  fetch('/data/about.json')
    .then(res => res.json())
    .then(data => {
      // Populate Hero Section
      if (data.hero) {
        const subheading = document.getElementById('about-subheading');
        if (subheading) subheading.textContent = data.hero.subheading;
      }

      // Populate Mission Section
      if (data.mission) {
        const missionHeading = document.getElementById('mission-heading');
        const missionText = document.getElementById('mission-text');
        if (missionHeading) missionHeading.textContent = data.mission.heading;
        if (missionText) missionText.textContent = data.mission.text;
      }

      // Populate Story Section
      if (data.story) {
        const storyHeading = document.getElementById('story-heading');
        const storyText = document.getElementById('story-text');
        if (storyHeading) storyHeading.textContent = data.story.heading;
        if (storyText) storyText.textContent = data.story.text;
      }

      // Populate Values Section
      if (data.values) {
        const valuesGrid = document.getElementById('values-grid');
        if (valuesGrid) {
          data.values.forEach(value => {
            const valueCard = document.createElement('div');
            valueCard.className = 'value-card';
            valueCard.innerHTML = `
              <h3>${value.title}</h3>
              <p>${value.description}</p>
            `;
            valuesGrid.appendChild(valueCard);
          });
        }
      }

      // Populate FAQ Section
      if (!data.faqs) return;

      data.faqs.forEach(faq => {
        const clone = faqTemplate.content.cloneNode(true);
        const details = clone.querySelector('details.faq-item');
        const questionSpan = clone.querySelector('.question-text');
        const answerP = clone.querySelector('.answer-text');
        const summary = clone.querySelector('summary');
        const icon = summary.querySelector('.faq-icon');

        if (faq.id) details.id = faq.id;
        questionSpan.textContent = faq.question;
        answerP.textContent = faq.answer;

        // Icon toggle
        details.addEventListener('toggle', () => {
          icon.textContent = details.open ? '➖' : '➕';
        });

        faqContainer.appendChild(clone);
      });
    })
    .catch(err => console.error('Failed to load About data:', err));
})();
