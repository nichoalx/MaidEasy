"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./dashstyle.css"
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




function ViewUser() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const handleLogout = (e) => {
    e.preventDefault()
    navigate("/")
  }

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setUserData({
          id: data.success.user_id,
          firstName: data.success.first_name,
          lastName: data.success.last_name,
          dateOfBirth: data.success.dob,
          contactNumber: data.success.contact_number,
          email: data.success.email,
          role: data.success.profile_name,
          status: data.success.is_active ? "Active" : "Suspended",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleBack = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/edit-user/${userId}`)
  }

  if (loading) {
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

            <div className="dashboard-content">
              <h1 className="dashboard-title">User Account &gt; View Account</h1>
              <div className="loading-indicator">Loading user data...</div>
            </div>
          </div>
        </div>
    )
  }

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

              <div className="user-profile">
                <img src={circlePersonIcon} alt="user icon" />
                <div className="user-details">
                  <div className="user-name">Admin Ganteng</div>
                  <div className="user-email">admin@example.com</div>
                </div>
              </div>
            </header>


              <h1 className="platform-title30">User Account &gt; View Account</h1>
                <div className="newServiceWrapper4">
                <div className="newSerViceContainer4">
                  <div className="card-header2">
                    <h3>Personal Information</h3>
                    <div className="button-group2">
                      <button className="back-btn2" onClick={handleBack}>Back</button>
                      <button className="edit-btn2" onClick={handleEdit}>Edit</button>
                    </div>
                  </div>

                  <div className="profile-container3">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>First Name</label>
                        <div className="input-container">
                          <img src={personIcon} className="input-icon" alt="first name" />
                          <input type="text" id="firstName" value={userData.firstName} readOnly />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <div className="input-container">
                          <img src={personIcon} className="input-icon" alt="last name" />
                          <input type="text" id="lastName" value={userData.lastName} readOnly />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <div className="input-container">
                          <img src={calendarIcon} className="input-icon" alt="dob" />
                          <input type="text" id="dateOfBirth" value={userData.dateOfBirth} readOnly />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Contact Number</label>
                        <div className="input-container">
                           <img src={phoneIcon} className="input-icon" alt="contact number" />
                          <input type="text" id="contactNumber" value={userData.contactNumber} readOnly />
                        </div>
                      </div>
                    </div>  


                    <div className="form-row full-width">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-container15">
                          <img src={mailIcon} className="input-icon4" alt="email" />
                          <input type="email" id="email" value={userData.email} readOnly />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Role</label>
                        <div className="input-container">
                          <img src={roleIcon} className="role-icon" alt="role" />
                          <input type="text" id="role" value={userData.role} readOnly />
                        </div>
                      </div>


                      <div className="form-group">
                        <label>Status</label>
                        <div className="input-container87">
                          <span className={`status-indicator ${userData.status.toLowerCase()}`}></span>
                          <input type="text" id="status" value={userData.status} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

          </div>
        </div>
      </div>

  )
}

export default ViewUser