"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./platform-style.css"
import logout from "../../assets/logout.png"
import reportS from "../../assets/report.png"
import category from "../../assets/category.png"
import circle_person from "../../assets/circle_person.png"

function ViewCategory() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [loading, setLoading] = useState(true)
  const [categoryData, setcategoryData] = useState({
    name: "",
    description: "",
    createdOn: "",
    services: 0,
  })

  // Mock categories data
  const categoriesData = [
    {
      id: 1,
      name: "Floor Cleaning",
      createdOn: "01/12/2001",
      services: 120,
      description: "Professional floor cleaning services for all types of flooring",
    },
    {
      id: 2,
      name: "Chair",
      createdOn: "02/10/2002",
      services: 100,
      description: "Chair cleaning and maintenance services",
    },
    {
      id: 3,
      name: "Rooftop",
      createdOn: "03/12/2010",
      services: 10,
      description: "Rooftop cleaning and maintenance services",
    },
  ]

  useEffect(() => {
    // Simulate API call to fetch category data
    setLoading(true)
    setTimeout(() => {
      const category = categoriesData.find((c) => c.id === Number(categoryId))
      if (category) {
        setcategoryData({
          name: category.name,
          description: category.description,
          createdOn: category.createdOn,
          services: category.services,
        })
      }
      setLoading(false)
    }, 500)
  }, [categoryId])

  const handleBack = () => {
    navigate("/platform-management")
  }

  const handleEdit = () => {
    navigate(`/edit-category/${categoryId}`)
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
            <a href="#" className="nav-item active">
              <img src={category || "/placeholder.svg"} className="icon" />
              <span>Categories</span>
            </a>
            <a href="#" className="nav-item">
            <img src={circle_person || "/placeholder.svg"} className="icon" alt="My Profile" />
              <span>My Profile</span>
            </a>
            <a href="#" className="nav-item">
              <img src={reportS || "/placeholder.svg"} className="icon report-icon"></img>
              <span>Reports</span>
            </a>
          </nav>

          <div className="logout-container">
            <a href="#" className="logout-link">
              <i className="icon logout-icon"></i>
              <span>Log Out</span>
            </a>
          </div>
        </div>

        <div className="main-content">
          <header className="platform-header">
            <div className="greeting">
              <h2>
                Hi, Platform123{" "}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </h2>
            </div>

            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">Platform123</div>
                <div className="user-email">plat123@gmail.com</div>
              </div>
              <div className="user-avatar">
                <i className="icon user-icon"></i>
              </div>
            </div>
          </header>

          <div className="platform-content">
            <h1 className="platform-title">Categories &gt; View Category</h1>
            <div className="loading-indicator">Loading category data...</div>
          </div>
        </div>
      </div>
    )
  }

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
              navigate("/")
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
              Hi, Platform123{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Platform123</div>
              <div className="user-email">plat123@gmail.com</div>
            </div>
            <div className="user-avatar">
              <i className="icon user-icon"></i>
            </div>
          </div>
        </header>

        <div className="platform-content">
          <h1 className="platform-title">Categories &gt; View Category</h1>

          <div className="category-detail-card">
            <div className="card-header">
              <h3>Categories Detail</h3>
              <div className="button-group">
                <button className="back-btn" onClick={handleBack}>
                  Back
                </button>
                <button className="edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Category Name:</label>
                <div className="detail-input">{categoryData.name}</div>
              </div>
              <div className="form-group">
                <label>Created On:</label>
                <div className="detail-input">{categoryData.createdOn}</div>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <div className="detail-textarea">{categoryData.description}</div>
              </div>
              <div className="form-group">
                <label>Total Services:</label>
                <div className="detail-value">{categoryData.services}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCategory
