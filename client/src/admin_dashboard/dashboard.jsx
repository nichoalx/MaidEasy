"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Profile from "./profile"
import AccountManagement from "./accountManagement"
import ProfileManagement from "./profileManagement"
import "./dashstyle.css"
import logout from "../assets/logout.png"
import circlePersonIcon from "../assets/circle_person.png"
import vectorIcon from "../assets/Vector.png"
import humanIcon from "../assets/Human.png"

function AdminPanel() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState("profile")

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
    <div className="platform-layout">
        <div className="sidebar">
          <div className="logo-container">
            <h1 className="logo">Garuda<br />Indonesia</h1>
          </div>

          <nav className="nav-menu">
            <a
              href="#"
              className={`nav-item ${currentPage === "profile" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("profile");
              }}
            >
              <i className="icon grid-icon"></i>
              <span><img src={circlePersonIcon} alt="person icon" /> My Profile</span>
            </a>

            <a
              href="#"
              className={`nav-item ${currentPage === "account" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("account");
              }}
            >
              <i className="icon profile-icon"></i>
              <span><img src={vectorIcon} alt="person icon" /> Account Management</span>
            </a>

            <a
              href="#"
              className={`nav-item ${currentPage === "profileManagement" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("profileManagement");
              }}
            >
              <i className="icon report-icon"></i>
              <span><img src={humanIcon} alt="confirm icon" /> Profile Management</span>
            </a>
          </nav>


          <div className="logout-container">
            <a href="#" className="logout-link" onClick={handleLogout}>
            <img src={logout} alt="logout icon" />
            Log Out
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="platform-header">
            <div className="greeting">
              <h2>
                Hi, Admin Ganteng 👋
              </h2>
            </div>

            <div className="user-profile">
              <img src={circlePersonIcon} alt="user icon" />
              <div className="user-details">
                <div className="user-name">Admin Ganteng</div>
                <div className="user-email">admin@example.com</div>
              </div>
            </div>
          </header>

          {currentPage === "profile" && <Profile />}
          {currentPage === "account" && <AccountManagement />}
          {currentPage === "profileManagement" && <ProfileManagement />}
        </div>
    </div>
  )
}

export default AdminPanel
