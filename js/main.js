// All common functions are defined here

// Toggle Class on Element
function toggleClass(id, removeClass, addClass) {
  const el = document.getElementById(id);
  if (!el) return;

  if (addClass) {
    el.classList.remove(removeClass);
    el.classList.add(addClass);
  } else {
    el.classList.toggle(removeClass);
  }
}

// Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Hide All Sections
function hideAllSections() {
  const sections = document.querySelectorAll(".page-section");
  sections?.forEach((section) => section.classList.add("hidden"));
}

// Show Section
function showSection(id) {
  const section = document.getElementById(id);
  const navMenu = document.getElementById("navbarMenu");

  if (navMenu?.classList.contains("active")) {
    navMenu.classList.remove("active");
  }

  hideAllSections();
  if (section) {
    section.classList.remove("hidden");
    scrollToSection(id);
  }
}