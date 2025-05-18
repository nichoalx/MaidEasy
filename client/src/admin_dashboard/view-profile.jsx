"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./dashstyle.css";
import logout from "../assets/logout.png";
import Vector from "../assets/Vector.png";
import Human from "../assets/Human.png";
import circle_person from "../assets/circle_person.png";
import axios from "../utils/axiosInstance";

function ViewProfile() {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndUsers = async () => {
      try {
        const [{ data: profileRes }, { data: usersRes }] = await Promise.all([
          axios.get(`/api/profiles/view/${profileId}`),
          axios.get("/api/users"),
        ]);

        const profile = profileRes.success;
        const userCount = usersRes.success.filter(
          (u) => u.profile_id === profile.profile_id
        ).length;

        setProfileData({
          role_name: profile.role_name,
          has_booking_permission: profile.has_booking_permission,
          has_listing_permission: profile.has_listing_permission,
          has_view_analytics_permission: profile.has_view_analytics_permission,
          users: userCount,
        });
      } catch (err) {
        console.error("Failed to load profile", err);
        alert("Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndUsers();
  }, [profileId]);

  const handleEdit = () => navigate(`/edit-profile/${profileId}`);
  const handleBack = () => navigate("/dashboard", { state: { page: "profileManagement" } });

  if (loading) return <p>Loading...</p>;

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
                setCurrentPage("profile")
              }}
            >
              <i className="icon grid-icon"></i>
              <span1><img src={circlePersonIcon} alt="person icon" />My Profile</span1>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("account")
              }}
            >
            <i className="icon profile-icon"></i>
            <span><img src={vectorIcon} alt="person icon" />Account Management</span>
            </a>
            <a
              href="#"
              className="nav-item"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage("profileManagement")
              }}
            >
            <i className="icon report-icon"></i>
            <span1><img src={humanIcon} alt="confirm icon" />Profile Management</span1>
            </a>
          </nav>

          <div className="logout-container">
            <a href="#" className="logout-link" onClick={handleLogout}>
            <img src={logout} alt="logout icon" />
            Log Out
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="platform-header">
            <div className="greeting">
              <h2>
                Hi, Admin Ganteng 👋
              </h2>
            </div>

            <div className="user-profile">
              <img src={circlePersonIcon} alt="user icon" />
              <div className="user-details">
                <div className="user-name">Admin Ganteng</div>
                <div className="user-email">admin@example.com</div>
              </div>
            </div>
          </header>

          <div className="dashboard-content">
            <h1 className="dashboard-title">Profile Management &gt; View Profile</h1>
            <div className="large-card">
              <div className="card-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Profile Information</h2>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={handleBack} style={{ backgroundColor: "#e5edff", color: "#3e4772", border: "none", borderRadius: "8px", padding: "8px 24px", fontWeight: "500", cursor: "pointer" }}>Back</button>
                  <button onClick={handleEdit} style={{ backgroundColor: "#3e4772", color: "white", border: "none", borderRadius: "8px", padding: "8px 24px", fontWeight: "500", cursor: "pointer" }}>Edit</button>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-row full-width">
                  <div className="form-group">
                    <label>Role Name</label>
                    <div className="input-container">
                      <input type="text" value={profileData.role_name} readOnly />
                    </div>
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label>Permissions</label>
                    <div className="permissions-container">
                      <label className="permission-checkbox">
                        <input type="checkbox" checked={profileData.has_booking_permission} readOnly /> Booking Permission
                      </label>
                      <label className="permission-checkbox">
                        <input type="checkbox" checked={profileData.has_listing_permission} readOnly /> Listing Permission
                      </label>
                      <label className="permission-checkbox">
                        <input type="checkbox" checked={profileData.has_view_analytics_permission} readOnly /> Analytics Permission
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Users</label>
                    <div className="input-container">
                      <input type="text" value={`${profileData.users} Active Users`} readOnly />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

  );
}

export default ViewProfile;
