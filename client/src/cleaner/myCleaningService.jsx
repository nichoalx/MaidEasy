import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import LogoutModal from "../components/LogoutModal";
import personIcon from "../assets/circle_person.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";

import "./cleaner.css";
import DeleteModal from "./deleteModal";
import CategoryDropdown from "./categoryDropdown";

export default function CleaningServices() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // ✅ Add user state
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const res = await axios.get(`/api/users/${userId}`, {
          withCredentials: true,
        });
        setUser(res.data.success);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        alert("Failed to load user profile.");
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch services from backend
  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const res = await axios.get("/api/cleaner/my_services", {
          withCredentials: true,
        });

        const fetched = res.data.services || [];
        const formatted = fetched.map((s) => ({
          id: s.service_id,
          name: s.name,
          category: s.category_name || "General",
          views: s.view_count || 0,        
          shortlisted: s.shortlist_count || 0, 
        }));


        setServices(formatted);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        alert("Failed to load services.");
      }
    };

    fetchMyServices();
  }, []);

  // Category options
  const categoryOptions = useMemo(() => {
    const seen = new Set();
    return services.reduce((acc, s) => {
      if (!seen.has(s.category)) {
        seen.add(s.category);
        acc.push({ id: s.category, name: s.category });
      }
      return acc;
    }, []);
  }, [services]);

  // Filtering
  useEffect(() => {
    let result = services.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category));
    }
    setFiltered(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, services]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleEditClick = (service) => {
    navigate(`/edit-service/${service.id}`);
  };

  const handleViewClick = (service) => {
    navigate(`/view-service/${service.id}`);
  };

  const confirmDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  if (!user) return <p>Loading...</p>; // ✅ Prevent crash during initial render

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
              navigate("/cleaner-profile")
            }}
          >
            <i className="icon grid-icon"></i>
            <span1><img src={personIcon} alt="person icon" />My Profile</span1>
          </a>
          <a
            href="#"
            className="nav-item active"
            onClick={(e) => {
              e.preventDefault()
              navigate("/cleaning-services")
            }}
          >
            <i className="icon profile-icon"></i>
            <span><img src={cleaningserviceIcon} alt="person icon" />Cleaning Services</span>
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate("/confirmed-service")
            }}
          >
            <i className="icon report-icon"></i>
            <span1><img src={confirmIcon} alt="confirm icon" />Confirmed Jobs</span1>
          </a>
        </nav>

        <div className="logout-container">
          <a
            href="#"
            className="logout-link"
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutModal(true);
            }}
          >
            <img src={logoutIcon} alt="logout icon" />
            Log Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>
              Hi, {user.first_name} 👋
            </h2>
          </div>

          <div className="user-profile">
            <img src={personIcon} alt="user icon" />
            <div className="user-details">
              <div className="user-name">{user.first_name} {user.last_name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </header>

        <div className="whiteSpace">
          <div className="platform-content">
            <div className="search-header">
              <h1 className="services-title">My Services</h1>
              <button className="add-button" onClick={() => navigate("/new-service")}>
                <span>+</span> Add New Service
              </button>
            </div>

            <div className="search-container">
              <div className="search-box">
                <label className="input-label">Keywords</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter Service Name"
                    className="search-keyword"
                    value={inputTerm}
                    onChange={(e) => setInputTerm(e.target.value)}
                  />
                  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="10" />
                    <line x1="22" y1="22" x2="19.65" y2="19.65" />
                  </svg>
                </div>
              </div>

              <div className="category-box">
                <label className="input-label">Select Category</label>
                <CategoryDropdown
                  selectedCategories={selectedCategories}
                  onChange={setSelectedCategories}
                  availableCategories={categoryOptions}
                />
              </div>

              <div className="search-button-container">
                <button className="search-button" onClick={() => setSearchTerm(inputTerm)}>
                  Search
                </button>
              </div>
            </div>

            <div className="result-count">
              Showing {filtered.length} of {services.length} Results
            </div>

            <div className="categories-table-container5">
              <table className="categories-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Shortlisted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td><b>{item.name}</b></td>
                      <td>{item.category}</td>
                      <td>{item.views}</td>
                      <td>{item.shortlisted}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn" onClick={() => handleViewClick(item)}>View</button>
                          <button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDeleteClick(item)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="paginationBar">
                <div className="paginationSection left">
                  {currentPage > 1 && (
                    <button className="prev-btn" onClick={handlePrevious}>&lt; Previous</button>
                  )}
                </div>
                <div className="paginationSection center">
                  <span className="page-info">Page {currentPage} of {totalPages}</span>
                </div>
                <div className="paginationSection right">
                  {currentPage < totalPages && (
                    <button className="next-btn" onClick={handleNext}>Next &gt;</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <DeleteModal
            service={selectedService}
            onDelete={() => confirmDelete(selectedService.id)}
            onCancel={cancelDelete}
          />
        )}
      </div>
      {showLogoutModal && (
        <LogoutModal
          onConfirm={async () => {
            try {
              await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } catch (err) {
              console.warn("Logout request failed", err);
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("role");
            localStorage.removeItem("isLoggedIn");

            navigate("/");
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
