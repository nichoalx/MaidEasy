"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Profile from "./profile"
import AccountManagement from "./accountManagement"
import ProfileManagement from "./profileManagement"
import LogoutModal from "../components/LogoutModal";
import "./dashstyle.css"
import logoutIcon from "../assets/logout.png"
import circlePersonIcon from "../assets/circle_person.png"
import vectorIcon from "../assets/Vector.png"
import humanIcon from "../assets/Human.png"
import axios from "../utils/axiosInstance";


function AdminPanel() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile")

  useEffect(() => {
    if (location.state && location.state.page) {
      setCurrentPage(location.state.page)
    }
  }, [location])
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("user_id");
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setUser(data.success);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    fetchUser();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

  return (
    <div className="platform-layout">
        <div className="sidebar">
          <div className="logo-container">
            <h1 className="logo">Garuda<br />Indonesia</h1>
          </div>

          <nav className="nav-menu">
            <a
              href="#"
              className={`nav-item ${currentPage === "profile" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("profile");
              }}
            >
              <i className="icon grid-icon"></i>
              <span><img src={circlePersonIcon} alt="person icon" /> My Profile</span>
            </a>

            <a
              href="#"
              className={`nav-item ${currentPage === "account" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("account");
              }}
            >
              <i className="icon profile-icon"></i>
              <span><img src={vectorIcon} alt="person icon" /> Account Management</span>
            </a>

            <a
              href="#"
              className={`nav-item ${currentPage === "profileManagement" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("profileManagement");
              }}
            >
              <i className="icon report-icon"></i>
              <span><img src={humanIcon} alt="confirm icon" /> Profile Management</span>
            </a>
          </nav>


          <div className="logout-container">
            <button className="logout-link" onClick={() => setShowLogoutModal(true)}>
              <img src={logoutIcon} alt="logout" />
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>
              Hi, {user?.first_name || "User"} 👋
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-summary">
              <img src={circlePersonIcon} alt="icon" />
              <div className="user-info">
                <div className="user-name">{user?.first_name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          </div>

        </header>

          {currentPage === "profile" && <Profile />}
          {currentPage === "account" && <AccountManagement />}
          {currentPage === "profileManagement" && <ProfileManagement />}
          {showLogoutModal && (
            <LogoutModal
              onConfirm={handleLogout}
              onCancel={() => setShowLogoutModal(false)}
            />
          )}
        </div>
    </div>
  )
}

export default AdminPanel
