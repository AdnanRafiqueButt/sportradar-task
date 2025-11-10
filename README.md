**Sports Event Management System**

📖 **Overview**

The **Sports Event Management System** is a lightweight, fully interactive web application built using **pure HTML, CSS, and JavaScript**.
It allows users to **view, add, and manage sports events** efficiently in a clean, responsive interface.
The **design and color scheme** are inspired by **Sportradar**, maintaining a dark, modern aesthetic with an accent color for highlights.
The **calendar view** is inspired by **Google Calendar**, offering intuitive month navigation and event visualization.

✨ **Key Features**

🗓️ **Interactive Calendar**
* Month navigation with smooth transitions.
* Displays all events for each day dynamically.
* Click on a day to view that day’s events list.
* Click on an event to view that events detail.

📋 **All Events Section (with Filters)**
* Responsive grid layout of all events.
* Filter by:
  * Sport type
  * Status (Scheduled, Played, Postponed)
  * Date range
* Sort events by **Newest → Oldest** or **Oldest → Newest**.
* Clean, persistent filter sidebar with real-time updates.

➕ **Add Event**
* Add custom sports events manually.
* Automatically sets **season year** based on the event date.
* Dynamically adds goal input fields when “Played” is selected.
* Real-time validation and inline feedback.
* Displays success banner on submission.

📖 **Event Details**
* Displays complete match info: teams, date, time, sport, stage, stadium, and result.
* Smart back button adapts to where you navigated from (Calendar, Day's Events or All Events).

💾 **Persistent Storage**
* Loads static events from `events-data.json`.
* Merges with user-added events from **LocalStorage**.
* User data is persistent between browser sessions.

🧩 **Optional Features Implemented**
| Feature                    | Status | Description                                                            |
| :------------------------- | :----: | :--------------------------------------------------------------------- |
| **Filters**                |    ✅   | View events by sport type, status, or date range.                      |
| **Styling & Enhancements** |    ✅   | Dark theme, hover effects, smooth transitions, responsive design.      |
| **Persistent Storage**     |    ✅   | LocalStorage keeps data after reload.                                  |
| **Testing**                |    ❌   | Not implemented due to limited time & experience but willing to learn and apply in future. |

⚙️ **Setup & Running Instructions**

🚀 **How to Run the Project**

**Option 1 — Using Node.js**

🧰 **Prerequisites**

This requires **Node.js** (for quick local server setup).
> If you don’t have Node.js, download it from [https://nodejs.org](https://nodejs.org) (LTS version recommended).
Check installation:
```bash
node -v
npm -v
```

```bash
npx serve
```
Then open your browser at the displayed URL, usually:
👉 `http://localhost:3000`

**Option 2 — Using VS Code Live Server**
1. Install the **Live Server** extension (by *Ritwick Dey*).
2. Right-click `index.html` → **Open with Live Server**.

🧱 **Project Folder Structure**
```
📦 sportradar-task
├── 📁 css
│   ├── theme.css
|   ├── style.css
|   ├── hero.css
|   ├── navbar.css
|   ├── calendar.css
|   ├── add-event.css
|   ├── event-details.css
|   ├── day-events.css
|   └── all-events.css
│
├── 📁 js
│   ├── main.js                  # Core common functions, event loading and merging functins
│   ├── calendar.js              # Calendar rendering
│   ├── add-event.js             # Add event form logic & validation
│   ├── event-details.js         # Handles event detail rendering
│   ├── day-events.js            # Displays daily events
│   └── all-events.js            # Display all events, filter and sort logic for all events
│
├── 📁 data
│   └── events-data.json         # Static base data (preloaded events)
│
├── 📁 assets
│   |── 📁 images                # Contains images or logo for project
│   └── 📁 videos                # Contains videos for project
│
├── index.html                   # Main page & sections container
└── README.md                    # Documentation
```

🧠 **Assumptions & Development Decisions**

💡 **Framework Choice**
The project uses **plain HTML, CSS, and JavaScript** deliberately.

> During introduction session, it was suggested that using strong frameworks like **React.js** would demonstrate familiarity with the framework, not core fundamentals so this project
> was intentionally developed using **vanilla technologies** to show understanding of core fundamentals.

🎨 **UI & UX**
* Dark, professional theme inspired by **Sportradar**.
* Smooth transitions and consistent hover states.
* Calendar interactions inspired by **Google Calendar**.

⚙️ **Data Handling**
* Combines static JSON events with dynamic LocalStorage data.
* Ensures persistence and generate unique IDs.

🧩 **Tech Stack**

| Technology               | Purpose                                     |
| :----------------------- | :------------------------------------------ |
| 🧱 **HTML5**             | Page structure and layout                   |
| 🎨 **CSS3**              | Styling, transitions, and responsive design |
| ⚙️ **JavaScript (ES6+)** | Application logic and DOM manipulation      |
| 💾 **LocalStorage**      | Client-side data persistence                |
| 📁 **JSON**              | Static event data storage                   |

🚀 **Future Improvements**
* 🧪 Add automated tests using Jest or Cypress
* ✏️ Add edit and delete functionality for events
* 🔌 Connect with real sports APIs for live event data
* 👤 Add authentication for multi-user access
* 📱 Improve mobile user interface and animations

❤️ **Acknowledgements**
* 🎯 Inspired by **Sportradar** for its professional web design.
* 📅 Calendar design inspired by **Google Calendar**’s clear and accessible navigation.
* 💡 Built with attention to clean code, usability, and maintainability.

✅ **Author:** *Adnan Rafique Butt*
📅 **Year:** 2025
💻 **Technologies:** HTML, CSS, JavaScript