"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"
import Toast from "./components/Toast"
import axios from "../utils/axiosInstance";
import personIcon from "../assets/person_icon.png"
import calendarIcon from "../assets/calender_icon.png"
import phoneIcon from "../assets/phone.png"
import mailIcon from "../assets/mail_icon.png"
import roleIcon from "../assets/circle_person.png"
import logout from "../assets/logout.png"
import circlePersonIcon from "../assets/circle_person.png"
import vectorIcon from "../assets/Vector.png"
import humanIcon from "../assets/Human.png"

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
  const handleLogout = (e) => {
    e.preventDefault()
    navigate("/")
  }

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

  const handleBack = () => {
    navigate(-1)
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
              className="nav-item active"
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
                <div className="newSerViceContainer4">
                  <div className="card-header2">
                    <h3>Personal Information</h3>
                    <div className="button-group2">
                      <button className="back-btn2" onClick={handleBack}>Back</button>
                      <button className="save-btn2" onClick={handleSave}>Save</button>
                    </div>
                  </div>

              <div className="profile-container3">
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <div className="input-container">
                      <img src={personIcon} className="input-icon" alt="first name" />
                      <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <div className="input-container">
                      <img src={personIcon} className="input-icon" alt="last name" />
                      <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <div className="input-container">
                      <img src={calendarIcon} className="input-icon" alt="dob" />
                      <input type="text" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Contact Number</label>
                    <div className="input-container">
                      <img src={phoneIcon} className="input-icon" alt="contact number" />
                      <input type="text" id="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container15">
                      <img src={mailIcon} className="input-icon4" alt="email" />
                      <input type="email" id="email" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <div className="input-container">
                      <img src={roleIcon} className="role-icon" alt="role" />
                      <input type="text" id="role" value={formData.role} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <div className="input-container87">
                      <span className={`status-indicator ${formData.status.toLowerCase()}`}></span>
                      <input type="text" id="status" value={formData.status} onChange={handleChange} />
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
