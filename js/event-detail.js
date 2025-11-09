// Event Details for a specific event
async function openEventDetails(eventId, fromSection = "calendarSection") {
  showSection("#eventDetailsSection");

  const allEvents = await getAllEvents();
  const event = allEvents.find(event => event.id === eventId);

  // Extract event details with fallbacks
  const home = event.homeTeam?.name || "TBD";
  const away = event.awayTeam?.name || "TBD";
  const date = event.dateVenue || "—";
  const time = event.timeVenueUTC.split(":").slice(0, 2).join(":") || "—";
  const sport = event.sport || "—";
  const competition = event.originCompetitionName || "—";
  const season = event.season || "—";
  const stadium = event.stadium || "—";
  const stage = event.stage?.name || "—";
  const status = event.status || "—";
  const homeGoals = event.result?.homeGoals ?? "—";
  const awayGoals = event.result?.awayGoals ?? "—";
  const homeCountry = event.homeTeam?.teamCountryCode || "—";
  const awayCountry = event.awayTeam?.teamCountryCode || "—";

  // Fill event details card
  const card = document.querySelector(".event-details-card");
  card.innerHTML = `
    <div class="event-details-top">
      <h3><span>${home}</span> VS <span>${away}</span></h3>
    </div>
    <div class="event-info-grid">
      <div class="event-info-item"><h4>Date</h4><p>${date}</p></div>
      <div class="event-info-item"><h4>Time (UTC)</h4><p>${time}</p></div>
      <div class="event-info-item"><h4>Sport</h4><p>${sport}</p></div>
      <div class="event-info-item"><h4>Competition</h4><p>${competition}</p></div>
      <div class="event-info-item"><h4>Season</h4><p>${season}</p></div>
      <div class="event-info-item"><h4>Stadium</h4><p>${stadium}</p></div>
      <div class="event-info-item"><h4>Stage</h4><p>${stage}</p></div>
      <div class="event-info-item"><h4>Status</h4><p class="event-status ${status.toLowerCase()}">${status}</p></div>
    </div>
    <div class="event-info-teams">
      <div class="event-team-card event-team-home">
        <h4>Home Team</h4>
        <p>${home}</p>
        <span>${homeCountry}</span>
      </div>
      <div class="event-team-card team-away">
        <h4>Away Team</h4>
        <p>${away}</p>
        <span>${awayCountry}</span>
      </div>
    </div>
    <div class="event-result-info">
      <h4>Match Result</h4>
      <p><span>${homeGoals}</span> - <span>${awayGoals}</span></p>
    </div>
    <div class="event-details-footer">
      <button class="btn btn-slide-left" type="button" id="backToLastSectionBtn">
        ← Back
      </button>
    </div>
  `;

  // Back button handling
  const backBtn = document.getElementById("backToLastSectionBtn");
  if (fromSection === "dayEventsSection") {
    backBtn.textContent = "← Back to Day Events";
    backBtn.onclick = () => {
      card.classList.remove("visible");
      showSection("#dayEventsSection");
      renderDayEvents(event.dateVenue);
    };
  } else if (fromSection === "allEventsSection") {
    backBtn.textContent = "← Back to All Events";
    backBtn.onclick = () => {
      card.classList.remove("visible");
      showSection("#allEventsSection");
    };
  } else {
    backBtn.textContent = "← Back to Calendar";
    backBtn.onclick = () => {
      card.classList.remove("visible");
      showSection("#calendarSection");
    };
  }
  card.classList.add("visible");
}
