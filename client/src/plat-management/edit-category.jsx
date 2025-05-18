"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./platform-style.css"
import axios from "../utils/axiosInstance"

// Import icons
import category from "../assets/category.png"
import circle_person from "../assets/circle_person.png"
import reportS from "../assets/report.png"
import logout from "../assets/logout.png"

function EditCategory() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
    created_at: "",
    services_count: 0,
  })
  const [user, setUser] = useState(null)

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("user_id")
        if (userId) {
          const { data } = await axios.get(`/api/users/${userId}`)
          setUser(data.success)
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/category/${categoryId}`)
        if (response.data && response.data.success) {
          const category = response.data.success
          setFormData({
            category_name: category.category_name,
            description: category.description,
            created_at: new Date(category.created_at).toLocaleDateString(),
            services_count: category.services_count || 0,
          })
        }
      } catch (error) {
        console.error("Failed to fetch category:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [categoryId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/api/category/update/${categoryId}`, {
        category_name: formData.category_name,
        description: formData.description,
      })

      if (response.data && response.data.success) {
        navigate("/platform-management")
      }
    } catch (error) {
      console.error("Failed to update category:", error)
      alert("Failed to update category. Please try again.")
    }
  }

  const handleBack = () => {
    navigate("/platform-management")
  }

  if (loading) {
    return (
      <div className="platform-layout">
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
              className="nav-item active"
              onClick={(e) => {
                e.preventDefault()
                navigate("/platform-management")
              }}
            >
              <img src={category || "/placeholder.svg"} className="icon" alt="Categories" />
              <span>Categories</span>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                navigate("/platform-profile")
              }}
            >
              <img src={circle_person || "/placeholder.svg"} className="icon" alt="My Profile" />
              <span>My Profile</span>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                navigate("/report")
              }}
            >
              <img src={reportS || "/placeholder.svg"} className="icon" alt="Reports" />
              <span>Reports</span>
            </a>
          </nav>

          <div className="logout-container">
            <a
              href="#"
              className="logout-link"
              onClick={(e) => {
                e.preventDefault()
                navigate("/Logout")
              }}
            >
              <img src={logout || "/placeholder.svg"} alt="Logout" className="logout-icon" />
              <span>Log Out</span>
            </a>
          </div>
        </div>
        <div className="main-content">
          <header className="platform-header">
            <div className="greeting">
              <h2>
                Hi, {user?.first_name || "User"}{" "}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </h2>
            </div>

            <div className="user-profile">
              <div className="user-info">
                <img src={circle_person || "/placeholder.svg"} alt="profile icon" />
                <div className="user-details">
                  <div className="user-name">{user?.first_name || "User"}</div>
                  <div className="user-email">{user?.email || "user@example.com"}</div>
                </div>
              </div>
            </div>
          </header>
          <div className="platform-content">
            <h1 className="platform-title">Categories &gt; Edit Category</h1>
            <div className="loading-indicator">Loading category data...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="platform-layout">
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
            className="nav-item active"
            onClick={(e) => {
              e.preventDefault()
              navigate("/platform-management")
            }}
          >
            <img src={category || "/placeholder.svg"} className="icon" alt="Categories" />
            <span>Categories</span>
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/platform-profile")
            }}
          >
            <img src={circle_person || "/placeholder.svg"} className="icon" alt="My Profile" />
            <span>My Profile</span>
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/report")
            }}
          >
            <img src={reportS || "/placeholder.svg"} className="icon" alt="Reports" />
            <span>Reports</span>
          </a>
        </nav>

        <div className="logout-container">
          <a
            href="#"
            className="logout-link"
            onClick={(e) => {
              e.preventDefault()
              navigate("/Logout")
            }}
          >
            <img src={logout || "/placeholder.svg"} alt="Logout" className="logout-icon" />
            <span>Log Out</span>
          </a>
        </div>
      </div>
       {/* Main Content */}
      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>
              Hi, {user?.first_name }{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-info">
              <img src={circle_person || "/placeholder.svg"} alt="profile icon" />
              <div className="user-details">
                <div className="user-name">{user?.first_name }</div>
                <div className="user-email">{user?.email }</div>
              </div>
            </div>
          </div>
        </header>

        <div className="platform-content">
          <h1 className="platform-title">Categories &gt; Edit Category</h1>
          <div className="category-detail-card">
            <div className="card-header">
              <h3>Categories Detail</h3>
              <div className="button-group">
                <button className="back-btn2" onClick={handleBack}>
                  Back
                </button>
                <button className="save-btn2" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-line">
                  <label>Category Name:</label>
                  <input
                    className="detail-input"
                    type="text"
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-line">
                  <label>Created On:</label>
                  <input className="detail-input" type="text" name="created_at" value={formData.created_at} readOnly />
                </div>

                <div className="form-line">
                  <label>Description:</label>
                  <textarea
                    className="detail-textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-line">
                  <label>Total Services:</label>
                  <div className="detail-value">{formData.services_count}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategory
