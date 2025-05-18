"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"
import axios from "../utils/axiosInstance"
import logout from "../assets/logout.png"
import Vector from "../assets/Vector.png"
import Human from "../assets/Human.png"
import circle_person from "../assets/circle_person.png"

function AddProfile() {
  const navigate = useNavigate()
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  const [formData, setFormData] = useState({
    name: "",
    has_booking_permission: false,
    has_listing_permission: false,
    has_view_analytics_permission: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handlePermissionChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Role name is required"
    if (
      !formData.has_booking_permission &&
      !formData.has_listing_permission &&
      !formData.has_view_analytics_permission
    ) {
      newErrors.permissions = "At least one permission must be selected"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const payload = {
          role_name: formData.name,
          is_active: true,
          has_booking_permission: formData.has_booking_permission,
          has_listing_permission: formData.has_listing_permission,
          has_view_analytics_permission: formData.has_view_analytics_permission,
        }
        await axios.post("/api/profiles/create", payload)
        setToast({ show: true, message: "Profile created successfully!", type: "success" })
        setTimeout(() => {
          setToast({ show: false, message: "", type: "" })
          navigate("/dashboard", { state: { page: "profileManagement" } })
        }, 2000)
      } catch (error) {
        console.error("Failed to create profile", error)
        setToast({ show: true, message: "Failed to create profile", type: "error" })
      }
    }
  }

  return (
    <div className="dashboard-layout">
      <div className="app-container">
        <div className="sidebar">
          <div className="logo-container">
            <h1 className="logo">Garuda<br />Indonesia</h1>
          </div>

          <nav className="nav-menu">
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "profile" } })}>
              <img src={circle_person} alt="Profile" className="icon" />
              <span>My Profile</span>
            </a>
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "account" } })}>
              <img src={Vector} alt="Account" className="icon" />
              <span>Account Management</span>
            </a>
            <a href="#" className="nav-item active" onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}>
              <img src={Human} alt="Profile Management" className="icon" />
              <span>Profile Management</span>
            </a>
          </nav>

          <div className="logout-container">
            <a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); navigate("/") }}>
              <img src={logout} alt="Logout" className="logout-icon" />
              <span>Log Out</span>
            </a>
          </div>
        </div>

        <div className="main-content">
          <header className="header">
            <div className="greeting">
              <h2>Hi, Admin Ganteng <span role="img" aria-label="wave">👋</span></h2>
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
            <h1 className="dashboard-title">Profile Management &gt; Add New Profile</h1>

            <div className="large-card">
              <div className="card-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Profile Information</h2>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })} style={{ backgroundColor: "#e5edff", color: "#3e4772", border: "none", borderRadius: "8px", padding: "8px 24px", fontWeight: "500", cursor: "pointer" }}>Cancel</button>
                  <button onClick={handleSave} style={{ backgroundColor: "#3e4772", color: "white", border: "none", borderRadius: "8px", padding: "8px 24px", fontWeight: "500", cursor: "pointer" }}>Save</button>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="name">Role Name</label>
                    <div className={`input-container ${errors.name ? "error-input" : ""}`}>
                      <i className="icon role-icon"></i>
                      <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter role name" />
                    </div>
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label>Permissions</label>
                    {errors.permissions && <div className="error-message">{errors.permissions}</div>}
                    <div className="permissions-container">
                      <label className="permission-checkbox">
                        <input type="checkbox" checked={formData.has_booking_permission} onChange={() => handlePermissionChange("has_booking_permission")} /> Booking Permission
                      </label>
                      <label className="permission-checkbox">
                        <input type="checkbox" checked={formData.has_listing_permission} onChange={() => handlePermissionChange("has_listing_permission")} /> Listing Permission
                      </label>
                      <label className="permission-checkbox">
                        <input type="checkbox" checked={formData.has_view_analytics_permission} onChange={() => handlePermissionChange("has_view_analytics_permission")} /> View Analytics
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default AddProfile
