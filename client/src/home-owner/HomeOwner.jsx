import { Outlet, useNavigate, useLocation } from "react-router-dom"
import "./HomeOwner.css"
import LogoutModal from "../components/LogoutModal"
import logoutIcon from "../assets/logout.png"
import userIcon from "../assets/circle_person.png"
import { useState } from "react"


export default function HomeOwner() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  

  return (
    <div className="HomeOwner">
      <div className="headerTitle">
        <div className="leftHODashboard">
          <div className="headerLogo">Garuda<br />Indonesia</div>
        </div>

        <div className="middleHODashboard">
          <div className="titleButton">
            <button className={location.pathname.endsWith("dashboard") ? "activeTab" : ""} onClick={() => navigate("/homeowner/dashboard")}>Dashboard</button>
            <button className={location.pathname.endsWith("shortlist") ? "activeTab" : ""} onClick={() => navigate("/homeowner/shortlist")}>My Shortlist</button>
            <button className={location.pathname.endsWith("history") ? "activeTab" : ""} onClick={() => navigate("/homeowner/history")}>History</button>
          </div>
        </div>

        <div className="rightHODashboard">
          <div className="userButton">
            <button className="logoutButton" onClick={() => setShowLogoutModal(true)}>
              <img src={logoutIcon} alt="logout" />
              Log Out
            </button>
            <button className="profileButton">
              <img src={userIcon} alt="user" />
              <div className="homeownerInfo">
                <p className="name">Cleaner 1</p>
                <p className="email">cleaner1@main.com</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="HomeOwnerPage">
        <Outlet />
      </div>
      {showLogoutModal && (
        <LogoutModal
          onConfirm={() => {
            localStorage.removeItem("isLoggedIn")
            navigate("/") // or "/" if main page
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  )
}
