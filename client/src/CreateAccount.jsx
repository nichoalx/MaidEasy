import React, { useState } from "react";
import "./CreateAccount.css";

import mail_icon from "./Assets/mail_icon.png";
import lock_icon from "./Assets/lock_icon.png";
import visibility_on from "./Assets/visibility_on.png";
import visibility_off from "./Assets/visibility_off.png";
import calender_icon from "./Assets/calender_icon.png";
import circle_person_icon from "./Assets/circle_person.png";
import person_icon from "./Assets/person_icon.png";
import phone_icon from "./Assets/phone_icon.png";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);

  // Input states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    contact: "",
    email: "",
    password: "",
    role: "",
  });

  // Error states
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: false }); // clear error on change
  };

  const handleSubmit = () => {
    const newErrors = {};
    for (const field in formData) {
      if (formData[field].trim() === "") {
        newErrors[field] = true;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // All fields are filled, proceed with account creation
      alert("Account created successfully!");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="text">Create New Account</div>
      </div>

      <div className="group">
        <div className="groups same-row">
          <div className="input-pair">
            <label>First Name</label>
            <div className={`inputs ${errors.firstName ? "error" : ""}`}>
              <img src={person_icon} alt="person icon" />
              <input
                type="text"
                placeholder={errors.firstName ? "This field must be filled in!" : "First Name"}
                value={formData.firstName}
                onChange={handleChange("firstName")}
              />
            </div>
          </div>
          <div className="input-pair">
            <label>Last Name</label>
            <div className={`inputs ${errors.lastName ? "error" : ""}`}>
              <img src={person_icon} alt="person icon" />
              <input
                type="text"
                placeholder={errors.lastName ? "This field must be filled in!" : "Last Name"}
                value={formData.lastName}
                onChange={handleChange("lastName")}
              />
            </div>
          </div>
        </div>

        <div className="groups">
          <label>Date of Birth</label>
          <div className={`inputs ${errors.dob ? "error" : ""}`}>
            <img src={calender_icon} alt="calender icon" />
            <input
              type="date"
              value={formData.dob}
              onChange={handleChange("dob")}
            />
          </div>
        </div>

        <div className="groups">
          <label>Contact Number</label>
          <div className={`inputs ${errors.contact ? "error" : ""}`}>
            <img src={phone_icon} alt="phone icon" />
            <input
              type="phone"
              placeholder={errors.contact ? "This field must be filled in!" : "Phone Number"}
              value={formData.contact}
              onChange={handleChange("contact")}
            />
          </div>
        </div>

        <div className="groups same-row">
          <div className="input-pair">
            <label>Email</label>
            <div className={`inputs ${errors.email ? "error" : ""}`}>
              <img src={mail_icon} alt="email icon" />
              <input
                type="email"
                placeholder={errors.email ? "This field must be filled in!" : "your@mail.com"}
                value={formData.email}
                onChange={handleChange("email")}
              />
            </div>
          </div>
          <div className="input-pair">
            <label>Password</label>
            <div className={`inputs password-input ${errors.password ? "error" : ""}`}>
              <img src={lock_icon} alt="lock icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={errors.password ? "This field must be filled in!" : "Password"}
                value={formData.password}
                onChange={handleChange("password")}
              />
              <img
                src={showPassword ? visibility_on : visibility_off}
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                alt="Toggle visibility"
              />
            </div>
          </div>
        </div>

        <div className="groups">
          <label>Role</label>
          <div className={`inputs ${errors.role ? "error" : ""}`}>
            <img src={circle_person_icon} alt="circle person icon" />
            <select value={formData.role} onChange={handleChange("role")}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="maid">Maid</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        <button className="create-account-button" onClick={handleSubmit}>
          Create Account
        </button>
      </div>
    </div>
  );
}





