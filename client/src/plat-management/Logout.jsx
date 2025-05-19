import React from "react"
import { useNavigate } from "react-router-dom"
import "./Logout.css"

export default function Logout() {
  const navigate = useNavigate()

  const cancel = () => {
    navigate(-1)
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    navigate("/"); // redirect to homepage
  };

  return (
    <div className="logoutOverlay">
      <div className="logoutContainer">
        <div className="header">
          <div className="text">Confirm Logout</div>
        </div>
        <div className="body">
          <div className="text">Are you sure you want to logout?</div>
        </div>
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
        <button className="cancelButton" onClick={cancel}>Cancel</button>
      </div>
    </div>
  )
}
