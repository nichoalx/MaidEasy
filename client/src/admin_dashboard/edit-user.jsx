"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"
import axios from "../utils/axiosInstance"

import person_icon from "../assets/person_icon.png"
import calendar_icon from "../assets/calender_icon.png"
import mail_icon from "../assets/mail_icon.png"
import circle_person from "../assets/circle_person.png"
import logout from "../assets/logout.png"
import Vector from "../assets/Vector.png"
import Human from "../assets/Human.png"

function EditUser() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    role: "",
    status: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`/api/users/${userId}`)
        setFormData({
          firstName: data.success.first_name,
          lastName: data.success.last_name,
          dateOfBirth: data.success.dob,
          contactNumber: data.success.contact_number,
          email: data.success.email,
          role: data.success.profile_name,
          status: data.success.is_active ? "Active" : "Suspended",
        })
      } catch (err) {
        console.error("Failed to fetch user data", err)
        alert("Failed to load user data")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/update/${userId}`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dateOfBirth,
        contact_number: formData.contactNumber,
        email: formData.email,
        role_name: formData.role,
        is_active: formData.status.toLowerCase() === "active"
      })
      setToast({ show: true, message: "User updated successfully!", type: "success" })
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" })
        navigate("/dashboard", { state: { page: "account" } })
      }, 2000)
    } catch (err) {
      console.error("Failed to update user", err)
      alert("Update failed")
    }
  }

  if (loading) return <div className="dashboard-content">Loading user data...</div>

  return (
    <div className="dashboard-layout">
      <div className="app-container">
        <div className="sidebar">
          <div className="logo-container">
            <h1 className="logo">Garuda<br />Indonesia</h1>
          </div>
          <nav className="nav-menu">
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "profile" } })}>
              <img src={circle_person} alt="Profile" className="icon" />
              <span>My Profile</span>
            </a>
            <a href="#" className="nav-item active" onClick={() => navigate("/dashboard", { state: { page: "account" } })}>
              <img src={Vector} alt="Account" className="icon" />
              <span>Account Management</span>
            </a>
            <a href="#" className="nav-item" onClick={() => navigate("/dashboard", { state: { page: "profileManagement" } })}>
              <img src={Human} alt="Profile Management" className="icon" />
              <span>Profile Management</span>
            </a>
          </nav>
          <div className="logout-container">
            <a href="#" className="logout-link" onClick={() => navigate("/")}>Log Out</a>
          </div>
        </div>

        <div className="main-content">
          <header className="header">
            <div className="greeting">
              <h2>Hi, Admin Ganteng 👋</h2>
            </div>
            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">Admin Ganteng</div>
                <div className="user-email">admin@example.com</div>
              </div>
            </div>
          </header>

          <div className="dashboard-content">
            <h1 className="dashboard-title">User Account &gt; Edit Account</h1>
            <div className="large-card">
              <div className="card-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Personal Information</h2>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => navigate("/dashboard", { state: { page: "account" } })} className="btn-cancel">Cancel</button>
                  <button onClick={handleSave} className="btn-save">Save</button>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <div className="input-container">
                      <img src={person_icon} alt="Person" className="input-icon" />
                      <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="input-container">
                      <img src={person_icon} alt="Person" className="input-icon" />
                      <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <div className="input-container">
                      <img src={calendar_icon} alt="Calendar" className="input-icon" />
                      <input type="text" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <div className="input-container">
                      <input type="text" id="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                      <img src={mail_icon} alt="Email" className="input-icon" />
                      <input type="email" id="email" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <div className="input-container">
                      <input type="text" id="role" value={formData.role} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="input-container">
                      <span className={`status-indicator ${formData.status.toLowerCase()}`}></span>
                      <input type="text" id="status" value={formData.status} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default EditUser
