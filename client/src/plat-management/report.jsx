"use client"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "../utils/axiosInstance"
import "./platform-style.css"

import categoryIcon from "../assets/category.png"
import personIcon from "../assets/circle_person.png"
import reportIcon from "../assets/report.png"
import logoutIcon from "../assets/logout.png"


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
  const [isLoading, setIsLoading] = useState({
    summary: false,
    daily: false,
    weekly: false,
    monthly: false,
  })
  const [error, setError] = useState(null)

  const [user, setUser] = useState(null)

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
      setIsLoading((prev) => ({ ...prev, summary: true }))
      setError(null)
      const response = await axios.get("/api/report/summary")
      setSummaryData(response.data)
    } catch (err) {
      console.error("Error fetching summary data:", err)
      setError(err.response?.data?.message || "Failed to fetch summary data")
    } finally {
      setIsLoading((prev) => ({ ...prev, summary: false }))
    }
  }

  // Fetch daily report
  const fetchDailyReport = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, daily: true }))
      setError(null)
      const response = await axios.get("/api/report/daily")
      setDailyReport(response.data)
      setShowDailyReport(true)
    } catch (err) {
      console.error("Error fetching daily report:", err)
      setError(err.response?.data?.message || "Failed to fetch daily report")
    } finally {
      setIsLoading((prev) => ({ ...prev, daily: false }))
    }
  }

  // Fetch weekly report
  const fetchWeeklyReport = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, weekly: true }))
      setError(null)
      const response = await axios.get("/api/report/weekly")
      setWeeklyReport(response.data)
      setShowWeeklyReport(true)
    } catch (err) {
      console.error("Error fetching weekly report:", err)
      setError(err.response?.data?.message || "Failed to fetch weekly report")
    } finally {
      setIsLoading((prev) => ({ ...prev, weekly: false }))
    }
  }

  // Fetch monthly report
  const fetchMonthlyReport = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, monthly: true }))
      setError(null)
      const response = await axios.get("/api/report/monthly")
      setMonthlyReport(response.data)
      setShowMonthlyReport(true)
    } catch (err) {
      console.error("Error fetching monthly report:", err)
      setError(err.response?.data?.message || "Failed to fetch monthly report")
    } finally {
      setIsLoading((prev) => ({ ...prev, monthly: false }))
    }
  }

  // Fetch summary data on component mount
  useEffect(() => {
    fetchSummaryData()
  }, [])

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
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/platform-management") }}>
            <span><img src={categoryIcon} alt="category icon" />Categories</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/platform-profile") }}>
            <span1><img src={personIcon} alt="profile icon" />My Profile</span1>
          </a>
          <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); navigate("/report") }}>
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
              Hi, {user?.first_name || "User"} 👋
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-summary">
              <img src={personIcon} alt="icon" />
              <div className="user-info">
                <div className="user-name">{user?.first_name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="platform-content">
          <h1 className="platform-title">Report</h1>

          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "20px",
                padding: "10px",
                backgroundColor: "#ffeeee",
                borderRadius: "5px",
              }}
            >
              Error: {error}. Please try again later.
            </div>
          )}

          <div className="report-cards-container3">
            {/* Daily Report Card */}
            <div className="report-card">
              <h2 className="report-card-title">Daily Report</h2>
              <button className="generate-btn" onClick={fetchDailyReport} disabled={isLoading.daily}>
                {isLoading.daily ? "Loading..." : "Generate"}
              </button>
            </div>

            {/* Weekly Report Card */}
            <div className="report-card">
              <h2 className="report-card-title">Weekly Report</h2>
              <button className="generate-btn" onClick={fetchWeeklyReport} disabled={isLoading.weekly}>
                {isLoading.weekly ? "Loading..." : "Generate"}
              </button>
            </div>

            {/* Monthly Report Card */}
            <div className="report-card">
              <h2 className="report-card-title">Monthly Report</h2>
              <button className="generate-btn" onClick={fetchMonthlyReport} disabled={isLoading.monthly}>
                {isLoading.monthly ? "Loading..." : "Generate"}
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
