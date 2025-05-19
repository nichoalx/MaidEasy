"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./dashstyle.css";
import logout from "../assets/logout.png";
import circlePersonIcon from "../assets/circle_person.png"
import vectorIcon from "../assets/Vector.png"
import humanIcon from "../assets/Human.png"
import axios from "../utils/axiosInstance";
import Toast from "./components/Toast";

function EditProfile() {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [formData, setFormData] = useState({
    role_name: "",
    has_booking_permission: false,
    has_listing_permission: false,
    has_view_analytics_permission: false,
  });

  const [errors, setErrors] = useState({});
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

      setFormData({
        role_name: profile.role_name || "",
        has_booking_permission: profile.has_booking_permission || false,
        has_listing_permission: profile.has_listing_permission || false,
        has_view_analytics_permission: profile.has_view_analytics_permission || false,
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckbox = (key) => {
    setFormData({ ...formData, [key]: !formData[key] });
  };
const handleBack = () => navigate("/dashboard", { state: { page: "profileManagement" } });
const handleLogout = (e) => {
  e.preventDefault();
  navigate("/");
};
  const validateForm = () => {
    const newErrors = {};
    if (!formData.role_name.trim()) newErrors.role_name = "Role name is required";
    if (
      !formData.has_booking_permission &&
      !formData.has_listing_permission &&
      !formData.has_view_analytics_permission
    ) {
      newErrors.permissions = "At least one permission must be selected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSave = async () => {
  if (!validateForm()) return;

  const { role_name, has_booking_permission, has_listing_permission, has_view_analytics_permission } = formData;

  const payload = {
    role_name,
    has_booking_permission,
    has_listing_permission,
    has_view_analytics_permission,
  };

  try {
    await axios.put(`/api/profiles/update/${profileId}`, payload);
    navigate(-1);
  } catch (err) {
    const serverMessage = err.response?.data?.success?.error;
    const fallback = "Failed to update profile";

    console.error("Update failed", err);
    alert(serverMessage || fallback);
  }
};


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
              className="nav-item"
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
              className="nav-item active"
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

            <div className="user-summary">
              <img src={circlePersonIcon} alt="user icon" />
              <div className="user-info">
                <div className="user-name">Admin Ganteng</div>
                <div className="user-email">admin@example.com</div>
              </div>
            </div>
          </header>

              <h1 className="platform-title30">User Account &gt; Edit Account</h1>
                <div className="newServiceWrapper4">
                <div className="newSerViceContainer5">
                  <div className="card-header2">
                    <h3>Personal Information</h3>
                    <div className="button-group2">
                      <button className="back-btn2" onClick={handleBack}>Back</button>
                      <button className="save-btn2" onClick={handleSave}>Save</button>
                    </div>
                  </div>

                  <div className="profile-container4">
                    <div className="form-row full-width">
                      <div className="form-group">
                        <label>Role Name</label>
                        <div className="input-container">
                          <input
                            type="text"
                            id="role_name"
                            value={formData.role_name}
                            onChange={handleChange}
                          />
                          {errors.role_name && <span className="error">{errors.role_name}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-row full-width">
                      <div className="form-group">
                        <label className="add-profile-label">Permissions</label>
                        {errors.permissions && <span className="error">{errors.permissions}</span>}
                        <div className="add-profile-permissions">
                          <label className="add-profile-radio2">
                            <input
                              type="checkbox"
                              checked={formData.has_booking_permission}
                              onChange={() => handleCheckbox("has_booking_permission")}
                            />
                            <span>Book Permission</span>
                          </label>
                          <label className="add-profile-radio2">
                            <input
                              type="checkbox"
                              checked={formData.has_listing_permission}
                              onChange={() => handleCheckbox("has_listing_permission")}
                            />
                            <span>Listing Permission</span>
                          </label>
                          <label className="add-profile-radio2">
                            <input
                              type="checkbox"
                              checked={formData.has_view_analytics_permission}
                              onChange={() => handleCheckbox("has_view_analytics_permission")}
                            />
                            <span>View Analytics Permission</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Users</label>
                        <div className="input-container">
                          <input type="text" value={`${formData.users} Active Users`} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

 
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default EditProfile;
