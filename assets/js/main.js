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
