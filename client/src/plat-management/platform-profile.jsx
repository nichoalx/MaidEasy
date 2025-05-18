"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../utils/axiosInstance"
import "./platform-style.css"

import category from "../assets/category.png"
import circle_person from "../assets/circle_person.png"
import reportS from "../assets/report.png"
import logout from "../assets/logout.png"

import userIcon from "../assets/person_icon.png"
import calendarIcon from "../assets/calender_icon.png"
import phoneIcon from "../assets/phone.png"
import mailIcon from "../assets/mail_icon.png"
import roleIcon from "../assets/circle_person.png"
import statusIcon from "../assets/green.png"

function PlatformProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("user_id")
      try {
        const { data } = await axios.get(`/api/users/${userId}`)
        setUser(data.success)
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
      }
    }

    fetchUser()
  }, [])

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
              navigate("/Logout")
            }}
          >
            <img src={logout || "/placeholder.svg"} alt="Logout" className="logout-icon" />
            <span>Log Out</span>
          </a>
        </div>
      </div>

      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>
              Hi, {user?.first_name } 👋
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-info">
              <img src={circle_person} alt="icon" />
              <div className="user-details">
                <div className="user-name">{user?.first_name}</div>
                <div className="user-email">{user?.email}</div>
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
              {user ? (
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <div className="input-container">
                      <img src={userIcon} className="input-icon" />
                      <input type="text" value={user.first_name} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <div className="input-container">
                      <img src={userIcon} className="input-icon" />
                      <input type="text" value={user.last_name} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Date of Birth</label>
                    <div className="input-container">
                      <img src={calendarIcon} className="input-icon" />
                      <input type="text" value={user.dob} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Contact Number</label>
                    <div className="input-container">
                      <img src={phoneIcon} className="input-icon" />
                      <input type="text" value={user.contact_number} readOnly />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Email</label>
                    <div className="input-container-email">
                      <img src={mailIcon} className="input-icon" />
                      <input type="email" value={user.email} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <div className="input-container">
                      <img src={roleIcon} className="input-icon" />
                      <input type="text" value={user.profile_name} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <div className="input-container">
                      <img src={statusIcon} className="status-icon" />
                      <input type="text" value={user.is_active ? "Active" : "Suspended"} readOnly />
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformProfile;
