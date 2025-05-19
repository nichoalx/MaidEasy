import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "../utils/axiosInstance";
import "./cleanerProfile.css";
import LogoutModal from "../components/LogoutModal";

import personIcon from "../assets/circle_person.png";
import logoutIcon from "../assets/logout.png";
import userIcon from "../assets/person_icon.png";
import calendarIcon from "../assets/calender_icon.png";
import phoneIcon from "../assets/phone.png";
import mailIcon from "../assets/mail_icon.png";
import roleIcon from "../assets/circle_person.png";
import statusIcon from "../assets/green.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";

export default function CleanerProfile() {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("user_id");
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setUser(data.success);
      } catch (error) {
        console.error("Failed to load user profile:", error);
        alert("Unable to load user profile.");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="platform-layout">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
          <a
            href="#"
            className="nav-item active"
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
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/confirmed-service")
            }}
          >
            <i className="icon report-icon"></i>
            <span1><img src={confirmIcon} alt="confirm icon" />Confirmed Jobs</span1>
          </a>
        </nav>

        <div className="logout-container">
          <a
            href="#"
            className="logout-link"
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutModal(true);
            }}
          >
            <img src={logoutIcon} alt="logout icon" />
            Log Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>
              Hi, {user?.first_name || "User"} 👋
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-summary">
              <img src={personIcon} alt="icon" />
              <div className="user-info">
                <div className="user-name">{user?.first_name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          </div>

        </header>
        

        <div className="whiteSpace">
          <div className="platform-content">
            <h1 className="services-title7">My Profile</h1>

            <div className="profile-container">
              <div className="form-grid">

                {/* First Name */}
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-container">
                    <img src={userIcon} className="input-icon" alt="first name" />
                    <input type="text" value={user.first_name} readOnly />
                  </div>
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-container">
                    <img src={userIcon} className="input-icon" alt="last name" />
                    <input type="text" value={user.last_name} readOnly />
                  </div>
                </div>

                {/* DOB */}
                <div className="form-group">
                  <label>Date of Birth</label>
                  <div className="input-container">
                    <img src={calendarIcon} className="input-icon" alt="dob" />
                    <input type="text" value={user.dob} readOnly />
                  </div>
                </div>

                {/* Contact Number */}
                <div className="form-group">
                  <label>Contact Number</label>
                  <div className="input-container">
                    <img src={phoneIcon} className="input-icon" alt="contact number" />
                    <input type="text" value={user.contact_number} readOnly />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group full-width">
                  <label>Email</label>
                  <div className="input-container15">
                    <img src={mailIcon} className="input-icon" alt="email" />
                    <input type="text" value={user.email} readOnly />
                  </div>
                </div>

                {/* Role */}
                <div className="form-group">
                  <label>Role</label>
                  <div className="input-container">
                    <img src={roleIcon} className="role-icon" alt="role" />
                    <input type="text" value={user.profile_name || "Cleaner"} readOnly />
                  </div>
                </div>

                {/* Status */}
                <div className="form-group">
                  <label>Status</label>
                  <div className="input-container">
                    <img src={statusIcon} className="status-icon" alt="status" />
                    <input type="text" value={user.is_active ? "Active" : "Inactive"} readOnly />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onConfirm={async () => {
            try {
              await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } catch (err) {
              console.warn("Logout request failed", err);
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("role");
            localStorage.removeItem("isLoggedIn");

            navigate("/");
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
