document.addEventListener("DOMContentLoaded", () => {
  function loadComponent(containerId, filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        return response.text();
      })
      .then(data => {
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = data;
      })
      .catch(err => console.error(err));
  }

  // Call it for header and footer
  loadComponent("site-header-container", "/public/components/header.html"); // <-- adjust path
  loadComponent("site-footer-container", "/public/components/footer.html"); // <-- adjust path
});
// === HAMBURGER MENU TOGGLE ===
document.getElementById("menu-toggle").addEventListener("click", function () {
  let menu = document.getElementById("mobile-menu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
});

// === FLIPPING FORM ===
document.getElementById("flipForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  document.querySelector(".flip-container").classList.add("flipped");
});
function flipBack() {
  document.querySelector(".flip-container").classList.remove("flipped");
}
