"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"
import axios from "../utils/axiosInstance"
import logout from "../assets/logout.png"
import vectorIcon from "../assets/Vector.png"
import humanIcon from "../assets/Human.png"
import circlePersonIcon from "../assets/circle_person.png"

function AddProfile() {
  const navigate = useNavigate()
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [], // <-- new array to hold selected values
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
    if (formData.permissions.length === 0) {
      newErrors.permissions = "Please select at least one permission"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleLogout = (e) => {
    e.preventDefault()
    navigate("/")
  }

  const togglePermission = (value) => {
    setFormData((prev) => {
      const permissions = prev.permissions.includes(value)
        ? prev.permissions.filter((perm) => perm !== value)
        : [...prev.permissions, value];

      return {
        ...prev,
        permissions,
      };
    });
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const payload = {
          role_name: formData.name,
          description: formData.description,
          is_active: true,
          has_booking_permission: formData.permissions.includes("book"),
          has_listing_permission: formData.permissions.includes("listing"),
          has_view_analytics_permission: formData.permissions.includes("analytics"),
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
    <div className="platform-layout">
        <div className="sidebar">
          <div className="logo-container">
            <h1 className="logo">Garuda<br />Indonesia</h1>
          </div>

          <nav className="nav-menu">
            <a
              href="#"
              className="nav-item"
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
              className="nav-item"
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
              className="nav-item active"
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

          <div className="whiteSpace">
            <div className="platform-content">
              <div className="large-card">
                <h1 className="platform-title3">Create New Profile</h1>
                <div className="profile-form">
                  <div className="add-profile-form">
                    <div className="add-profile-group">
                      <label className="add-profile-label" htmlFor="name">Role Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter role name"
                        value={formData.name}
                        onChange={handleChange}
                        className="add-profile-input"
                      />
                      {errors.name && <div className="add-profile-error">{errors.name}</div>}
                    </div>

                    <div className="add-profile-group">
                      <label className="add-profile-label" htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        placeholder="Enter Role Descriptions"
                        value={formData.description}
                        onChange={handleChange}
                        className="add-profile-textarea"
                      />
                    </div>

                    <div className="add-profile-group">
                      <label className="add-profile-label">Permissions</label>
                      {errors.permissions && <div className="add-profile-error">{errors.permissions}</div>}
                        <div className="add-profile-permissions">
                          <label className="add-profile-radio">
                              <input
                                type="checkbox"
                                name="permission"
                                value="book"
                                checked={formData.permissions.includes("book")}
                                onChange={() => togglePermission("book")}
                              />
                            <span>Book Permission</span>
                          </label>

                          <label className="add-profile-radio">
                            <input
                              type="checkbox"
                              name="permission"
                              value="listing"
                              checked={formData.permissions.includes("listing")}
                              onChange={() => togglePermission("listing")}
                            />
                            <span>Listing Permission</span>
                          </label>

                          <label className="add-profile-radio">
                              <input
                                type="checkbox"
                                name="permission"
                                value="analytics"
                                checked={formData.permissions.includes("analytics")}
                                onChange={() => togglePermission("analytics")}
                              />
                            <span>View Analytics Permission</span>
                          </label>
                        </div>
                    </div>

                    <div className="add-profile-buttons">
                      <button className="add-profile-save" onClick={handleSave}>Save</button>
                      <button className="add-profile-cancel" onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}>
                        Cancel
                      </button>
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
