"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./editProfile.css"
import Toast from "./components/Toast"
import logout from "../assets/logout.png"
import Vector from "../assets/Vector.png"
import Human from "../assets/Human.png"
import circle_person from "../assets/circle_person.png"

function EditProfile() {
  const navigate = useNavigate()
  const { profileId } = useParams()
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  // Available permissions for checkboxes
  const availablePermissions = [
    "User Management",
    "Profile Management",
    "System Settings",
    "Reports",
    "Service Management",
    "Schedule Management",
    "Client Communication",
    "Service Booking",
    "Payment Management",
    "Reviews",
    "Team Management",
    "Project Planning",
    "Ticket Management",
    "Knowledge Base",
    "Financial Reports",
    "Invoice Management",
    "Payment Processing",
  ]

  // Mock profile data
  const profilesData = [
    {
      id: 1,
      name: "Admin",
      description: "System administrators with full access to all features",
      permissions: ["User Management", "Profile Management", "System Settings", "Reports"],
      users: 2,
      status: "Active",
    },
    {
      id: 2,
      name: "Cleaner",
      description: "Professional cleaners who provide cleaning services",
      permissions: ["Service Management", "Schedule Management", "Client Communication"],
      users: 20,
      status: "Active",
    },
    {
      id: 3,
      name: "Home Owner",
      description: "Customers who book cleaning services for their homes",
      permissions: ["Service Booking", "Payment Management", "Reviews"],
      users: 68,
      status: "Active",
    },
    {
      id: 4,
      name: "Baby Sitter",
      description: "Professionals who provide baby sitting services",
      permissions: ["Schedule Management", "Client Communication"],
      users: 13,
      status: "Inactive",
    },
    {
      id: 5,
      name: "Project Manager",
      description: "Managers who oversee cleaning projects and teams",
      permissions: ["Team Management", "Project Planning", "Client Communication", "Reports"],
      users: 8,
      status: "Active",
    },
  ]

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
    users: 0,
    status: "Active",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Simulate API call to fetch profile data
    setLoading(true)
    setTimeout(() => {
      const profile = profilesData.find((p) => p.id === Number.parseInt(profileId))
      if (profile) {
        setFormData(profile)
      } else {
        // If profile not found, create a default one
        setFormData({
          id: Number.parseInt(profileId),
          name: "New Role",
          description: "Description for the new role",
          permissions: [],
          users: 0,
          status: "Active",
        })
      }
      setLoading(false)
    }, 500)
  }, [profileId])

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
      // In a real app, this would send data to an API to update the database
      setToast({
        show: true,
        message: "Profile updated successfully!",
        type: "success",
      })

      // Hide toast after 3 seconds and navigate back
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" })
        navigate("/dashboard", { state: { page: "profileManagement" } })
      }, 3000)
    }
  }

  if (loading) {
    return (
      <div className="modern-layout">
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
            <a href="#" className="logout-link" onClick={() => navigate("/")}>
              <img src={logout || "/placeholder.svg"} alt="Logout" className="logout-icon" />
              <span>Log Out</span>
            </a>
          </div>
        </div>

        <div className="main-content">
          <header className="modern-header">
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
                <div className="user-email">admin@gmail.com</div>
              </div>
              <div className="user-avatar">
                <i className="icon user-icon"></i>
              </div>
            </div>
          </header>

          <div className="content-container">
            <h1 className="page-title">Profile Management &gt; Update Profile</h1>
            <div className="loading-indicator">Loading profile data...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modern-layout">
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
          <a href="#" className="logout-link" onClick={() => navigate("/")}>
            <img src={logout || "/placeholder.svg"} alt="Logout" className="logout-icon" />
            <span>Log Out</span>
          </a>
        </div>
      </div>

      <div className="main-content">
        <header className="modern-header">
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
              <div className="user-email">admin@gmail.com</div>
            </div>
            <div className="user-avatar">
              <i className="icon user-icon"></i>
            </div>
          </div>
        </header>

        <div className="content-container">
          <h1 className="page-title">Profile Management &gt; Update Profile</h1>

          <div className="profile-card">
            <div className="card-header">
              <h2>Profile Information</h2>
              <div className="button-group">
                <button className="btn btn-secondary" onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>

            <div className="card-content">
              <div className="profile-details">
                <div className="profile-main">
                  <div className="form-group">
                    <label htmlFor="name">Role Name</label>
                    <div className={`modern-input ${errors.name ? "error" : ""}`}>
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

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className={`modern-textarea ${errors.description ? "error" : ""}`}>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter role description"
                        rows="4"
                      ></textarea>
                    </div>
                    {errors.description && <div className="error-message">{errors.description}</div>}
                  </div>

                  <div className="permissions-section">
                    <label>Permissions</label>
                    {errors.permissions && <div className="error-message">{errors.permissions}</div>}

                    <div className="permissions-grid">
                      {availablePermissions.slice(0, 6).map((permission) => (
                        <div key={permission} className="permission-item">
                          <div
                            className={`permissions-checkbox ${
                              formData.permissions.includes(permission) ? "checked" : ""
                            }`}
                            onClick={() => handlePermissionChange(permission)}
                          >
                            {formData.permissions.includes(permission) && <span className="checkmark"></span>}
                          </div>
                          <span className="permission-label">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="stats-card">
                    <div className="stats-title">{formData.name}</div>
                    <div className="stats-number">{formData.users}</div>
                    <div className="stats-label">Users</div>
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

export default EditProfile
