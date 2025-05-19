"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import "./platform-style.css";

import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";

function ViewCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    createdOn: "",
    services: 0,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/category/view/${categoryId}`, {
          withCredentials: true,
        });

        const data = res.data.success;
        setCategoryData({
          name: data.category_name,
          description: data.description,
          createdOn: new Date(data.created_at).toLocaleDateString("en-GB"),
        });
      } catch (error) {
        console.error("Failed to fetch category:", error);
        alert("Failed to load category details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleBack = () => navigate("/platform-management");
  const handleEdit = () => navigate(`/edit-category/${categoryId}`);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="platform-layout">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); navigate("/platform-management"); }}>
            <span><img src={categoryIcon} alt="category icon" />Categories</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/platform-profile"); }}>
            <span1><img src={personIcon} alt="person icon" />My Profile</span1>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/report"); }}>
            <span><img src={reportIcon} alt="report icon" />Report</span>
          </a>
        </nav>

        <div className="logout-container">
          <a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); navigate("/Logout"); }}>
            <span><img src={logoutIcon} alt="logout icon" />Log Out</span>
          </a>
        </div>
      </div>

      <div className="main-content">
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

        <div className="platform-content">
          <h1 className="platform-title2">Categories &gt; View Category</h1>

          <div className="category-detail-card">
            <div className="card-header">
              <h3>Category Detail</h3>
              <div className="button-group">
                <button className="back-btn2" onClick={handleBack}>Back</button>
                <button className="edit-btn2" onClick={handleEdit}>Edit</button>
              </div>
            </div>
            <div className="card-body">
              <div className="form-line">
                <label>Category Name:</label>
                <div className="detail-input">{categoryData.name}</div>
              </div>

              <div className="form-line">
                <label>Created On:</label>
                <div className="detail-input">{categoryData.createdOn}</div>
              </div>

              <div className="form-line">
                <label>Description:</label>
                <div className="detail-textarea">{categoryData.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;
