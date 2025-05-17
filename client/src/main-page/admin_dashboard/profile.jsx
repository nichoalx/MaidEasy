import React, { useState, useEffect } from 'react';
import axios from "../../utils/axiosInstance";
import visibility_on from "../../assets/visibility_on.png";
import visibility_off from "../../assets/visibility_off.png";

function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <main className="profile-content">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="input-container">
              <input type="text" id="firstName" value={user.first_name} readOnly />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="input-container">
              <input type="text" id="lastName" value={user.last_name} readOnly />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <div className="input-container">
              <input type="text" id="dob" value={user.dob} readOnly />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <div className="input-container">
              <input type="text" id="contactNumber" value={user.contact_number} readOnly />
            </div>
          </div>
        </div>

        <div className="form-row full-width">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input type="email" id="email" value={user.email} readOnly />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <div className="input-container">
              <input type="text" id="role" value={user.profile_name || "admin"} readOnly />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <div className="input-container">
              <span className={`status-indicator ${user.is_active ? "active" : "inactive"}`}></span>
              <input type="text" id="status" value={user.is_active ? "Active" : "Inactive"} readOnly />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
