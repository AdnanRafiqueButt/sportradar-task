// Show Success Banner
function showSuccessBanner() {
  scrollToSection("#addEventSection");
  toggleClass("#successBanner", "hidden", "show");

  setTimeout(() => {
    toggleClass("#successBanner", "show", "hidden");
  }, 2000);
}

// Add Event Form Submission Handling
const addEventForm = document.getElementById("addEventForm");
const statusSelect = document.getElementById("status");
const resultContainer = document.getElementById("resultFieldsContainer");

// Remove "invalid" class when user changes required field
function attachLiveValidation(root = document) {
  const requiredFields = root.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      const wrapper = field.closest(".add-event-field");
      if (field.value.trim()) wrapper.classList.remove("invalid");
    });
  });
}

attachLiveValidation();

// Game Status Change Event to show/hide result inputs
statusSelect.addEventListener("change", () => {
  const value = statusSelect.value;

  if (value === "Played") {
    resultContainer.innerHTML = `
      <div class="add-event-row">
        <div class="add-event-field">
          <label for="homeGoals">Home Team Goals</label>
          <input type="number" id="homeGoals" name="homeGoals" min="0" required />
          <small class="error-text">This field is required</small>
        </div>
        <div class="add-event-field">
          <label for="awayGoals">Away Team Goals</label>
          <input type="number" id="awayGoals" name="awayGoals" min="0" required />
          <small class="error-text">This field is required</small>
        </div>
      </div>
    `;
    attachLiveValidation(resultContainer);
  } else {
    resultContainer.innerHTML = "";
    attachLiveValidation();
  }
});

// Form Submit Event
addEventForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Validate required fields
  const requiredFields = addEventForm.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    const wrapper = field.closest(".add-event-field");
    const empty = !field.value.trim();
    wrapper.classList.toggle("invalid", empty);
    if (empty) isValid = false;
  });

  if (!isValid) {
    addEventForm.querySelector(".invalid")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Event object from form data entries
  const formData = new FormData(addEventForm);
  const eventObj = {
    season: 2026,
    status: formData.get("status"),
    timeVenueUTC: formData.get("timeVenueUTC"),
    dateVenue: formData.get("dateVenue"),
    stadium: formData.get("stadium") || null,
    homeTeam: {
      name: formData.get("homeTeam"),
      teamCountryCode: "TBD"
    },
    awayTeam: {
      name: formData.get("awayTeam"),
      teamCountryCode: "TBD"
    },
    result: {
      homeGoals: Number(formData.get("homeGoals")) || 0,
      awayGoals: Number(formData.get("awayGoals")) || 0,
      winner:
        Number(formData.get("homeGoals")) > Number(formData.get("awayGoals"))
          ? formData.get("homeTeam")
          : Number(formData.get("awayGoals")) > Number(formData.get("homeGoals"))
          ? formData.get("awayTeam")
          : Number(formData.get("awayGoals")) > Number(formData.get("homeGoals"))
          ? "Draw" : null
    },
    stage: {
      name: formData.get("stage") || "Group Stage"
    },
    originCompetitionName: formData.get("competition"),
    sport: formData.get("sport"),
  };

  eventObj.id = generateEventId(eventObj);

  // Save to localStorage
  saveEventToStorage(eventObj);

  // Reset & show success
  addEventForm.reset();
  showSuccessBanner();

  // Rerender Calendar and All Events
  renderCalendar(currentDate);
  initialRenderAllEvents();
});
