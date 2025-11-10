// All common functions are defined here

// Toggle Class on Element
function toggleClass(selector, removeClass, addClass) {
  const element = document.querySelector(selector);
  if (!element) return;

  if (addClass) {
    element.classList.remove(removeClass);
    element.classList.add(addClass);
  } else {
    element.classList.toggle(removeClass);
  }
}

// Scroll to Section
function scrollToSection(selector) {
  const section = document.querySelector(selector);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Hide All Sections
function hideAllSections() {
  const sections = document.querySelectorAll(".page-section");
  sections?.forEach((section) => section.classList.add("hidden"));
}

// Show Section
function showSection(selector) {
  const section = document.querySelector(selector);
  const navMenu = document.getElementById("navbarMenu");

  if (navMenu?.classList.contains("active")) {
    navMenu.classList.remove("active");
  }

  hideAllSections();
  if (section) {
    section.classList.remove("hidden");
    scrollToSection(selector);
  }
}

// Get stored user events
function getStoredEvents() {
  const stored = localStorage.getItem("userEvents");
  return stored ? JSON.parse(stored) : [];
}

// Save new event to localStorage
function saveEventToStorage(eventObj) {
  const stored = getStoredEvents();
  stored.push(eventObj);
  localStorage.setItem("userEvents", JSON.stringify(stored));
}

// Load events from the JSON file
async function loadJsonEvents() {
  try {
    const response = await fetch("./data/events-data.json");
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Error loading JSON events:", error);
    return [];
  }
}

// Generate ID for events, with competition + date + teams
function generateEventId(event) {
  const comp =
    (event.originCompetitionId || event.originCompetitionName || "competition")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

  const date = (event.dateVenue || "no-date").toString().trim();

  const home = (event.homeTeam?.name || "home")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  const away = (event.awayTeam?.name || "away")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  // Example: champions-league-2025-11-03-ateam-vs-bteam
  return `${comp}-${date}-${home}-vs-${away}`;
}

// Merging JSON events with Locally stored events
async function getAllEvents() {
  const jsonEvents  = await loadJsonEvents();
  const localEvents = getStoredEvents();

  const mergedEvents = [...jsonEvents, ...localEvents].map(event => {
    if (!event.id) event.id = generateEventId(event);
    return event;
  });

  return mergedEvents;
}