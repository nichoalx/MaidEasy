"use client"

import { useState } from "react"
import "../modal.css"
import axios from "../../utils/axiosInstance";
import userIcon from "../../assets/person_icon.png"
import calendarIcon from "../../assets/calender_icon.png"
import phoneIcon from "../../assets/phone.png"
import mailIcon from "../../assets/mail_icon.png"
import lockIcon from "../../assets/lock_icon.png"
import roleIcon from "../../assets/circle_person.png"
import eyeIcon from "../../assets/visibility_on.png"
import eyeOffIcon from "../../assets/visibility_off.png"
import arrowIcon from "../../assets/arrow.png"

function AddAccountModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "cleaner",
    password: "",
    dateOfBirth: "",
    contactNumber: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSave = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    password: formData.password,
    dob: formData.dateOfBirth,
    contact_number: formData.contactNumber,
    role_name: formData.role,
  };

  try {
    await axios.post("/api/users/create", payload);

    // Notify parent or close modal
    onSave(payload); // optional depending on your parent behavior
  } catch (error) {
    console.error("Failed to create user:", error.response?.data || error.message);
    alert("Failed to create account. Please try again.");
  }
};

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "600px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#3e4772",
            fontSize: "40px",
            marginBottom: "25px",
            fontWeight: "600",
          }}
        >
          Add New Account
        </h1>

        <form onSubmit={handleSave}>
          <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                First Name
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50px",
                  padding: "0 15px",
                  border: errors.firstName ? "1px solid #ca3032" : "1px solid transparent",
                }}
              >
                <img src={userIcon} alt="first" className="input-icon" />            
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    height: "45px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
              {errors.firstName && <span style={{ color: "#ca3032", fontSize: "12px" }}>{errors.firstName}</span>}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                Last Name
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50px",
                  padding: "0 15px",
                  border: errors.lastName ? "1px solid #ca3032" : "1px solid transparent",
                }}
              >
                <img src={userIcon} alt="last" className="input-icon" /> 
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    height: "45px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
              {errors.lastName && <span style={{ color: "#ca3032", fontSize: "12px" }}>{errors.lastName}</span>}
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                Date of Birth
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50px",
                  padding: "0 15px",
                  border: errors.dateOfBirth ? "1px solid #ca3032" : "1px solid transparent",
                }}
              >
                <img src={calendarIcon} alt="date" className="input-icon" /> 
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    height: "45px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
              {errors.dateOfBirth && <span style={{ color: "#ca3032", fontSize: "12px" }}>{errors.dateOfBirth}</span>}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                Contact Number
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50px",
                  padding: "0 15px",
                  border: errors.contactNumber ? "1px solid #ca3032" : "1px solid transparent",
                }}
              >
                <img src={phoneIcon} alt="contact" className="input-icon" /> 
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    height: "45px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
              {errors.contactNumber && (
                <span style={{ color: "#ca3032", fontSize: "12px" }}>{errors.contactNumber}</span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>Email</label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "50px",
                padding: "0 15px",
                border: errors.email ? "1px solid #ca3032" : "1px solid transparent",
              }}
            >
              <img src={mailIcon} alt="mmail" className="input-icon" /> 
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  height: "45px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            {errors.email && <span style={{ color: "#ca3032", fontSize: "12px" }}>{errors.email}</span>}
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                Password
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50px",
                  padding: "0 15px",
                  border: errors.password ? "1px solid #ca3032" : "1px solid transparent",
                }}
              >
                <img src={lockIcon} alt="password" className="input-icon" /> 
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    height: "45px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    right: "15px",
                    marginTop: "18px",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",              
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={showPassword ? eyeOffIcon : eyeIcon}
                    alt="Toggle visibility"
                    style={{ width: "18px", height: "18px"}}
                  />
                </button>
              </div>
              {errors.password && <span style={{ color: "#ca3032", fontSize: "12px" }}>{errors.password}</span>}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>Role</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50px",
                  padding: "0 15px",
                }}
              >
                <img
                  src={roleIcon}
                  alt="role"
                  className="input-icon"
                  style={{ filter: "grayscale(100%) brightness(0) opacity(0.55)" }}
                />
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  onClick={() => setIsSelectOpen(true)}
                  onBlur={() => setIsSelectOpen(false)}
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    height: "45px",
                    fontSize: "14px",
                    outline: "none",
                    appearance: "none",
                    width: "100%",
                    paddingRight: "20px",
                  }}
                >
                  <option value="cleaner">Cleaner</option>
                  <option value="homeowner">Home Owner</option>
                  <option value="project_manager">Project Management</option>
                </select>
                <img
                  src={arrowIcon}
                  alt="arrow"
                  style={{
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    right: "10px",
                    transition: "transform 0.3s ease",
                    transform: isSelectOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#3e4772",
              color: "white",
              border: "none",
              borderRadius: "50px",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Add Account
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: "100%",
              backgroundColor: "#e8eeff",
              color: "#3e4772",
              border: "none",
              borderRadius: "50px",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddAccountModal