import { useNavigate, useLocation } from "react-router-dom"
import "./platform_layout.css"

import personIcon from "../assets/circle_person.png"
import logoutIcon from "../assets/logout.png"

export default function PlatformLayout({ children, user, navItems = [] }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="platform-layout">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Garuda<br />Indonesia</h1>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <a
              key={item.path}
              href="#"
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                navigate(item.path)
              }}
            >
              <span>
                <img src={item.icon} alt={`${item.label} icon`} />
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="logout-container">
          <a href="#" className="logout-link" onClick={(e) => {
            e.preventDefault()
            navigate("/logout")
          }}>
            <span>
              <img src={logoutIcon} alt="logout icon" />
              Log Out
            </span>
          </a>
        </div>
      </div>

      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>Hi, {user?.name || "User"} 👋</h2>
          </div>
          <div className="user-profile">
            <div className="user-info">
              <img src={personIcon} alt="person icon" />
              <div className="user-details">
                <div className="user-name">{user?.name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="whiteSpace">
          <div className="platform-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
