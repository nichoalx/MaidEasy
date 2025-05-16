"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./platform-style.css"
import logout from "../../assets/logout.png"
import reportS from "../../assets/report.png"
import category from "../../assets/category.png"
import circle_person from "../../assets/circle_person.png"

function PlatformProfile() {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    firstName: "Platform",
    lastName: "123",
    email: "plat123@gmail.com",
    role: "Platform Admin",
    joinDate: "01/01/2023",
    lastLogin: "05/11/2025",
    status: "Active",
  })

  return (
    <div className="platform-layout">
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
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/platform-management")
            }}
          >
            <img src={category || "/placeholder.svg"} className="icon" alt="Categories" />
            <span>Categories</span>
          </a>
          <a
            href="#"
            className="nav-item active"
            onClick={(e) => {
              e.preventDefault()
              navigate("/platform-profile")
            }}
          >
            <img src={circle_person || "/placeholder.svg"} className="icon" alt="My Profile" />
            <span>My Profile</span>
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/report")
            }}
          >
            <img src={reportS || "/placeholder.svg"} className="icon" alt="Reports" />
            <span>Reports</span>
          </a>
        </nav>

        <div className="logout-container">
          <a
            href="#"
            className="logout-link"
            onClick={(e) => {
              e.preventDefault()
              navigate("/")
            }}
          >
            <img src={logout || "/placeholder.svg"} alt="Logout" className="logout-icon" />
            <span>Log Out</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>
              Hi, Platform123{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Platform123</div>
              <div className="user-email">plat123@gmail.com</div>
            </div>
            <div className="user-avatar">
              <i className="icon user-icon"></i>
            </div>
          </div>
        </header>

        <div className="platform-content">
          <h1 className="platform-title">My Profile</h1>

          <div className="category-detail-card">
            <div className="card-header">
              <h3>Profile Information</h3>
              <div className="button-group"></div>
            </div>
            <div className="card-body">
              <div className="profile-info-container">
                <div className="profile-avatar">
                  <div className="avatar-circle">
                    <span className="avatar-initials">P1</span>
                  </div>
                  <h3 className="profile-name">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="profile-role">{profileData.role}</p>
                </div>

                <div className="profile-details">
                  <div className="detail-row">
                    <label>Email:</label>
                    <div className="detail-input">{profileData.email}</div>
                  </div>

                  <div className="detail-row">
                    <label>Join Date:</label>
                    <div className="detail-input">{profileData.joinDate}</div>
                  </div>

                  <div className="detail-row">
                    <label>Last Login:</label>
                    <div className="detail-input">{profileData.lastLogin}</div>
                  </div>

                  <div className="detail-row">
                    <label>Status:</label>
                    <div className="detail-input">
                      <span className="status-badge active">{profileData.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformProfile
