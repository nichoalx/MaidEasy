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

function ViewCategory() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState({
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
          setCategoryData({
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

  const handleBack = () => {
    navigate("/platform-management")
  }

  const handleEdit = () => {
    navigate(`/edit-category/${categoryId}`)
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
          <h1 className="platform-title2">Categories &gt; View Category</h1>

          {loading ? (
            <div className="loading-indicator">Loading category data...</div>
          ) : (
            <div className="category-detail-card">
              <div className="card-header">
                <h3>Categories Detail</h3>
                <div className="button-group">
                  <button className="back-btn2" onClick={handleBack}>
                    Back
                  </button>
                  <button className="edit-btn2" onClick={handleEdit}>
                    Edit
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="form-line">
                  <label>Category Name:</label>
                  <div className="detail-input">{categoryData.category_name}</div>
                </div>

                <div className="form-line">
                  <label>Created On:</label>
                  <div className="detail-input">{categoryData.created_at}</div>
                </div>

                <div className="form-line">
                  <label>Description:</label>
                  <div className="detail-textarea">{categoryData.description}</div>
                </div>

                <div className="form-line">
                  <label>Total Services:</label>
                  <div className="detail-value">{categoryData.services_count}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewCategory
