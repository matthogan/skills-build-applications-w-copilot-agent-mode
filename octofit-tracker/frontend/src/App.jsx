import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">Octofit Tracker</h1>
        <p className="text-body-secondary mb-3">
          Multi-tier fitness dashboard connected to the Node.js API.
        </p>
        <p className="small mb-0">
          API base: <span className="fw-semibold">{apiBaseUrl}</span>
        </p>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4" aria-label="Primary">
        <NavLink to="/users" className="nav-link">
          Users
        </NavLink>
        <NavLink to="/activities" className="nav-link">
          Activities
        </NavLink>
        <NavLink to="/teams" className="nav-link">
          Teams
        </NavLink>
        <NavLink to="/leaderboard" className="nav-link">
          Leaderboard
        </NavLink>
        <NavLink to="/workouts" className="nav-link">
          Workouts
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
