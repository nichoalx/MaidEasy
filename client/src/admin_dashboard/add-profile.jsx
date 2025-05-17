"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"
import logout from "../assets/logout.png"
import Vector from "../assets/Vector.png"
import Human from "../assets/Human.png"
import circle_person from "../assets/circle_person.png"

function AddProfile() {
  const navigate = useNavigate()
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  // Available permissions for checkboxes
   const permissionGroups = {
  "User": [" User Management", " Schedule Management", " Team Management", " Invoice Management"],
  "Profile": [" Profile Management", " Client Communication", " Project Planning", " Payment Processing"],
  "System": [" System Settings", " Service Booking", " Ticket Management"],
  "Reports": [" Reports", "  Payment Management", " Knowledge Base"],
  "Service": [" Service Management", " Reviews", " Financial Reports"],
}
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
    users: 0,
    status: "Active",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handlePermissionChange = (permission) => {
    const updatedPermissions = [...formData.permissions]

    if (updatedPermissions.includes(permission)) {
      // Remove permission if already selected
      const index = updatedPermissions.indexOf(permission)
      updatedPermissions.splice(index, 1)
    } else {
      // Add permission if not selected
      updatedPermissions.push(permission)
    }

    setFormData({
      ...formData,
      permissions: updatedPermissions,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Role name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.permissions.length === 0) newErrors.permissions = "At least one permission must be selected"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleSave = () => {
    if (validateForm()) {
      // In a real app, this would send data to an API
      setToast({
        show: true,
        message: "Profile added successfully!",
        type: "success",
      })

      // Hide toast after 3 seconds and navigate back
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" })
        navigate("/dashboard", { state: { page: "profileManagement" } })
      }, 3000)
    }
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
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "profile" } })}>
              <img src={circle_person || "/placeholder.svg"} alt="Profile" className="icon" />
              <span>My Profile</span>
            </a>
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "account" } })}>
              <img src={Vector || "/placeholder.svg"} alt="Account" className="icon" />
              <span>Account Management</span>
            </a>
            <a
              href="#"
              className="nav-item active"
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
            <h1 className="dashboard-title">Profile Management &gt; Add New Profile</h1>

            <div className="large-card">
              <div
                className="card-header"
                style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}
              >
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Profile Information</h2>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                  onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}

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
                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="name">Role Name</label>
                    <div className={`input-container ${errors.name ? "error-input" : ""}`}>
                      <i className="icon role-icon"></i>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter role name"
                      />
                    </div>
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div
                      className={`input-container ${errors.description ? "error-input" : ""}`}
                      style={{ height: "auto" }}
                    >
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter role description"
                        rows="3"
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                          resize: "vertical",
                          padding: "12px 0",
                        }}
                      ></textarea>
                    </div>
                    {errors.description && <div className="error-message">{errors.description}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="input-container">
                      <span className={`status-indicator ${formData.status.toLowerCase()}`}></span>
                      <select id="status" value={formData.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="users">Number of Users</label>
                    <div className="input-container">
                      <i className="icon users-icon"></i>
                      <input type="number" id="users" value={formData.users} onChange={handleChange} min="0" readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label>Permissions</label>
                    {errors.permissions && <div className="error-message">{errors.permissions}</div>}

                    <div className="permissions-container">
  {Object.entries(permissionGroups).map(([group, permissions]) => (
    <div key={group} className="permission-group">
      <h4 className="group-title">{group}</h4>
      {permissions.map((permission) => (
        <label key={permission} className="permission-checkbox">
          <input
            type="checkbox"
            checked={formData.permissions.includes(permission)}
            onChange={() => handlePermissionChange(permission)}
          />
          {permission}
        </label>
      ))}
    </div>
  ))}
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

export default AddProfile
