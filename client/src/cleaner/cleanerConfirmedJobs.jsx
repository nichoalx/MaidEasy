import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./cleaner.css"; // using existing styles
import "./detailJob.css";
import personIcon from "../assets/circle_person.png";
import categoryIcon from "../assets/category.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";

export default function ConfirmedJobs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="platform-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
            <a href="#" 
            className={`nav-item ${location.pathname === "/cleaner-profile" ? "active" : ""}`} 
            onClick={(e) => { e.preventDefault(); navigate("/cleaner-profile") }}>
            <span><img src={personIcon} alt="icon" />My Profile</span>
            </a>

            <a href="#" 
            className={`nav-item ${location.pathname === "/cleaning-services" ? "active" : ""}`} 
            onClick={(e) => { e.preventDefault(); navigate("/cleaning-services") }}>
            <span><img src={categoryIcon} alt="icon" />My Cleaning Services</span>
            </a>

            <a href="#" 
            className={`nav-item ${location.pathname === "/confirmed-jobs" ? "active" : ""}`} 
            onClick={(e) => { e.preventDefault(); navigate("/confirmed-jobs") }}>
            <span><img src={reportIcon} alt="icon" />Confirmed Jobs</span>
            </a>
        </nav>

        <div className="logout-container">
          <a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); navigate("/logout") }}>
            <span><img src={logoutIcon} alt="logout" />Log Out</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="platform-header">
          <div className="greeting"><h2>Hi, Cleaner 1 👋</h2></div>
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Cleaner 1</div>
              <div className="user-email">cleaner1@gmail.com</div>
            </div>
            <div className="user-avatar"></div>
          </div>
        </header>

        <div className="whiteSpace">
          <div className="platform-content">
            <div className="search-header">
                <h1 className="services-title">Confirmed Job &gt; View Details</h1>
            </div>
            <div className="detailCard">

              <div className="detailHeader">
                <h1 className="detailTitle">Job #1</h1>
                <button className="backButton">Back</button>
              </div>

              <div className="section">
                <h2 className="sectionTitle">Service Details</h2>
                <div className="serviceDetails">
                  <div className="serviceInfo">
                    <div className="infoGrid">
                      <p className="infoLabel">Service Name:</p>
                      <p className="infoValue">Window Cleaning</p>

                      <p className="infoLabel">Category:</p>
                      <p className="infoValue">Home Service</p>

                      <p className="infoLabel">Price:</p>
                      <p className="infoValue">$100</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section">
                <h2 className="sectionTitle">Home Owner Details</h2>
                <div className="infoGrid">
                  <p className="infoLabel">Name:</p>
                  <p className="infoValue">Agus</p>

                  <p className="infoLabel">Phone Number:</p>
                  <p className="infoValue">12315214</p>
                </div>
              </div>

              <div className="section">
                <h2 className="sectionTitle">Date/Time</h2>
                <p className="infoValue">15/04/2025, 10.00 AM</p>
              </div>

            </div>
          </div> 
        </div>

        
      </div>

      
    </div>
  );
}