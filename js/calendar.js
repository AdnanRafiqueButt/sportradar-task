// Elements from the DOM
const currentMonthText = document.getElementById("currentMonth");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const calendarGrid = document.getElementById("calendarGrid");

// Current date state 
let currentDate = new Date();

// Month names for header
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Converts the events list into Groups { "2025-11-03": ["Team1 vs Team2", ...] }
function groupEventsByDate(events) {
  const grouped = {};

  events.forEach(function (event) {
    const date = event.dateVenue;

    // Create an empty array for this date if not already there
    if (!grouped[date]) {
      grouped[date] = [];
    }

    // Add event to the date's array
    grouped[date].push(event);
  });

  return grouped;
}

// Render the entire calendar grid for the selected month
async function renderCalendar(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Update header
  currentMonthText.textContent = monthNames[month] + " " + year;

  // Get all events and group them by date
  const allEvents = await getAllEvents();
  const eventsByDate = groupEventsByDate(allEvents);

  // Figure out first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(year, month, 1).getDay();

  // Total number of days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // To start on Monday instead of Sunday
  const offset = (firstDay + 6) % 7;

  // Day names for header row
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Start building calendar HTML
  let html = "";

  // Add weekday labels
  weekDays.forEach(function (day) {
    html += `<div class="calendar-day-name">${day}</div>`;
  });

  // Add empty boxes before the 1st day (to align Monday start)
  for (let i = 0; i < offset; i++) {
    html += `<div class="calendar-day empty" aria-disabled="true"></div>`;
  }

  // Add each day of this month
  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate =
      year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    const dayEvents = eventsByDate[fullDate] || []; // get events for this day

    // If this day has events
    if (dayEvents.length > 0) {
      html += `
        <div class="calendar-day has-event" data-date="${fullDate}" onclick="openDayEvents('${fullDate}')">
          <span class="date">${day}</span>
          <div class="event-wrapper">
            ${dayEvents
              .map(function (event) {
                const home = event.homeTeam?.name || "TBD";
                const away = event.awayTeam?.name || "TBD";
                return `<div class="date-event" onclick="event.stopPropagation();  openEventDetails('${event.id}', 'calendarSection')">${home} <span>Vs</span> ${away}</div>`;
              })
              .join("")}
          </div>
        </div>`;
    } else {
      // Normal day with no events
      html += `
        <div class="calendar-day" data-date="${fullDate}" onclick="openDayEvents('${fullDate}')">
          <span class="date">${day}</span>
        </div>`;
    }
  }

  // Fill empty boxes at the end of month so layout is even
  const totalCells = offset + daysInMonth;
  const remainingCells = Math.ceil(totalCells / 7) * 7 - totalCells;

  for (let i = 0; i < remainingCells; i++) {
    html += `<div class="calendar-day empty" aria-disabled="true"></div>`;
  }

  // Apply smooth fade effect when changing month
  calendarGrid.style.opacity = 0;
  setTimeout(function () {
    calendarGrid.innerHTML = html;
    calendarGrid.style.opacity = 1;
  }, 100);
}

// Change Month by Adjusting currentDate by step months and re-render calendar
function changeMonth(step) {
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + step,
    1
  );

  currentDate = newDate;
  renderCalendar(currentDate);
}

// Next and Previous Month buttons
prevMonthBtn.addEventListener("click", function () {
  changeMonth(-1);
});

nextMonthBtn.addEventListener("click", function () {
  changeMonth(1);
});

// Initial render
document.addEventListener("DOMContentLoaded", function () {
  renderCalendar(currentDate);
});
