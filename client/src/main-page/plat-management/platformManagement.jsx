"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./platform-style.css"
import logout from "../../assets/logout.png"

function PlatformManagement() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBy, setSearchBy] = useState("Categories")
  const [searchByOpen, setSearchByOpen] = useState(false)
  const [showingCount, setShowingCount] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [categories, setCategories] = useState([
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
  ])
  const [filteredCategories, setFilteredCategories] = useState([])

  useEffect(() => {
    let results = [...categories]

    if (searchTerm) {
      switch (searchBy) {
        case "Categories":
          results = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
          break
        case "ID":
          results = categories.filter((category) => category.id.toString().includes(searchTerm))
          break
        case "Description":
          results = categories.filter((category) =>
            category.description.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          break
        default:
          results = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
      }
    }

    setFilteredCategories(results)
  }, [searchTerm, searchBy, categories])

  // Initialize filteredCategories with all categories on component mount
  useEffect(() => {
    setFilteredCategories(categories)
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleView = (category) => {
    navigate(`/view-category/${category.id}`)
  }

  const handleEdit = (category) => {
    navigate(`/edit-category/${category.id}`)
  }

  const handleDelete = (category) => {
    setCurrentCategory(category)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== currentCategory.id))
    setShowDeleteModal(false)
  }

  const handleAddNew = () => {
    setShowAddModal(true)
  }

  const handleAddCategory = (newCategory) => {
    const id = categories.length > 0 ? Math.max(...categories.map((cat) => cat.id)) + 1 : 1
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    const categoryToAdd = {
      id,
      name: newCategory.name,
      createdOn: formattedDate,
      services: 0,
      description: newCategory.description,
    }

    setCategories([...categories, categoryToAdd])
    setShowAddModal(false)
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
          <h1 className="platform-title">Categories</h1>

          <div className="platform-controls">
            <div className="search-section">
              <div className="keyword-section">
                <div className="search-header">
                  <label>Keyword</label>
                  <div className="search-by-container">
                    <label className="search-by-label">Search By</label>
                    <div className="search-by-dropdown">
                      <div className="search-by-selected" onClick={() => setSearchByOpen(!searchByOpen)}>
                        <span className="dropdown-arrow">▼</span>
                      </div>
                      {searchByOpen && (
                        <div className="search-by-options">
                          <div
                            className={`search-by-option ${searchBy === "Categories" ? "active" : ""}`}
                            onClick={() => {
                              setSearchBy("Categories")
                              setSearchByOpen(false)
                            }}
                          >
                            Categories
                          </div>
                          <div
                            className={`search-by-option ${searchBy === "ID" ? "active" : ""}`}
                            onClick={() => {
                              setSearchBy("ID")
                              setSearchByOpen(false)
                            }}
                          >
                            Service ID
                          </div>
                          <div
                            className={`search-by-option ${searchBy === "Description" ? "active" : ""}`}
                            onClick={() => {
                              setSearchBy("Description")
                              setSearchByOpen(false)
                            }}
                          >
                            Description
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder={`Search by ${searchBy}`}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                  />
                </div>
              </div>

              <div className="showing-section">
                <label>Showing :</label>
                <select
                  value={showingCount}
                  onChange={(e) => setShowingCount(Number(e.target.value))}
                  className="showing-select"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <button className="add-button" onClick={handleAddNew}>
                + Add New Categories
              </button>
            </div>

            <div className="results-info">Showing of {filteredCategories.length} Results</div>
          </div>

          <div className="categories-table-container">
            <table className="categories-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categories</th>
                  <th>
                    Created On <span className="sort-icon">▼</span>
                  </th>
                  <th>No. Services</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.createdOn}</td>
                    <td>{category.services}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="view-btn" onClick={() => handleView(category)}>
                          View
                        </button>
                        <button className="edit-btn" onClick={() => handleEdit(category)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(category)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div></div>
            <button className="next-btn">Next &gt;</button>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && <AddCategoryModal onClose={() => setShowAddModal(false)} onAdd={handleAddCategory} />}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentCategory && (
        <DeleteConfirmModal
          category={currentCategory}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}

function AddCategoryModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container add-modal">
        <h2>Create New Categories</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Categories Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Car Wash"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Categories Descriptions"
              rows={4}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="create-btn">
              Create Categories
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeleteConfirmModal({ category, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <h2>Confirm Delete</h2>
        <p className="delete-message">Are you sure you want delete?</p>

        <div className="category-info">
          <div className="info-row">
            <span className="info-label">Categories: </span>
            <span className="info-value">{category.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Created On: </span>
            <span className="info-value">{category.createdOn}</span>
          </div>
          <div className="info-row">
            <span className="info-label">No. Services: </span>
            <span className="info-value">{category.services}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Description: </span>
            <span className="info-value">{category.description}</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="delete-confirm-btn" onClick={onConfirm}>
            Delete
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlatformManagement
