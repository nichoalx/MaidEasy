
"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./platform-style.css"
import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";

function Report() {
  const navigate = useNavigate()
  const [showDailyReport, setShowDailyReport] = useState(false)
  const [showWeeklyReport, setShowWeeklyReport] = useState(false)
  const [showMonthlyReport, setShowMonthlyReport] = useState(false)

  const currentDate = new Date()
  const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1).toString().padStart(2, "0")}/${currentDate.getFullYear()}`

  const oneWeekAgo = new Date(currentDate)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const formattedOneWeekAgo = `${oneWeekAgo.getDate().toString().padStart(2, "0")}/${(oneWeekAgo.getMonth() + 1).toString().padStart(2, "0")}/${oneWeekAgo.getFullYear()}`

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonth = monthNames[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()

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

        <div className="platform-content">
          <h1 className="reportTitle">Report</h1>

          <div className="report-cards-container">
      
            <div className="report-card">
              <h2 className="report-card-title">Daily Report</h2>
              <button className="generate-btn" onClick={() => setShowDailyReport(true)}>
                Generate
              </button>
            </div>

   
            <div className="report-card">
              <h2 className="report-card-title">Weekly Report</h2>
              <button className="generate-btn" onClick={() => setShowWeeklyReport(true)}>
                Generate
              </button>
            </div>


            <div className="report-card">
              <h2 className="report-card-title">Monthly Report</h2>
              <button className="generate-btn" onClick={() => setShowMonthlyReport(true)}>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>


      {showDailyReport && (
        <div className="modal-overlay" onClick={() => setShowDailyReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="report-modal-title">Daily Report</h2>
            <div className="report-date">{formattedCurrentDate}</div>

            <div className="report-stat-container">
              <div className="report-stat-label">Total Bookings:</div>
              <div className="report-stat-value">53</div>
            </div>

            <div className="report-section">
              <div className="report-section-title">Top 3 Active Bookings</div>
              <div className="report-item">
                <div className="report-item-label">1. Home Service:</div>
                <div className="report-item-value">18</div>
              </div>
              <div className="report-item">
                <div className="report-item-label">2. Floor:</div>
                <div className="report-item-value">15</div>
              </div>
              <div className="report-item">
                <div className="report-item-label">3. Rooftop:</div>
                <div className="report-item-value">5</div>
              </div>
            </div>

            <div className="report-section2">
              <div className="report-item2">
                <div className="report-item-label2">New Services:</div>
                <div className="report-item-value">20</div>
              </div>
              <div className="report-item2">
                <div className="report-item-label2">New Category:</div>
                <div className="report-item-value">1</div>
              </div>
            </div>

            <button className="back-button" onClick={() => setShowDailyReport(false)}>
              Back
            </button>
          </div>
        </div>
      )}


      {showWeeklyReport && (
        <div className="modal-overlay" onClick={() => setShowWeeklyReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="report-modal-title">Weekly Report</h2>
            <div className="report-date">
              {formattedOneWeekAgo}-{formattedCurrentDate}
            </div>

            <div className="report-stat-container">
              <div className="report-stat-label">Total Bookings:</div>
              <div className="report-stat-value">150</div>
            </div>

            <div className="report-section">
              <div className="report-section-title">Top 3 Active Bookings</div>
              <div className="report-item">
                <div className="report-item-label">1. Home Service:</div>
                <div className="report-item-value">35</div>
              </div>
              <div className="report-item">
                <div className="report-item-label">2. Floor:</div>
                <div className="report-item-value">24</div>
              </div>
              <div className="report-item">
                <div className="report-item-label">3. Rooftop:</div>
                <div className="report-item-value">10</div>
              </div>
            </div>

            <div className="report-section2">
              <div className="report-item2">
                <div className="report-item-label2">New Services:</div>
                <div className="report-item-value">100</div>
              </div>
              <div className="report-item2">
                <div className="report-item-label2">New Category:</div>
                <div className="report-item-value">5</div>
              </div>
            </div>

            <button className="back-button" onClick={() => setShowWeeklyReport(false)}>
              Back
            </button>
          </div>
        </div>
      )}

      {showMonthlyReport && (
        <div className="modal-overlay" onClick={() => setShowMonthlyReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="report-modal-title">Monthly Report</h2>
            <div className="report-date">
              {currentMonth} {currentYear}
            </div>

            <div className="report-stat-container">
              <div className="report-stat-label">Total Bookings:</div>
              <div className="report-stat-value">170</div>
            </div>

            <div className="report-section">
              <div className="report-section-title">Top 3 Active Bookings</div>
              <div className="report-item">
                <div className="report-item-label">1. Home Service:</div>
                <div className="report-item-value">50</div>
              </div>
              <div className="report-item">
                <div className="report-item-label">2. Floor:</div>
                <div className="report-item-value">25</div>
              </div>
              <div className="report-item">
                <div className="report-item-label">3. Rooftop:</div>
                <div className="report-item-value">15</div>
              </div>
            </div>

            <div className="report-section2">
              <div className="report-item2">
                <div className="report-item-label2">New Services:</div>
                <div className="report-item-value">120</div>
              </div>
              <div className="report-item2">
                <div className="report-item-label2">New Category:</div>
                <div className="report-item-value">7</div>
              </div>
            </div>

            <button className="back-button" onClick={() => setShowMonthlyReport(false)}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Report