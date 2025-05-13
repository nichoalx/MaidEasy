"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./platform-style.css"

function EditCategory() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
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
        setFormData({
          name: category.name,
          description: category.description,
          createdOn: category.createdOn,
          services: category.services,
        })
      }
      setLoading(false)
    }, 500)
  }, [categoryId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    // For now, just navigate back
    navigate("/platform-management")
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
            <a href="#" className="nav-item active">
              <i className="icon grid-icon"></i>
              <span>Categories</span>
            </a>
            <a href="#" className="nav-item">
              <i className="icon profile-icon"></i>
              <span>My Profile</span>
            </a>
            <a href="#" className="nav-item">
              <i className="icon report-icon"></i>
              <span>Report</span>
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
            <h1 className="platform-title">Categories &gt; Edit Category</h1>
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
            <i className="icon grid-icon"></i>
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
            <i className="icon profile-icon"></i>
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
            <i className="icon report-icon"></i>
            <span>Report</span>
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
          <h1 className="platform-title">Categories &gt; Edit Category</h1>

          <div className="category-detail-card">
            <div className="card-header">
              <h3>Categories Detail</h3>
              <div className="button-group">
                <button className="back-btn" onClick={handleBack}>
                  Back
                </button>
                <button className="save-btn" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Category Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Created On:</label>
                  <input type="text" name="createdOn" value={formData.createdOn} readOnly />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
                </div>
                <div className="form-group">
                  <label>Total Services:</label>
                  <div className="detail-value">{formData.services}</div>
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