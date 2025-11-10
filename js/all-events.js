// Elements from the DOM
const allEventsList = document.getElementById("allEventsList");
const filterSport = document.getElementById("filterSport");
const filterStatus = document.getElementById("filterStatus");
const filterFromDate = document.getElementById("filterFromDate");
const filterToDate = document.getElementById("filterToDate");
const sortBy = document.getElementById("sortBy");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

// Render the events grid
function renderEvents(events) {
  if (!events || events.length === 0) {
    allEventsList.innerHTML = `
      <div class="no-events-box">
        <p class="no-events-text">No events match your filters.</p>
        <p class="no-events-sub">Try adjusting the filters or adding new events.</p>
      </div>
    `;
    return;
  }

  // Sort based on user selection
  const sortValue = sortBy.value;
  events.sort((eventA, eventB) => {
    const dateA = new Date(eventA.dateVenue);
    const dateB = new Date(eventB.dateVenue);
    return sortValue === "dateDesc" ? dateB - dateA : dateA - dateB;
  });

  // Build event cards
  allEventsList.innerHTML = events
    .map((event) => createEventCard(event))
    .join("");
}

// Build one event card’s HTML
function createEventCard(event) {
  const home = event.homeTeam?.name || "TBD";
  const away = event.awayTeam?.name || "TBD";
  const date = new Date(event.dateVenue).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = event.timeVenueUTC ? event.timeVenueUTC.slice(0, 5) : "—";
  const sport = event.sport || "—";
  const competition = event.originCompetitionName || "—";
  const status = event.status || "Scheduled";

  return `
    <div class="event-card" onclick="openEventDetails('${event.id}', 'allEventsSection')">
      <div class="event-card-top">
        <span>${date}</span>
        <span>${time}</span>
      </div>
      <p class="event-card-title">${home} vs ${away}</h4>
      <p class="event-card-competition">${competition}</p>
      <div class="event-card-footer">
        <span>${sport}</span>
        <span class="event-status-text ${status.toLowerCase()}">${status}</span>
      </div>
    </div>
  `;
}

// Apply filters when user changes any filter input
[filterSport, filterStatus, filterFromDate, filterToDate, sortBy].forEach((element) => {
  element.addEventListener("change", applyFilters);
});

// Apply all filters
async function applyFilters() {
  const allEvents = await getAllEvents();
  const sportValue = filterSport.value.trim().toLowerCase();
  const statusValue = filterStatus.value.trim().toLowerCase();
  const fromDate = filterFromDate.value ? new Date(filterFromDate.value) : null;
  const toDate = filterToDate.value ? new Date(filterToDate.value) : null;

  const filteredEvents = allEvents.filter((event) => {
    const sportMatch =
      !sportValue || event.sport?.toLowerCase() === sportValue;
    const statusMatch =
      !statusValue || event.status?.toLowerCase() === statusValue;

    const eventDate = new Date(event.dateVenue);
    const isAfterFrom = !fromDate || eventDate >= fromDate;
    const isBeforeTo = !toDate || eventDate <= toDate;

    return sportMatch && statusMatch && isAfterFrom && isBeforeTo;
  });

  // Show or hide "Clear Filters" button
  const anyFilterActive =
    sportValue || statusValue || fromDate || toDate;
  clearFiltersBtn.classList.toggle("hidden", !anyFilterActive);

  renderEvents(filteredEvents);
}

// Reset all filter
async function renderAllEvents() {
  const allEvents = await getAllEvents();
  filterSport.value = "";
  filterStatus.value = "";
  filterFromDate.value = "";
  filterToDate.value = "";
  sortBy.value = "dateAsc";
  
  renderEvents(allEvents);
  clearFiltersBtn.classList.add("hidden");
}

// Clear all filters
clearFiltersBtn.addEventListener("click", async () => {
  renderAllEvents();
});

// Initial Render
document.addEventListener("DOMContentLoaded", async () => {
  initialRenderAllEvents();
});