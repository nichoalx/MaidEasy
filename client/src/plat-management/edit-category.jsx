"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import "./platform-style.css";

import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";

function EditCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    createdOn: "",
    services: 0,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`/api/category/view/${categoryId}`, { withCredentials: true });
        const data = res.data.success;
        setFormData({
          name: data.category_name,
          description: data.description,
          createdOn: new Date(data.created_at).toLocaleDateString("en-GB"),
          services: data.services || 0,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/category/update/${categoryId}`,
        {
          category_name: formData.name,
          description: formData.description,
        },
        { withCredentials: true }
      );
      alert("Category updated successfully.");
      navigate("/platform-management");
    } catch (error) {
      console.error("Failed to update category:", error);
      alert("Failed to update category.");
    }
  };

  const handleBack = () => navigate("/platform-management");

  if (loading) {
    return (
      <div className="platform-layout">
        <Sidebar navigate={navigate} />
        <div className="main-content">
          <Header />
          <div className="platform-content">
            <h1 className="platform-title">Categories &gt; Edit Category</h1>
            <div className="loading-indicator">Loading category data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-layout">
      <Sidebar navigate={navigate} />
      <div className="main-content">
        <Header />
        <div className="platform-content">
          <h1 className="platform-title">Categories &gt; Edit Category</h1>
          <div className="category-detail-card">
            <div className="card-header">
              <h3>Categories Detail</h3>
              <div className="button-group">
                <button className="back-btn2" onClick={handleBack}>Back</button>
                <button className="save-btn2" onClick={handleSubmit}>Save</button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-line">
                  <label>Category Name:</label>
                  <input className="detail-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-line">
                  <label>Created On:</label>
                  <input className="detail-input" type="text" name="createdOn" value={formData.createdOn} readOnly />
                </div>

                <div className="form-line">
                  <label>Description:</label>
                  <textarea className="detail-textarea" name="description" value={formData.description} onChange={handleChange} />
                </div>

                <div className="form-line">
                  <label>Total Services:</label>
                  <div className="detail-value">{formData.services}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ navigate }) {
  return (
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
  );
}

function Header() {
  return (
    <header className="platform-header">
      <div className="greeting">
        <h2>Hi, Platform123 👋</h2>
      </div>
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
  );
}

export default EditCategory;
