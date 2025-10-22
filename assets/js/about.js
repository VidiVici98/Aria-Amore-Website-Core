(() => {
  const faqContainer = document.querySelector('.faq-container');
  const faqTemplate = document.getElementById('faq-template');

  if (!faqContainer || !faqTemplate) return;

  // Fetch FAQ data from JSON
  fetch('/data/about.json')
    .then(res => res.json())
    .then(data => {
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
    .catch(err => console.error('Failed to load FAQ data:', err));
})();
