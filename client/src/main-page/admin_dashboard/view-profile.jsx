"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./editProfile.css"
import logout from "../../assets/logout.png"

function ViewProfile() {
  const navigate = useNavigate()
  const { profileId } = useParams()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    // Simulate API call to fetch profile data
    setLoading(true)
    setTimeout(() => {
      const profile = profilesData.find((p) => p.id === Number.parseInt(profileId))
      if (profile) {
        setProfileData(profile)
      } else {
        // If profile not found, create a default one
        setProfileData({
          id: Number.parseInt(profileId),
          name: "Unknown Role",
          description: "No description available",
          permissions: [],
          users: 0,
          status: "Inactive",
        })
      }
      setLoading(false)
    }, 500)
  }, [profileId])

  const handleBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/edit-profile/${profileId}`)
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
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard")}>
              <i className="icon dashboard-icon"></i>
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "profile" } })}>
              <i className="icon profile-icon"></i>
              <span>My Profile</span>
            </a>
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "account" } })}>
              <i className="icon users-icon"></i>
              <span>Account Management</span>
            </a>
            <a
              href="#"
              className="nav-item active"
              onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}
            >
              <i className="icon profile-management-icon"></i>
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
            <h1 className="page-title">Profile Management &gt; View Profile</h1>
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
          <a href="#" className="nav-item" onClick={() => navigate("/dashboard")}>
            <i className="icon dashboard-icon"></i>
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "profile" } })}>
            <i className="icon profile-icon"></i>
            <span>My Profile</span>
          </a>
          <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "account" } })}>
            <i className="icon users-icon"></i>
            <span>Account Management</span>
          </a>
          <a
            href="#"
            className="nav-item active"
            onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}
          >
            <i className="icon profile-management-icon"></i>
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
          <h1 className="page-title">Profile Management &gt; View Profile</h1>

          <div className="profile-card">
            <div className="card-header">
              <h2>Profile Information</h2>
              <div className="button-group">
                <button className="btn btn-secondary" onClick={handleBack}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>

            <div className="card-content">
              <div className="profile-details">
                <div className="profile-main">
                  <div className="form-group">
                    <label>Role Name</label>
                    <div className="input-display">
                      <i className="icon role-icon"></i>
                      <span>{profileData.name}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <div className="textarea-display">
                      <p>{profileData.description}</p>
                    </div>
                  </div>

                  <div className="permissions-section">
                    {profileData.permissions.map((permission, index) => (
                      <div key={index} className="permission-item">
                        <div className="permission-checkbox checked">
                          <span className="checkmark"></span>
                        </div>
                        <span className="permission-label">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="stats-card">
                    <div className="stats-title">{profileData.name}</div>
                    <div className="stats-number">{profileData.users}</div>
                    <div className="stats-label">Users</div>
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

export default ViewProfile
