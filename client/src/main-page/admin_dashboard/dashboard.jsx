import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Profile from "./profile"
import AccountManagement from "./accountManagement"
import ProfileManagement from "../profileManagement"
import "./dashstyle.css"

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState("dashboard")

  useEffect(() => {
    if (location.state && location.state.page) {
      setCurrentPage(location.state.page)
    }
  }, [location])

  const handleLogout = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="dashboard-layout">
      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo-container">
            <h1 className="logo">
              Garuda
              <br />
              Indonesia
            </h1>
          </div>

          <nav className="nav-menu">
            <a
              href="/dashboard"
              className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("dashboard")
              }}
            >
              <i className="icon dashboard-icon"></i>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className={`nav-item ${currentPage === "profile" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("profile")
              }}
            >
              <i className="icon profile-icon"></i>
              <span>My Profile</span>
            </a>
            <a
              href="#"
              className={`nav-item ${currentPage === "account" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("account")
              }}
            >
              <i className="icon users-icon"></i>
              <span>Account Management</span>
            </a>
            <a
              href="#"
              className={`nav-item ${currentPage === "profileManagement" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("profileManagement")
              }}
            >
              <i className="icon profile-management-icon"></i>
              <span>Profile Management</span>
            </a>
          </nav>

          <div className="logout-container">
            <a href="#" className="logout-link" onClick={handleLogout}>
              <i className="icon logout-icon"></i>
              <span>Log Out</span>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="header">
            <div className="greeting">
              <h2>
                Hi, Admin Ganteng{" "}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </h2>
            </div>

            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">Admin Ganteng</div>
                <div className="user-email">admin@example.com</div>
              </div>
              <div className="user-avatar">
                <i className="icon user-icon"></i>
              </div>
            </div>
          </header>

          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "profile" && <Profile />}
          {currentPage === "account" && <AccountManagement />}
          {currentPage === "profileManagement" && <ProfileManagement />}
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <main className="dashboard-content">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-label">Total User</div>
          <div className="stat-value">100</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Cleaner</div>
          <div className="stat-value">20</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Home Owner</div>
          <div className="stat-value">68</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Project Management</div>
          <div className="stat-value">12</div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="bottom-cards">
        <div className="large-card">{/* Empty card as shown in design */}</div>

        <div className="user-stats-card">
          <div className="user-stat">
            <div className="stat-label">Active User</div>
            <div className="stat-value">100</div>
          </div>

          <div className="user-stat">
            <div className="stat-label">Suspended User</div>
            <div className="stat-value">23</div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
