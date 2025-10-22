/*=====================================
  Carousel Logic
=====================================*/
const carousel = document.querySelector('.carousel');
const cards = Array.from(document.querySelectorAll('.plan'));
const total = cards.length;
let activeIndex = 0;
function updateCarousel() {
  cards.forEach((card, i) => {
    const offset = (i - activeIndex + total) % total;
    let angle, xOffset, zOffset, scale;
    if (offset === 0) {
      // Center card
      angle = 0;
      xOffset = 0;
      zOffset = 250;
      scale = 1;
      card.style.opacity = "1";
      card.style.zIndex = "3";
    } 
    else if (offset === 1) {
      // Right card
      angle = 15;
      xOffset = 650;
      zOffset = 100;
      scale = 0.85;
      card.style.opacity = "0.6";
      card.style.zIndex = "2";
    } 
    else if (offset === total - 1) {
      // Left card
      angle = -15;
      xOffset = -650;
      zOffset = 100;
      scale = 0.85;
      card.style.opacity = "0.6";
      card.style.zIndex = "2";
    } 
    else {
      // Hidden cards (in background)
      angle = 0;
      xOffset = 0;
      zOffset = 0;
      scale = 0.7;
      card.style.opacity = "0";
      card.style.zIndex = "1";
    }
    card.style.transform = `
      translateX(${xOffset}px)
      translateZ(${zOffset}px)
      scale(${scale})
      rotateY(${angle}deg)
    `;
  });
}
document.querySelector('.next').addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % total;
  updateCarousel();
});
document.querySelector('.prev').addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + total) % total;
  updateCarousel();
});
updateCarousel();
/*=====================================
  Fetch & Embed Packages From JSON
=====================================*/
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/data/services.json");
    if (!response.ok) throw new Error("Failed to load services.json");
    const data = await response.json();
    const headingEl = document.getElementById("packages-heading");
    if (headingEl) headingEl.textContent = data.heading;
    const planEls = document.querySelectorAll(".carousel .plan");
    data.plans.forEach((plan, index) => {
      const planEl = planEls[index];
      if (!planEl) return;
      const titleEl = planEl.querySelector(".plan-title");
      const featuresEl = planEl.querySelector(".features");
      const priceEl = planEl.querySelector(".price");
      const btnEl = planEl.querySelector(".btn");
      if (titleEl) titleEl.textContent = plan.name;
      if (priceEl) priceEl.textContent = plan.price;
      if (btnEl) btnEl.textContent = plan.buttonText;
      if (featuresEl) {
        featuresEl.innerHTML = plan.features
          .map(feature => `<li>${feature}</li>`)
          .join("");
      }
    });
    // ✅ Initialize your carousel AFTER the content loads
    if (typeof initCarousel === "function") {
      initCarousel();
    }
  } catch (err) {
    console.error("Error embedding service data:", err);
  }
});
