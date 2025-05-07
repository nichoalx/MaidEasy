import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"

import visibility_on from "../../assets/visibility_on.png"
import visibility_off from "../../assets/visibility_off.png"
import person_icon from "../../assets/person_icon.png"
import calendar_icon from "../../assets/calender_icon.png"
import mail_icon from "../../assets/mail_icon.png"
import lock_icon from "../../assets/lock_icon.png"

function EditUser() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { userId } = useParams()

  const userData = {
    firstName: "Kieron",
    lastName: "Yolin",
    dateOfBirth: "12/10/2004",
    contactNumber: "82629526",
    email: "Kieronyolin12@gmail.com",
    password: "••••••••••",
    role: "Cleaner",
    status: "Active",
    createdDate: "09/04/2025",
    cleanerSummary: {
      servicesOffered: 8,
      views: 214,
      shortlisted: 12,
      confirmedJobs: 5,
      lastJob: "01/04/2025",
    },
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    alert("Changes saved successfully!")
    navigate(-1)
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
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                navigate("/dashboard", { state: { page: "dashboard" } })
              }}
            >
              <i className="icon dashboard-icon"></i>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                navigate("/dashboard", { state: { page: "profile" } })
              }}
            >
              <i className="icon profile-icon"></i>
              <span>My Profile</span>
            </a>
            <a
              href="#"
              className="nav-item active"
              onClick={(e) => {
                e.preventDefault()
                navigate("/dashboard", { state: { page: "account" } })
              }}
            >
              <i className="icon users-icon"></i>
              <span>Account Management</span>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                navigate("/dashboard", { state: { page: "profileManagement" } })
              }}
            >
              <i className="icon profile-management-icon"></i>
              <span>Profile Management</span>
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

          <div className="dashboard-content">
            <h1 className="dashboard-title">User Account &gt; View Account</h1>

            <div className="large-card">
              <div
                className="card-header"
                style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}
              >
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Personal Information</h2>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={handleBack}
                    style={{
                      backgroundColor: "#e5edff",
                      color: "#3e4772",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 24px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleEdit}
                    style={{
                      backgroundColor: "#3e4772",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 24px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <div className="input-container">
                      <img src={person_icon || "/placeholder.svg"} alt="Person" className="input-icon" />
                      <input type="text" id="firstName" defaultValue={userData.firstName} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="input-container">
                      <img src={person_icon || "/placeholder.svg"} alt="Person" className="input-icon" />
                      <input type="text" id="lastName" defaultValue={userData.lastName} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <div className="input-container">
                      <img src={calendar_icon || "/placeholder.svg"} alt="Calendar" className="input-icon" />
                      <input type="text" id="dateOfBirth" defaultValue={userData.dateOfBirth} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <div className="input-container">
                      <i className="icon phone-icon"></i>
                      <input type="text" id="contactNumber" defaultValue={userData.contactNumber} />
                    </div>
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                      <img src={mail_icon || "/placeholder.svg"} alt="Email" className="input-icon" />
                      <input type="email" id="email" defaultValue={userData.email} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-container">
                      <img src={lock_icon || "/placeholder.svg"} alt="Lock" className="input-icon" />
                      <input type={showPassword ? "text" : "password"} id="password" defaultValue={userData.password} />
                      <img
                        src={showPassword ? visibility_on : visibility_off}
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                        alt="Toggle visibility"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <div className="input-container">
                      <i className="icon role-icon"></i>
                      <input type="text" id="role" defaultValue={userData.role} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="input-container">
                      <span className="status-indicator active"></span>
                      <input type="text" id="status" defaultValue={userData.status} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="createdDate">Created Date</label>
                    <div className="input-container">
                      <img src={calendar_icon || "/placeholder.svg"} alt="Calendar" className="input-icon" />
                      <input type="text" id="createdDate" defaultValue={userData.createdDate} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: "24px", marginTop: "24px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Cleaner Summary</h2>

                <div style={{ display: "flex", marginBottom: "12px" }}>
                  <span style={{ width: "150px", color: "#666666" }}>Services Offered :</span>
                  <span style={{ fontWeight: "500" }}>{userData.cleanerSummary.servicesOffered}</span>
                </div>

                <div style={{ display: "flex", marginBottom: "12px" }}>
                  <span style={{ width: "150px", color: "#666666" }}>Views :</span>
                  <span style={{ fontWeight: "500" }}>{userData.cleanerSummary.views}</span>
                </div>

                <div style={{ display: "flex", marginBottom: "12px" }}>
                  <span style={{ width: "150px", color: "#666666" }}>Shortlisted :</span>
                  <span style={{ fontWeight: "500" }}>{userData.cleanerSummary.shortlisted}</span>
                </div>

                <div style={{ display: "flex", marginBottom: "12px" }}>
                  <span style={{ width: "150px", color: "#666666" }}>Confirmed Jobs :</span>
                  <span style={{ fontWeight: "500" }}>{userData.cleanerSummary.confirmedJobs}</span>
                </div>

                <div style={{ display: "flex", marginBottom: "12px" }}>
                  <span style={{ width: "150px", color: "#666666" }}>Last Job :</span>
                  <span style={{ fontWeight: "500" }}>{userData.cleanerSummary.lastJob}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
