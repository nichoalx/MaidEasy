import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./HomeOwner.css";
import LogoutModal from "../components/LogoutModal";
import logoutIcon from "../assets/logout.png";
import userIcon from "../assets/circle_person.png";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

export default function HomeOwner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Fetch user details from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data.success);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle logout client-side only
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

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
                <p className="name">{user ? `${user.first_name}` : "..."}</p>
                <p className="email">{user ? user.email : "Loading..."}</p>
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
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
