// Show Day Events section for a specific date
function openDayEvents(date) {
  setTimeout(() => showSection("#dayEventsSection"), 300);
  renderDayEvents(date);
}

// Function to display all events for the selected date
async function renderDayEvents(date) {
  const allEvents = await getAllEvents();
  const dayEvents = allEvents.filter(ev => ev.dateVenue === date);
  const listContainer = document.querySelector("#dayEventsList");
  const title = document.querySelector("#dayEventsTitle");

  // Update the title date text
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  title.textContent = formattedDate;

  // Populate the events list
  listContainer.innerHTML = dayEvents.length === 0 ? `<div class="no-events-card">
    <div class="no-events-icon">📅</div>
    <h4>No Events Scheduled</h4>
    <p>Looks like there are no matches or activities planned for this day.</p>
    </div>` : 
    dayEvents.map(ev => `
    <div class="day-event-card" onclick="openEventDetails('${ev.id}', 'dayEventsSection')">
      <div class="event-info-left">
        <h4>${ev.homeTeam?.name || "TBD"} vs ${ev.awayTeam?.name || "TBD"}</h4>
        <p>${ev.sport} · ${ev.originCompetitionName || ev.stage?.name}</p>
      </div>
      <div class="event-info-right">
        <span class="event-time">${ev.timeVenueUTC.split(":").slice(0, 2).join(":") || "TBD"} UTC</span>
        <span class="event-status ${ev.status.toLowerCase()}">${ev.status}</span>
      </div>
    </div>
  `).join("");
}
