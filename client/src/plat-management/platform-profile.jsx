"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./platform-style.css"
import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";

import userIcon from "../assets/person_icon.png"
import calendarIcon from "../assets/calender_icon.png"
import phoneIcon from "../assets/phone.png"
import mailIcon from "../assets/mail_icon.png"
import lockIcon from "../assets/lock_icon.png"
import roleIcon from "../assets/circle_person.png"
import statusIcon from "../assets/green.png"
import eyeIcon from "../assets/visibility_on.png"
import eyeOffIcon from "../assets/visibility_off.png"

function PlatformProfile() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false) 

  return (
    <div className="platform-layout">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
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
            className="nav-item active"
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
            className="nav-item"
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
          <a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); navigate("/Logout") }}>
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
              <img src={personIcon} alt="person icon" />
              <div className="user-details">
                <div className="user-name">Platform123</div>
                <div className="user-email">plat123@gmail.com</div>
              </div>
            </div>
          </div>
        </header>

        <div className="whiteSpace">
          <div className="platform-content">
            <div className="search-header">
                <h1 className="services-title">My Profile</h1>
            </div>
            <div className="profile-container">
              <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-container">
                  <img src={userIcon} alt="first" className="input-icon" />
                  <input type="text" id="firstName" value="Kieron" readOnly />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-container">
                  <img src={userIcon} alt="last" className="input-icon" />
                  <input type="text" id="lastName" value="Yolin" readOnly />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <div className="input-container">
                  <img src={calendarIcon} alt="dob" className="input-icon" />
                  <input type="text" id="dob" value="12/10/2004" readOnly />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <div className="input-container">
                  <img src={phoneIcon} alt="phone" className="input-icon" />
                  <input type="text" id="contactNumber" value="82622526" readOnly />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <img src={mailIcon} alt="email" className="input-icon" />
                  <input type="email" id="email" value="Kieronyolin12@gmail.com" readOnly />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <img src={lockIcon} alt="password" className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value="password123"
                    readOnly
                  />
                  <button
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <img
                      src={showPassword ? eyeIcon : eyeOffIcon}
                      alt="Toggle"
                      className="toggle"
                    />
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <div className="input-container">
                  <img src={roleIcon} alt="role" className="role-icon" />
                  <div className="select-container">
                    <input type="text" id="role" value="Cleaner" readOnly />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <div className="input-container">
                <img src={statusIcon} alt="status" className="status-icon" />
                  <div className="status-indicator">
                    <input type="text" id="status" value="Active" readOnly />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="createdDate">Created Date</label>
                <div className="input-container">
                  <img src={calendarIcon} alt="created" className="input-icon" />
                  <input type="text" id="createdDate" value="09/04/2025" readOnly />
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