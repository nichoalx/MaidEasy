"use client"

import { useNavigate } from "react-router-dom"
import "./platform-style.css"
import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";


function Report() {
  const navigate = useNavigate()

  return (
    <div className="platform-layout">
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
            <i className="icon grid-icon"></i>
            <span><img src={categoryIcon} alt="category icon" />Categories</span>
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/platform-profile")
            }}
          >
            <i className="icon profile-icon"></i>
            <span1><img src={personIcon} alt="person icon" />My Profile</span1>
          </a>
          <a
            href="#"
            className="nav-item active"
            onClick={(e) => {
              e.preventDefault()
              navigate("/report")
            }}
          >
            <i className="icon report-icon"></i>
            <span><img src={reportIcon} alt="report icon" />Report</span>
          </a>
        </nav>

        <div className="logout-container">
          <a
            href="#"
            className="logout-link"
            onClick={(e) => {
              e.preventDefault()
              navigate("/Logout")
            }}
          >
            <i className="icon logout-icon"></i>
            <span><img src={logoutIcon} alt="logout icon" />Log Out</span>
          </a>
        </div>
      </div>

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
          <h1 className="platform-title">Report</h1>

          {/* Report content will go here */}
          <div className="report-container">
            {/* This is a placeholder for the report content */}
            <div className="empty-state">
              <p>Report functionality coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report