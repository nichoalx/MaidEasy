"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./platform-style.css"
import axios from "../utils/axiosInstance"

// Import icons
import category from "../assets/category.png"
import circle_person from "../assets/circle_person.png"
import reportS from "../assets/report.png"
import logout from "../assets/logout.png"
import searchIcon from "../assets/Search.png"
import arrowIcon from "../assets/arrow.png"

function PlatformManagement() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [showingCount, setShowingCount] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isAscending, setIsAscending] = useState(true)

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

  // Filter categories based on search term
  useEffect(() => {
    const results = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCategories(results)
    setCurrentPage(1)
  }, [searchTerm, categories])

  // Reset page when showing count changes
  useEffect(() => {
    setCurrentPage(1)
  }, [showingCount])

  // Sort categories
  useEffect(() => {
    const sorted = [...categories].sort((a, b) => {
      const [dayA, monthA, yearA] = a.createdOn.split("/").map(Number)
      const [dayB, monthB, yearB] = b.createdOn.split("/").map(Number)

      const dateA = new Date(yearA, monthA - 1, dayA)
      const dateB = new Date(yearB, monthB - 1, dayB)

      return isAscending ? dateA - dateB : dateB - dateA
    })

    const filtered = sorted.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setFilteredCategories(filtered)
    setCurrentPage(1)
  }, [categories, isAscending, searchTerm])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/view_all")
        if (response.data && response.data.success) {
          setCategories(response.data.success)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const indexOfLastItem = currentPage * showingCount
  const indexOfFirstItem = indexOfLastItem - showingCount
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / showingCount))

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const handleView = (category) => navigate(`/view-category/${category.id}`)

  const handleEdit = (category) => navigate(`/edit-category/${category.id}`)

  const handleDelete = (category) => {
    setCurrentCategory(category)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/api/category/delete/${currentCategory.id}`)

      if (response.data && response.data.success) {
        // Refresh the categories list
        const categoriesResponse = await axios.get("/api/category/view_all")
        if (categoriesResponse.data && categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.success)
        }
        setShowDeleteModal(false)
      }
    } catch (error) {
      console.error("Failed to delete category:", error)
      alert("Failed to delete category. Please try again.")
    }
  }

  const handleAddNew = () => setShowAddModal(true)

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post("/api/category/create", {
        category_name: newCategory.name,
        description: newCategory.description,
      })

      if (response.data && response.data.success) {
        // Refresh the categories list
        const categoriesResponse = await axios.get("/api/category/view_all")
        if (categoriesResponse.data && categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.success)
        }
        setShowAddModal(false)
      }
    } catch (error) {
      console.error("Failed to add category:", error)
      alert("Failed to add category. Please try again.")
    }
  }

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev)
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

        <div className="whiteSpace">
          <div className="platform-content">
            <div className="platform-title-bar">
              <h1 className="platform-title">Categories</h1>
              <button className="add-button" onClick={handleAddNew}>
                + Add New Categories
              </button>
            </div>

            <div className="platform-controls">
              <div className="search-section">
                <div className="keyword-section">
                  <label>Keyword</label>
                  <div className="search-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by Categories"
                      value={searchTerm}
                      onChange={handleSearch}
                      className="search-input"
                    />
                    <i className="search-icon">
                      <img src={searchIcon || "/placeholder.svg"} alt="search icon" />
                    </i>
                  </div>
                </div>
                <button className="searchButton">Search</button>
              </div>

              <div className="results-info">Showing {filteredCategories.length} Results</div>
            </div>

            <div className="categories-table-container">
              <table className="categories-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Categories</th>
                    <th onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
                      <span className="header-with-icon">
                        Created On{" "}
                        <img
                          src={arrowIcon || "/placeholder.svg"}
                          alt="arrow icon"
                          className={isAscending ? "arrow-up" : "arrow-down"}
                        />
                      </span>
                    </th>
                    <th>No. Services</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((category) => (
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
                    ))
                  ) : (
                    <tr className="empty-placeholder-row">
                      <td>10</td>
                      <td>Garden Maintenance</td>
                      <td>03/02/2021</td>
                      <td>28</td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn" onClick={() => alert("Viewing Garden Maintenance")}>
                            View
                          </button>
                          <button className="edit-btn" onClick={() => alert("Editing Garden Maintenance")}>
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => alert("Deleting Garden Maintenance")}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="paginationBar">
                <div className="paginationSection left">
                  {currentPage > 1 && (
                    <button className="prev-btn" onClick={handlePreviousPage}>
                      &lt; Previous
                    </button>
                  )}
                </div>
                <div className="paginationSection center">
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <div className="paginationSection right">
                  {currentPage < totalPages && (
                    <button className="next-btn" onClick={handleNextPage}>
                      Next &gt;
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && <AddCategoryModal onClose={() => setShowAddModal(false)} onAdd={handleAddCategory} />}
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
  const [formData, setFormData] = useState({ name: "", description: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(formData)
  }

  return (
    <div className="platform-layout modal-overlay">
      <div className="modal-container add-category-modal">
        <h2 className="addCategoryTitle">Create New Categories</h2>
        <form onSubmit={handleSubmit}>
          <div className="addCategoryGroup">
            <label className="addCategoryLabel">Categories Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Categories Name"
              className="addCategoryInput"
              required
            />
          </div>
          <div className="addCategoryGroup">
            <label className="addCategoryLabel">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Categories Descriptions"
              rows={4}
              className="addCategoryTextArea"
            />
          </div>
          <div className="addAction">
            <button type="submit" className="categoryButton">
              Create Categories
            </button>
            <button type="button" className="categoryCancelButton" onClick={onClose}>
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
            <span className="info-label">Categories:</span>
            <span className="info-value">{category.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Created On:</span>
            <span className="info-value">{category.createdOn}</span>
          </div>
          <div className="info-row">
            <span className="info-label">No. Services:</span>
            <span className="info-value">{category.services}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Description:</span>
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
