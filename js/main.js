// Navbar Toggle Functionality
const toggle = document.getElementById("navbarMenuToggle");
const navMenu = document.getElementById("navbarMenu");

toggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
