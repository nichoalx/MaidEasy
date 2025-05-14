"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Profile from "./profile"
import AccountManagement from "./accountManagement"
import ProfileManagement from "./profileManagement"
import "./dashstyle.css"
import logout from "../../assets/logout.png"

function AdminPanel() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState("account")

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
              <img src={logout || "/placeholder.svg"} alt="Logout" className="logout-icon" />
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

          {currentPage === "profile" && <Profile />}
          {currentPage === "account" && <AccountManagement />}
          {currentPage === "profileManagement" && <ProfileManagement />}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
