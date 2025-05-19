"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../utils/axiosInstance"
import "./platform-style.css"
import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";
import searchIcon from "../assets/Search.png";
import arrowIcon from "../assets/arrow.png";

function PlatformManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showingCount, setShowingCount] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category/view_all", { withCredentials: true });
        const formatted = res.data.success.map((c) => ({
          id: c.category_id,
          name: c.category_name,
          description: c.description,
          services: c.services || 0,
          createdOn: new Date(c.created_at).toLocaleDateString("en-GB"),
        }));
        setCategories(formatted);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const sorted = [...categories].sort((a, b) => {
      const [dayA, monthA, yearA] = a.createdOn.split("/").map(Number);
      const [dayB, monthB, yearB] = b.createdOn.split("/").map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return isAscending ? dateA - dateB : dateB - dateA;
    });
    const filtered = sorted.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [categories, isAscending, searchTerm]);

  const indexOfLastItem = currentPage * showingCount;
  const indexOfFirstItem = indexOfLastItem - showingCount;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / showingCount));

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage((prev) => prev + 1); };
  const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage((prev) => prev - 1); };
  const toggleSortOrder = () => setIsAscending((prev) => !prev);
  const handleAddNew = () => setShowAddModal(true);
  const handleDelete = (category) => { setCurrentCategory(category); setShowDeleteModal(true); };
  const handleView = (category) => navigate(`/view-category/${category.id}`);
  const handleEdit = (category) => navigate(`/edit-category/${category.id}`);

  const handleAddCategory = async (newCategory) => {
    try {
      await axios.post("/api/category/create", {
        category_name: newCategory.name,
        description: newCategory.description,
      }, { withCredentials: true });
      const res = await axios.get("/api/category/view_all", { withCredentials: true });
      const updated = res.data.success.map((c) => ({
        id: c.category_id,
        name: c.category_name,
        description: c.description,
        services: c.services || 0,
        createdOn: new Date(c.created_at).toLocaleDateString("en-GB"),
      }));
      setCategories(updated);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/category/delete/${currentCategory.id}`, {
        data: { category_id: currentCategory.id },
        withCredentials: true,
      });
      setCategories(categories.filter((cat) => cat.id !== currentCategory.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="platform-layout">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); navigate("/platform-management") }}>
            <span><img src={categoryIcon} alt="category icon" />Categories</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/platform-profile") }}>
            <span1><img src={personIcon} alt="person icon" />My Profile</span1>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/report") }}>
            <span><img src={reportIcon} alt="report icon" />Report</span>
          </a>
        </nav>

        <div className="logout-container">
          <a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); navigate("/Logout") }}>
            <span><img src={logoutIcon} alt="logout icon" />Log Out</span>
          </a>
        </div>
      </div>

      <div className="main-content">
        <header className="platform-header">
          <div className="greeting"><h2>Hi, Platform123 👋</h2></div>
          <div className="user-profile">
            <div className="user-info">
              <img src={personIcon} alt="person icon" />
              <div className="user-details">
                <div className="user-name">Platform123</div>
                <div className="user-email">plat123@gmail.com</div>
              </div>
            </div>
          </div>
        </header>

        <div className="whiteSpace">
          <div className="platform-content">
            <div className="platform-title-bar">
              <h1 className="platform-title">Categories</h1>
              <button className="add-button" onClick={handleAddNew}>+ Add New Categories</button>
            </div>

            <div className="platform-controls">
              <div className="search-section">
                <div className="keyword-section">
                  <label>Keyword</label>
                  <div className="search-input-wrapper">
                    <input type="text" placeholder="Search by Categories" value={searchTerm} onChange={handleSearch} className="search-input" />
                    <i className="search-icon"><img src={searchIcon} alt="search icon" /></i>
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
                        Created On <img src={arrowIcon} alt="arrow icon" className={isAscending ? "arrow-up" : "arrow-down"} />
                      </span>
                    </th>
                    <th>No. Services</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? currentItems.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.createdOn}</td>
                      <td>{category.services}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn" onClick={() => navigate(`/view-category/${category.id}`)}>View</button>
                          <button className="edit-btn" onClick={() => navigate(`/edit-category/${category.id}`)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(category)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr className="empty-placeholder-row">
                      <td colSpan="5">No categories found.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="paginationBar">
                <div className="paginationSection left">
                  {currentPage > 1 && (
                    <button className="prev-btn" onClick={handlePreviousPage}>&lt; Previous</button>
                  )}
                </div>
                <div className="paginationSection center">
                  <span className="page-info">Page {currentPage} of {totalPages}</span>
                </div>
                <div className="paginationSection right">
                  {currentPage < totalPages && (
                    <button className="next-btn" onClick={handleNextPage}>Next &gt;</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && <AddCategoryModal onClose={() => setShowAddModal(false)} onAdd={handleAddCategory} />}
      {showDeleteModal && currentCategory && (
        <DeleteConfirmModal category={currentCategory} onCancel={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
}

function AddCategoryModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="platform-layout modal-overlay">
      <div className="modal-container add-category-modal">
        <h2 className="addCategoryTitle">Create New Categories</h2>
        <form onSubmit={handleSubmit}>
          <div className="addCategoryGroup">
            <label className="addCategoryLabel">Categories Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Categories Name" className="addCategoryInput" required />
          </div>
          <div className="addCategoryGroup">
            <label className="addCategoryLabel">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter Categories Descriptions" rows={4} className="addCategoryTextArea" />
          </div>
          <div className="addAction">
            <button type="submit" className="categoryButton">Create Categories</button>
            <button type="button" className="categoryCancelButton" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ category, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <h2>Confirm Delete</h2>
        <p className="delete-message">Are you sure you want delete?</p>
        <div className="category-info">
          <div className="info-row"><span className="info-label">Categories:</span><span className="info-value">{category.name}</span></div>
          <div className="info-row"><span className="info-label">Created On:</span><span className="info-value">{category.createdOn}</span></div>
          <div className="info-row"><span className="info-label">No. Services:</span><span className="info-value">{category.services}</span></div>
          <div className="info-row"><span className="info-label">Description:</span><span className="info-value">{category.description}</span></div>
        </div>
        <div className="modal-actions">
          <button className="delete-confirm-btn" onClick={onConfirm}>Delete</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PlatformManagement;
