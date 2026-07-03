# 🏎️ Async Race

> **Score:** `400/500`
> **Deployed UI:** [Live Demo](#)

---

## 🚀 Local Setup

To run this app locally you need **two terminals running simultaneously**. Do not clone the backend inside this frontend directory.

> ⚠️ **Important:** Clone and run the backend in a separate directory, outside this project.

**Terminal 1 — Backend**

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The backend will start on `http://localhost:3000`.

**Terminal 2 — Frontend** _(inside this repo)_

```bash
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

### Available Scripts

```bash
npm run dev          # Start development server
npm run lint         # Run ESLint checks
npm run format       # Auto-format with Prettier
npm run ci:format    # Check formatting without writing
```

---

## 📋 Implementation Checklist

### ✅ Commits and Repository

- [ ] Commit guidelines compliance
- [✅] Checklist included in README.md
- [✅] Score calculation at the top of README.md
- [✅] UI deployment link in README.md

---

### 🏗️ Basic Structure — 80 points

| Points | Feature                                                                      | Status |
| ------ | ---------------------------------------------------------------------------- | ------ |
| 10     | **Two Views** — "Garage" and "Winners"                                       | [✅]   |
| 30     | **Garage View Content**                                                      | [✅]   |
|        | &nbsp;&nbsp;• Name of view                                                   | [✅]   |
|        | &nbsp;&nbsp;• Car creation and editing panel                                 | [✅]   |
|        | &nbsp;&nbsp;• Race control panel                                             | [✅]   |
|        | &nbsp;&nbsp;• Garage section                                                 | [✅]   |
| 10     | **Winners View Content**                                                     | [✅]   |
|        | &nbsp;&nbsp;• Name of view ("Winners")                                       | [✅]   |
|        | &nbsp;&nbsp;• Winners table                                                  | [✅]   |
|        | &nbsp;&nbsp;• Pagination                                                     | [✅]   |
| 30     | **Persistent State** — page numbers and input states preserved between views | [✅]   |

---

### 🚗 Garage View — 90 points

| Points | Feature                                                                                                                      | Status |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- | ------ |
| 20     | **CRUD Operations** — create, update, delete cars (name + color); handles empty/too long names; deletes from winners too     | [✅]   |
| 10     | **Color Selection** — RGB palette with live preview on car image                                                             | [✅]   |
| 20     | **Random Car Creation** — button generates 100 cars per click; names from two random parts (10+ options each); random colors | [✅]   |
| 10     | **Car Management Buttons** — update and delete buttons near each car                                                         | [✅]   |
| 10     | **Pagination** — 7 cars per page                                                                                             | [✅]   |
| 10     | ⭐ **EXTRA: Empty Garage** — user-friendly "No Cars" message                                                                 | [✅]   |
| 10     | ⭐ **EXTRA: Empty Page Redirect** — removing the last car on a page navigates to the previous page                           | [✅]   |

---

### 🏆 Winners View — 50 points

| Points | Feature                                                                                                                         | Status |
| ------ | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 15     | **Display Winners** — winning cars shown in the Winners table                                                                   | [✅]   |
| 10     | **Pagination** — 10 winners per page                                                                                            | [✅]   |
| 15     | **Winners Table** — columns: №, image, name, wins, best time; wins increment on repeat wins; best time only updates if improved | [✅]   |
| 10     | **Sorting** — sort by wins and best time, ascending and descending                                                              | [✅]    |

---

### 🏁 Race — 170 points

| Points | Feature                                                                                                                  | Status |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | ------ |
| 20     | **Start Engine Animation** — click start → wait for velocity → animate car → drive request; stops on 500 error           | [✅]    |
| 20     | **Stop Engine Animation** — click stop → wait for response → return car to start                                         | [✅]    |
| 30     | **Responsive Animation** — fluid animations on screens as small as 500px                                                 | [✅]    |
| 10     | **Start Race Button** — starts race for all cars on current page                                                         | [✅]    |
| 15     | **Reset Race Button** — returns all cars to starting positions                                                           | [✅]    |
| 5      | **Winner Announcement** — message shown with the name of the winning car                                                 | [✅]    |
| 20     | **Button States** — start button disabled while driving; stop button disabled at starting position                       | [✅]    |
| 50     | **Actions During Race** — predictable behavior when deleting/editing cars, changing pages/views, or adding cars mid-race | [✅]    |

---

### 🎨 Prettier and ESLint — 10 points

| Points | Feature                                                                                                  | Status |
| ------ | -------------------------------------------------------------------------------------------------------- | ------ |
| 5      | **Prettier Setup** — `format` and `ci:format` scripts in package.json                                    | [✅]   |
| 5      | **ESLint Configuration** — Airbnb style guide; `lint` script in package.json; strict TypeScript settings | [✅]   |

---

### 🌟 Overall Code Quality — 100 points _(reviewer discretion)_

| Feature                                                                                                         | Status |
| --------------------------------------------------------------------------------------------------------------- | ------ |
| **Modular Design** — clear separation of API, UI rendering, and state management layers                         | []    |
| **Function Modularization** — small, named functions with single purposes; helpers extracted; max 40 lines each | [ ]    |
| **No Code Duplication / No Magic Numbers** — no repeated logic; no unexplained literals                         | [ ]    |
| **Readability** — clear variable, function, and module names                                                    | [ ]    |
| **Extra Features** — e.g. custom hooks, portals, React Router (React), or equivalent                            | [ ]    |
