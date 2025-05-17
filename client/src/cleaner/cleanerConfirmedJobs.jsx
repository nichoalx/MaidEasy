import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./cleaner.css"; // using existing styles
import "./detailJob.css";
import personIcon from "../assets/circle_person.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png"
import confirmIcon from "../assets/confirmed.png"

export default function ConfirmedJobs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="platform-layout">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/cleaner-profile")
            }}
          >
            <i className="icon grid-icon"></i>
            <span1><img src={personIcon} alt="person icon" />My Profile</span1>
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/cleaning-services")
            }}
          >
            <i className="icon profile-icon"></i>
            <span><img src={cleaningserviceIcon} alt="person icon" />Cleaning Services</span>
          </a>
          <a
            href="#"
            className="nav-item active"
            onClick={(e) => {
              e.preventDefault()
              navigate("/confirmed-jobs")
            }}
          >
            <i className="icon report-icon"></i>
            <span1><img src={confirmIcon} alt="confirm icon" />Confirmed Jobs</span1>
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