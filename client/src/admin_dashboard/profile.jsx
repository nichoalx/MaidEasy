import React, { useState, useEffect } from 'react';
import axios from "../utils/axiosInstance";
import visibility_on from "../assets/visibility_on.png";
import visibility_off from "../assets/visibility_off.png";
import userIcon from "../assets/person_icon.png";
import calendarIcon from "../assets/calender_icon.png";
import phoneIcon from "../assets/phone.png";
import mailIcon from "../assets/mail_icon.png";
import roleIcon from "../assets/circle_person.png";
import statusIcon from "../assets/green.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";

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
    
    <div className="whiteSpace">
      <div className="profile-content">
        <h1 className="services-title7">My Profile</h1>

        <div className="profile-container">
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <div className="input-container">
                <img src={userIcon} className="input-icon" alt="first name" />
                <input type="text" id="firstName" value={user.first_name} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <div className="input-container">
                <img src={userIcon} className="input-icon" alt="last name" />
                <input type="text" id="lastName" value={user.last_name} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <div className="input-container">
                <img src={calendarIcon} className="input-icon" alt="dob" />
                <input type="text" id="dob" value={user.dob} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <div className="input-container">
                <img src={phoneIcon} className="input-icon" alt="contact number" />
                <input type="text" id="contactNumber" value={user.contact_number} readOnly />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Email</label>
              <div className="input-container15">
                <img src={mailIcon} className="input-icon97" alt="email" />
                <input type="email" id="email" value={user.email} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <div className="input-container">
                <img src={roleIcon} className="role-icon" alt="role" />
                <input type="text" id="role" value={user.profile_name || "admin"} readOnly />
              </div>
            </div>

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
  );
}

export default Profile;
