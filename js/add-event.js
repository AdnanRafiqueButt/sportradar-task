// Show Success Banner
function showSuccessBanner() {
  scrollToSection("addEventSection");
  toggleClass("successBanner", "hidden", "show");

  setTimeout(() => {
    toggleClass("successBanner", "show", "hidden");
  }, 2000);
}

// Add Event Form Submission Handling
const addEventForm = document.getElementById("addEventForm");
addEventForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  const fields = addEventForm.querySelectorAll("[required]");
  fields.forEach((field) => {
    const wrapper = field.closest(".add-event-field");
    const empty = !field.value.trim();
    wrapper.classList.toggle("invalid", empty);
    if (empty) isValid = false;
  });

  if (!isValid) {
    addEventForm.querySelector(".invalid")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  addEventForm.reset();
  showSuccessBanner();
});
