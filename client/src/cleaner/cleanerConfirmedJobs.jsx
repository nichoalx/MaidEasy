import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import "./cleaner.css";
import "./detailJob.css";

import personIcon from "../assets/circle_person.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";

export default function ConfirmedJobs() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const res = await axios.get(`/api/users/${userId}`, { withCredentials: true });
        setUser(res.data.success);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        alert("Failed to load user data.");
      }
    };

    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`/api/cleaner/view_job_details/${id}`, {
          withCredentials: true
        });
        setBooking(res.data.booking[0]);
      } catch (err) {
        console.error("Failed to fetch job details:", err);
        alert("Unable to load job details.");
      }
    };

    fetchUser();
    fetchJobDetails();
  }, [id]);

  if (!booking || !user) return <p>Loading job details...</p>;

  return (
    <div className="platform-layout">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/cleaner-profile"); }}>
            <i className="icon grid-icon"></i>
            <span><img src={personIcon} alt="person icon" />My Profile</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate("/cleaning-services"); }}>
            <i className="icon profile-icon"></i>
            <span><img src={cleaningserviceIcon} alt="icon" />Cleaning Services</span>
          </a>
          <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); navigate("/confirmed-service"); }}>
            <i className="icon report-icon"></i>
            <span><img src={confirmIcon} alt="confirm icon" />Confirmed Jobs</span>
          </a>
        </nav>

        <div className="logout-container">
          <a className="logout-link" onClick={() => navigate("/Logout")}>
            <img src={logoutIcon} alt="logout" /><span>Log Out</span>
          </a>
        </div>
      </div>

      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>Hi, {user.first_name} 👋</h2>
          </div>
          <div className="user-profile">
            <img src={personIcon} alt="user icon" />
            <div className="user-details">
              <div className="user-name">{user.first_name} {user.last_name}</div>
              <div className="user-email">{user.email}</div>
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
                <h1 className="detailTitle">Job #{booking.booking_id}</h1>
                <button className="backButton" onClick={() => navigate("/confirmed-service")}>Back</button>
              </div>

              <div className="section">
                <h2 className="sectionTitle">Service Details</h2>
                <div className="infoGrid">
                  <p className="infoLabel">Service Name:</p>
                  <p className="infoValue">{booking.service_name}</p>

                  <p className="infoLabel">Category:</p>
                  <p className="infoValue">{booking.service_category}</p>

                  <p className="infoLabel">Price:</p>
                  <p className="infoValue">${booking.price}</p>
                </div>
              </div>

              <div className="section">
                <h2 className="sectionTitle">Homeowner Details</h2>
                <div className="infoGrid">
                  <p className="infoLabel">Name:</p>
                  <p className="infoValue">{booking.homeowner_name}</p>

                  <p className="infoLabel">Phone:</p>
                  <p className="infoValue">{booking.homeowner_phone || "N/A"}</p>
                </div>
              </div>

              <div className="section">
                <h2 className="sectionTitle">Booking Time</h2>
                <p className="infoValue">{new Date(booking.booking_date).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
