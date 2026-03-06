# Online Learning Platform UI (LMS)

A React-based Learning Management System UI with course browsing, enrollment, progress tracking, and authentication.

## Features

- **Home Page** – Course list with search and filter (category, level)
- **Course Details** – Full course info, lessons list, enroll button
- **My Courses** – Enrolled courses with progress bars
- **Course Player** – Video placeholder, lesson list, active lesson highlight
- **Login / Signup** – Form validation, localStorage auth
- **Protected Routes** – My Courses and Player require login

## Tech Stack

- React 19 + Vite
- React Router
- Tailwind CSS
- Axios
- JSON Server (mock API)

## Getting Started

### 0. Use a supported Node.js version

Use Node.js 22 LTS (recommended) or 20 LTS.

If you're on Node 25+, switch versions first, then reinstall dependencies.

### 1. Install dependencies

```bash
npm install
```

### 2. Start the mock API (Terminal 1)

```bash
npm run api
```

This runs JSON Server at `http://localhost:3001` with `db.json`.

### 3. Start the dev server (Terminal 2)

```bash
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`).

## Routes

| Path | Description |
|------|-------------|
| `/` | Home – course list |
| `/course/:id` | Course details |
| `/my-courses` | Enrolled courses (protected) |
| `/player/:id` | Course player (protected) |
| `/login` | Login |
| `/signup` | Sign up |

## Folder Structure

```
src/
  components/    # Navbar, CourseCard, ProgressBar, LoadingSpinner, ProtectedRoute
  pages/         # Home, CourseDetails, MyCourses, Player, Login, Signup
  services/      # api.js (API calls)
  context/       # AuthContext, EnrollmentContext
  routes/        # (handled in App.jsx)
```

## Fallback Mode

If the API server is not running, the app uses built-in fallback course data so you can still browse and test the UI.
