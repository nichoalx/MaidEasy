import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import personIcon from "../assets/circle_person.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png"
import confirmIcon from "../assets/confirmed.png"
import "./cleaner.css";

import DeleteModal from "./deleteModal";
import CategoryDropdown from "./categoryDropdown"

export default function CleaningServices() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["Home Owner", "Floor", "Roof", "Ceiling", "Car Wash"];

  const [services, setServices] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Service ${i + 1}`,
      category: categories[i % categories.length], // rotates every 5 items
      views: Math.floor(Math.random() * 500),
      shortlisted: Math.floor(Math.random() * 20),
    }))
  );

  const [filtered, setFiltered] = useState(services);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  // Generate unique categories from services
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

  useEffect(() => {
    let result = services.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedCategories.length > 0) {
      result = result.filter(s => selectedCategories.includes(s.category));
    }
    setFiltered(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, services]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleEditClick = (service) => {
    navigate(`/edit-service/${service.id}`);
    };

  const confirmDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
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
              navigate("/confirmed-jobs")
            }}
          >
            <i className="icon report-icon"></i>
            <span1><img src={confirmIcon} alt="confirm icon" />Confirmed Jobs</span1>
          </a>
        </nav>
        <div className="logout-container">
          <a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); navigate("/Logout") }}>
            <span><img src={logoutIcon} alt="logout icon" />Log Out</span>
          </a>
        </div>
      </div>


      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>
              Hi, Platform123{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
          </div>

          <div className="user-profile">
            <div className="user-info">
              <img src={personIcon} alt="person icon" />
              <div className="user-details">
                <div className="user-name">Platform123</div>
                <div className="user-email">plat123@gmail.com</div>
              </div>
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

                        <svg
                            className="search-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="10"></circle>
                            <line x1="22" y1="22" x2="19.65" y2="19.65"></line>
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


            <div className="categories-table-container">
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
                          <button className="view-btn">View</button>
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
            onDelete={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
}