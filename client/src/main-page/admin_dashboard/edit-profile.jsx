import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"

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
      // In a real app, this would send data to an API
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
              <a href="/dashboard" className="nav-item">
                <i className="icon dashboard-icon"></i>
                <span>Dashboard</span>
              </a>
              <a href="#" className="nav-item">
                <i className="icon profile-icon"></i>
                <span>My Profile</span>
              </a>
              <a href="#" className="nav-item">
                <i className="icon users-icon"></i>
                <span>Account Management</span>
              </a>
              <a href="#" className="nav-item active">
                <i className="icon profile-management-icon"></i>
                <span>Profile Management</span>
              </a>
            </nav>

            <div className="logout-container">
              <a href="/" className="logout-link">
                <i className="icon logout-icon"></i>
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
              <h1 className="dashboard-title">Profile Management &gt; Edit Profile</h1>
              <div className="loading-indicator">Loading profile data...</div>
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
              className="nav-item"
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
              className="nav-item active"
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
            <h1 className="dashboard-title">Profile Management &gt; Edit Profile</h1>

            <div className="large-card">
              <div
                className="card-header"
                style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}
              >
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Profile Information</h2>
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

                    <div
                      className="permissions-container"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      {availablePermissions.map((permission) => (
                        <div
                          key={permission}
                          className="permission-checkbox"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="checkbox"
                            id={`permission-${permission}`}
                            checked={formData.permissions.includes(permission)}
                            onChange={() => handlePermissionChange(permission)}
                            style={{ marginRight: "8px" }}
                          />
                          <label htmlFor={`permission-${permission}`}>{permission}</label>
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

export default EditProfile
