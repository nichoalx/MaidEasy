"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"

import visibility_on from "../../assets/visibility_on.png"
import visibility_off from "../../assets/visibility_off.png"
import person_icon from "../../assets/person_icon.png"
import calendar_icon from "../../assets/calender_icon.png"
import mail_icon from "../../assets/mail_icon.png"
import lock_icon from "../../assets/lock_icon.png"
import circle_person from "../../assets/circle_person.png"
import logout from "../../assets/logout.png"
import Vector from "../../assets/Vector.png"
import Human from "../../assets/Human.png"

function EditUser() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { userId } = useParams()
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [profileImage, setProfileImage] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    password: "••••••••••",
    role: "Cleaner",
    status: "Active",
    createdDate: "",
    profilePicture: "",
    cleanerSummary: {
      servicesOffered: 0,
      views: 0,
      shortlisted: 0,
      confirmedJobs: 0,
      lastJob: "",
    },
  })

  // Mock user data - in a real app, this would come from an API
  const usersData = [
    {
      id: 1,
      firstName: "Nick",
      lastName: "Fury",
      dateOfBirth: "15/07/1980",
      contactNumber: "82629526",
      email: "Nickfury@gmail.com",
      password: "••••••••••",
      role: "Cleaner",
      status: "Active",
      createdDate: "09/04/2023",
      profilePicture: "",
      cleanerSummary: {
        servicesOffered: 8,
        views: 214,
        shortlisted: 12,
        confirmedJobs: 5,
        lastJob: "01/04/2025",
      },
    },
    {
      id: 2,
      firstName: "Edmond",
      lastName: "",
      dateOfBirth: "22/03/1992",
      contactNumber: "82345678",
      email: "edm@gmail.com",
      password: "••••••••••",
      role: "Cleaner",
      status: "Active",
      createdDate: "15/05/2023",
      profilePicture: "",
      cleanerSummary: {
        servicesOffered: 5,
        views: 178,
        shortlisted: 8,
        confirmedJobs: 3,
        lastJob: "28/03/2025",
      },
    },
    {
      id: 3,
      firstName: "Kennegg",
      lastName: "",
      dateOfBirth: "10/11/1988",
      contactNumber: "87654321",
      email: "igogymeeveryday@gmail.com",
      password: "••••••••••",
      role: "Cleaner",
      status: "Active",
      createdDate: "20/06/2023",
      profilePicture: "",
      cleanerSummary: {
        servicesOffered: 6,
        views: 192,
        shortlisted: 10,
        confirmedJobs: 4,
        lastJob: "15/03/2025",
      },
    },
    {
      id: 4,
      firstName: "Keegpin",
      lastName: "",
      dateOfBirth: "05/09/1990",
      contactNumber: "81234567",
      email: "eateggdaily@gmail.com",
      password: "••••••••••",
      role: "Cleaner",
      status: "Active",
      createdDate: "12/07/2023",
      profilePicture: "",
      cleanerSummary: {
        servicesOffered: 7,
        views: 205,
        shortlisted: 11,
        confirmedJobs: 4,
        lastJob: "20/03/2025",
      },
    },
    {
      id: 5,
      firstName: "Ben",
      lastName: "Ice Cream",
      dateOfBirth: "18/12/1985",
      contactNumber: "89876543",
      email: "jerry@gmail.com",
      password: "••••••••••",
      role: "Cleaner",
      status: "Active",
      createdDate: "25/08/2023",
      profilePicture: "",
      cleanerSummary: {
        servicesOffered: 9,
        views: 225,
        shortlisted: 14,
        confirmedJobs: 6,
        lastJob: "25/03/2025",
      },
    },
  ]

  useEffect(() => {
    // Simulate API call to fetch user data
    setLoading(true)
    setTimeout(() => {
      const user = usersData.find((u) => u.id === Number.parseInt(userId))
      if (user) {
        setFormData(user)
      } else {
        // If user not found in our mock data, create a default one
        setFormData({
          id: Number.parseInt(userId),
          firstName: "User",
          lastName: userId,
          dateOfBirth: "01/01/1990",
          contactNumber: "12345678",
          email: `user${userId}@example.com`,
          password: "••••••••••",
          role: "Cleaner",
          status: "Active",
          createdDate: "01/01/2023",
          profilePicture: "",
          cleanerSummary: {
            servicesOffered: 5,
            views: 150,
            shortlisted: 8,
            confirmedJobs: 3,
            lastJob: "01/03/2025",
          },
        })
      }
      setLoading(false)
    }, 500)
  }, [userId])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleSave = () => {
    // In a real app, this would send data to an API to update the database
    setToast({
      show: true,
      message: "User updated successfully!",
      type: "success",
    })

    // Hide toast after 3 seconds and navigate back
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" })
      navigate("/dashboard", { state: { page: "account" } })
    }, 3000)
  }

  if (loading) {
    return (
      <div className="dashboard-layout">
        <div className="app-container">
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
              <h1 className="dashboard-title">User Account &gt; Edit Account</h1>
              <div className="loading-indicator">Loading user data...</div>
            </div>
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
            <h1 className="dashboard-title">User Account &gt; Edit Account</h1>

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
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
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
                    Save
                  </button>
                </div>
              </div>

              {/* Profile Picture Section */}
              <div style={{ display: "flex", justifyContent: "left", marginBottom: "24px" }}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 12px",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={circle_person || "/placeholder.svg"}
                        alt="Default Profile"
                        style={{ width: "80%", height: "80%", objectFit: "contain" }}
                      />
                    )}
                  </div>
                  <label
                    htmlFor="profile-upload"
                    style={{
                      backgroundColor: "#e5edff",
                      color: "#3e4772",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "inline-block",
                      fontSize: "14px",
                    }}
                  >
                    Change Photo
                  </label>
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <div className="input-container">
                      <img src={person_icon || "/placeholder.svg"} alt="Person" className="input-icon" />
                      <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="input-container">
                      <img src={person_icon || "/placeholder.svg"} alt="Person" className="input-icon" />
                      <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <div className="input-container">
                      <img src={calendar_icon || "/placeholder.svg"} alt="Calendar" className="input-icon" />
                      <input type="text" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <div className="input-container">
                      <i className="icon phone-icon"></i>
                      <input type="text" id="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                      <img src={mail_icon || "/placeholder.svg"} alt="Email" className="input-icon" />
                      <input type="email" id="email" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-container">
                      <img src={lock_icon || "/placeholder.svg"} alt="Lock" className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
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
                      <input type="text" id="role" value={formData.role} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="input-container">
                      <span className="status-indicator active"></span>
                      <input type="text" id="status" value={formData.status} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="createdDate">Created Date</label>
                    <div className="input-container">
                      <img src={calendar_icon || "/placeholder.svg"} alt="Calendar" className="input-icon" />
                      <input type="text" id="createdDate" value={formData.createdDate} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default EditUser
