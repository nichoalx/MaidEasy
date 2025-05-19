"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"
import axios from "../utils/axiosInstance";
import person_icon from "../assets/person_icon.png"
import calendar_icon from "../assets/calender_icon.png"
import mail_icon from "../assets/mail_icon.png"
import lock_icon from "../assets/lock_icon.png"
import logout from "../assets/logout.png"
import Vector from "../assets/Vector.png"
import Human from "../assets/Human.png"
import circle_person from "../assets/circle_person.png"

function ViewUser() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setUserData({
          id: data.success.user_id,
          firstName: data.success.first_name,
          lastName: data.success.last_name,
          dateOfBirth: data.success.dob,
          contactNumber: data.success.contact_number,
          email: data.success.email,
          role: data.success.profile_name,
          status: data.success.is_active ? "Active" : "Suspended",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/edit-user/${userId}`)
  }

  if (loading) {
    return (
    <div className="platform-layout">
        <div className="sidebar">
          <div className="logo-container">
            <h1 className="logo">Garuda<br />Indonesia</h1>
          </div>

          <nav className="nav-menu">
            <a
              href="#"
              className="nav-item active"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("profile")
              }}
            >
              <i className="icon grid-icon"></i>
              <span1><img src={circlePersonIcon} alt="person icon" />My Profile</span1>
            </a>
            <a
              href="#"
              className="nav-item active"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("account")
              }}
            >
            <i className="icon profile-icon"></i>
            <span><img src={vectorIcon} alt="person icon" />Account Management</span>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("profileManagement")
              }}
            >
            <i className="icon report-icon"></i>
            <span1><img src={humanIcon} alt="confirm icon" />Profile Management</span1>
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

            <div className="dashboard-content">
              <h1 className="dashboard-title">User Account &gt; View Account</h1>
              <div className="loading-indicator">Loading user data...</div>
            </div>
          </div>
        </div>
    )
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
                navigate("/dashboard", { state: { page: "profile" } })
              }}
            >
              <img src={circle_person || "/placeholder.svg"} alt="Profile" className="icon" />
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
              <img src={Vector || "/placeholder.svg"} alt="Account" className="icon" />
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
              <img src={Human || "/placeholder.svg"} alt="Profile Management" className="icon" />
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
                    onClick={() => navigate("/dashboard", { state: { page: "account" } })}
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
                      <input type="text" id="firstName" value={userData.firstName} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="input-container">
                      <img src={person_icon || "/placeholder.svg"} alt="Person" className="input-icon" />
                      <input type="text" id="lastName" value={userData.lastName} readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <div className="input-container">
                      <img src={calendar_icon || "/placeholder.svg"} alt="Calendar" className="input-icon" />
                      <input type="text" id="dateOfBirth" value={userData.dateOfBirth} readOnly />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <div className="input-container">
                      <i className="icon phone-icon"></i>
                      <input type="text" id="contactNumber" value={userData.contactNumber} readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                      <img src={mail_icon || "/placeholder.svg"} alt="Email" className="input-icon" />
                      <input type="email" id="email" value={userData.email} readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <div className="input-container">
                      <i className="icon role-icon"></i>
                      <input type="text" id="role" value={userData.role} readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="input-container">
                      <span className={`status-indicator ${userData.status.toLowerCase()}`}></span>
                      <input type="text" id="status" value={userData.status} readOnly />
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

export default ViewUser