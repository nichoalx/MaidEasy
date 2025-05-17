"use client"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./platform-style.css"
import logout from "../../assets/logout.png"
import reportS from "../../assets/report.png"
import category from "../../assets/category.png"
import circle_person from "../../assets/circle_person.png"

function Report() {
  const navigate = useNavigate()
  const [showDailyReport, setShowDailyReport] = useState(false)
  const [showWeeklyReport, setShowWeeklyReport] = useState(false)
  const [showMonthlyReport, setShowMonthlyReport] = useState(false)

  // State for report data
  const [dailyReport, setDailyReport] = useState(null)
  const [weeklyReport, setWeeklyReport] = useState(null)
  const [monthlyReport, setMonthlyReport] = useState(null)
  const [summaryData, setSummaryData] = useState(null)

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
  }

  // Get current month and year
  const getCurrentMonthYear = () => {
    const date = new Date()
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
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }

  // Fetch summary data
  const fetchSummaryData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/report/summary")
      if (!response.ok) {
        throw new Error("Failed to fetch summary data")
      }
      const data = await response.json()
      setSummaryData(data)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching summary data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch daily report
  const fetchDailyReport = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/report/daily")
      if (!response.ok) {
        throw new Error("Failed to fetch daily report")
      }
      const data = await response.json()
      setDailyReport(data)
      setShowDailyReport(true)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching daily report:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch weekly report
  const fetchWeeklyReport = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/report/weekly")
      if (!response.ok) {
        throw new Error("Failed to fetch weekly report")
      }
      const data = await response.json()
      setWeeklyReport(data)
      setShowWeeklyReport(true)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching weekly report:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch monthly report
  const fetchMonthlyReport = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/report/monthly")
      if (!response.ok) {
        throw new Error("Failed to fetch monthly report")
      }
      const data = await response.json()
      setMonthlyReport(data)
      setShowMonthlyReport(true)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching monthly report:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch summary data on component mount
  useEffect(() => {
    fetchSummaryData()
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
            className="nav-item"
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
            className="nav-item active"
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
          <h1 className="platform-title">Report</h1>

          {error && <div className="error-message">Error: {error}. Please try again later.</div>}

          <div className="report-cards-container">
            {/* Daily Report Card */}
            <div className="report-card">
              <h2 className="report-card-title">Daily Report</h2>
              <button className="generate-btn" onClick={fetchDailyReport} disabled={isLoading}>
                {isLoading && showDailyReport ? "Loading..." : "Generate"}
              </button>
            </div>

            {/* Weekly Report Card */}
            <div className="report-card">
              <h2 className="report-card-title">Weekly Report</h2>
              <button className="generate-btn" onClick={fetchWeeklyReport} disabled={isLoading}>
                {isLoading && showWeeklyReport ? "Loading..." : "Generate"}
              </button>
            </div>

            {/* Monthly Report Card */}
            <div className="report-card">
              <h2 className="report-card-title">Monthly Report</h2>
              <button className="generate-btn" onClick={fetchMonthlyReport} disabled={isLoading}>
                {isLoading && showMonthlyReport ? "Loading..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Report Modal */}
      {showDailyReport && dailyReport && (
        <div className="modal-overlay" onClick={() => setShowDailyReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="report-modal-title">Daily Report</h2>
            <div className="report-date">{formatDate(dailyReport.date)}</div>

            <div className="report-stat-container">
              <div className="report-stat-label">Total Bookings:</div>
              <div className="report-stat-value">{dailyReport.bookings}</div>
            </div>

            {summaryData && (
              <>
                <div className="report-section">
                  <div className="report-section-title">Platform Summary</div>
                  <div className="report-item">
                    <div className="report-item-label">Users:</div>
                    <div className="report-item-value">{summaryData.users}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Profiles:</div>
                    <div className="report-item-value">{summaryData.profiles}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Services:</div>
                    <div className="report-item-value">{summaryData.services}</div>
                  </div>
                </div>

                <div className="report-section">
                  <div className="report-item">
                    <div className="report-item-label">Categories:</div>
                    <div className="report-item-value">{summaryData.categories}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Total Bookings:</div>
                    <div className="report-item-value">{summaryData.bookings}</div>
                  </div>
                </div>
              </>
            )}

            <button className="back-button" onClick={() => setShowDailyReport(false)}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Weekly Report Modal */}
      {showWeeklyReport && weeklyReport && (
        <div className="modal-overlay" onClick={() => setShowWeeklyReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="report-modal-title">Weekly Report</h2>
            <div className="report-date">
              From {formatDate(weeklyReport.week_start)} to {formatDate(new Date())}
            </div>

            <div className="report-stat-container">
              <div className="report-stat-label">Total Bookings:</div>
              <div className="report-stat-value">{weeklyReport.bookings}</div>
            </div>

            {summaryData && (
              <>
                <div className="report-section">
                  <div className="report-section-title">Platform Summary</div>
                  <div className="report-item">
                    <div className="report-item-label">Users:</div>
                    <div className="report-item-value">{summaryData.users}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Profiles:</div>
                    <div className="report-item-value">{summaryData.profiles}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Services:</div>
                    <div className="report-item-value">{summaryData.services}</div>
                  </div>
                </div>

                <div className="report-section">
                  <div className="report-item">
                    <div className="report-item-label">Categories:</div>
                    <div className="report-item-value">{summaryData.categories}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Total Bookings:</div>
                    <div className="report-item-value">{summaryData.bookings}</div>
                  </div>
                </div>
              </>
            )}

            <button className="back-button" onClick={() => setShowWeeklyReport(false)}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Monthly Report Modal */}
      {showMonthlyReport && monthlyReport && (
        <div className="modal-overlay" onClick={() => setShowMonthlyReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="report-modal-title">Monthly Report</h2>
            <div className="report-date">{getCurrentMonthYear()}</div>

            <div className="report-stat-container">
              <div className="report-stat-label">Total Bookings:</div>
              <div className="report-stat-value">{monthlyReport.bookings}</div>
            </div>

            {summaryData && (
              <>
                <div className="report-section">
                  <div className="report-section-title">Platform Summary</div>
                  <div className="report-item">
                    <div className="report-item-label">Users:</div>
                    <div className="report-item-value">{summaryData.users}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Profiles:</div>
                    <div className="report-item-value">{summaryData.profiles}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Services:</div>
                    <div className="report-item-value">{summaryData.services}</div>
                  </div>
                </div>

                <div className="report-section">
                  <div className="report-item">
                    <div className="report-item-label">Categories:</div>
                    <div className="report-item-value">{summaryData.categories}</div>
                  </div>
                  <div className="report-item">
                    <div className="report-item-label">Total Bookings:</div>
                    <div className="report-item-value">{summaryData.bookings}</div>
                  </div>
                </div>
              </>
            )}

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
