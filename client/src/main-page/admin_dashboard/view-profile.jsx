import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"

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
              <h1 className="dashboard-title">Profile Management &gt; View Profile</h1>
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
            <h1 className="dashboard-title">Profile Management &gt; View Profile</h1>

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

              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Role Name:</span>
                  <span className="detail-value">{profileData.name}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-${profileData.status.toLowerCase()}`}>
                    {profileData.status}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Number of Users:</span>
                  <span className="detail-value">{profileData.users}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value description">{profileData.description}</span>
                </div>

                <div className="detail-section">
                  <span className="detail-label">Permissions:</span>
                  {profileData.permissions.length > 0 ? (
                    <ul className="permissions-list">
                      {profileData.permissions.map((permission, index) => (
                        <li key={index} className="permission-item">
                          {permission}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="detail-value">No permissions assigned</span>
                  )}
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
