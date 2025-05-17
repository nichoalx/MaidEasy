"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"
import logout from "../../assets/logout.png"
import axios from "../../utils/axiosInstance";
import person_icon from "../../assets/person_icon.png"
import calendar_icon from "../../assets/calender_icon.png"
import mail_icon from "../../assets/mail_icon.png"
import lock_icon from "../../assets/lock_icon.png"
import visibility_on from "../../assets/visibility_on.png"
import visibility_off from "../../assets/visibility_off.png"
import Vector from "../../assets/Vector.png"
import Human from "../../assets/Human.png"
import circle_person from "../../assets/circle_person.png"

function AddUser() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    password: "",
    role: "cleaner",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        dob: formData.dateOfBirth,
        contact_number: formData.contactNumber,
        role_name: formData.role
      };

      const response = await axios.post("/api/users/create", payload);
      console.log("Sending payload:", payload);

      setToast({
        show: true,
        message: "User created successfully!",
        type: "success"
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
        navigate("/dashboard", { state: { page: "account" } });
      }, 3000);

    } catch (error) {
      console.error("Create user error:", error.response?.data || error.message);
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to create user",
        type: "error"
      });
    }
  };

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

            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "profile" } })}>
              <img src={circle_person || "/placeholder.svg"} alt="Profile" className="icon" />
              <span>My Profile</span>
            </a>
            <a
              href="#"
              className="nav-item active"
              onClick={() => navigate("/dashboard", { state: { page: "account" } })}
            >
              <img src={Vector || "/placeholder.svg"} alt="Account" className="icon" />
              <span>Account Management</span>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}
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
            <h1 className="dashboard-title">User Account &gt; Add New Account</h1>

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

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <div className={`input-container ${errors.firstName ? "error-input" : ""}`}>
                      <img src={person_icon || "/placeholder.svg"} alt="Person" className="input-icon" />
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                      />
                    </div>
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="input-container">
                      <img src={person_icon || "/placeholder.svg"} alt="Person" className="input-icon" />
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name (optional)"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <div className={`input-container ${errors.dateOfBirth ? "error-input" : ""}`}>
                      <img src={calendar_icon || "/placeholder.svg"} alt="Calendar" className="input-icon" />
                      <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <div className={`input-container ${errors.contactNumber ? "error-input" : ""}`}>
                      <i className="icon phone-icon"></i>
                      <input
                        type="text"
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                      />
                    </div>
                    {errors.contactNumber && <div className="error-message">{errors.contactNumber}</div>}
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className={`input-container ${errors.email ? "error-input" : ""}`}>
                      <img src={mail_icon || "/placeholder.svg"} alt="Email" className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className={`input-container ${errors.password ? "error-input" : ""}`}>
                      <img src={lock_icon || "/placeholder.svg"} alt="Lock" className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                      />
                      <img
                        src={showPassword ? visibility_on : visibility_off}
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                        alt="Toggle visibility"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <div className="input-container">
                      <i className="icon role-icon"></i>
                      <select id="role" value={formData.role} onChange={handleChange}>
                        <option value="cleaner">Cleaner</option>
                        <option value="homeowner">Home Owner</option>
                        <option value="project_manager">Project Management</option>
                      </select>
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

export default AddUser
