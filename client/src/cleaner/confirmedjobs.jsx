import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import personIcon from "../assets/circle_person.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";
import searchIcon from "../assets/search.png";
import calendarIcon from "../assets/calender_icon.png";
import closeIcon from "../assets/close.png";
import LogoutModal from "../components/LogoutModal";
import "./confirmedjobs.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

import CategoryDropdown from "./categoryDropdown";

// Sample images (replace with actual if needed)
import sample1 from "../assets/Sample1.png";
import nick from "../assets/nick.png";

export default function ConfirmedJobsPage() {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [typeFilter, setTypeFilter] = useState("service");
  const [range, setRange] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortAsc, setSortAsc] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false); 

  useEffect(() => {
    const fetchJobHistory = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("/api/cleaner/view_job_history", {
          withCredentials: true,
        });

        const jobData = response.data.map((item) => ({
          id: item.booking_id,
          serviceName: item.service_name,
          category: item.service_category,
          providerName: item.homeowner_name || item.cleaner_name || "Unknown",
          price: item.price || 0,
          date: new Date(item.booking_date),  // Correct property
          serviceImage: sample1,              // Placeholder
          providerImage: nick,                // Placeholder
        }));

        setServices(jobData);
        setFiltered(jobData);
      } catch (error) {
        console.error("Error fetching job history", error);
      }
    };

    fetchJobHistory();
  }, []);

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

  useEffect(() => {
    let result = [...services];

    if (searchTerm.trim()) {
      result = result.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter === "cleaner") {
      result = result.filter((s) =>
        s.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category));
    }

    if (range && range[0].startDate && range[0].endDate) {
      const start = range[0].startDate;
      const end = range[0].endDate;
      result = result.filter((s) => {
        const d = new Date(s.date);
        return d >= start && d <= end;
      });
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [searchTerm, typeFilter, selectedCategories, range, services]);

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

  const formatRange = () => {
    if (!range) return "Select Date Range";
    const start = format(range[0].startDate, "MMM d, yyyy");
    const end = format(range[0].endDate, "MMM d, yyyy");
    return `${start} → ${end}`;
  };

  const toggleSort = () => {
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
    setFiltered(sorted);
    setSortAsc(!sortAsc);
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

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
            className="nav-item"
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
            className="nav-item active"
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

      <div className="main-content">
        <header className="platform-header">
          <div className="greeting">
            <h2>Hi, {user?.first_name || "User"} 👋</h2>
          </div>

          <div className="user-profile">
            <div className="user-summary">
              <img src={personIcon} alt="icon" />
              <div className="user-info">
                <div className="user-name">{user?.first_name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          </div>

        </header>

        <div className="search-header">
          <h1 className="services-title3">Confirmed Jobs</h1>
        </div>

        <div className="cleanerSearchContainerWrapper">
          <div className="cleanerSearchContainer2">
            <div className="filterRow">
              {/* Keywords */}
              <div className="filterGroup">
                <div className="filterLabel">
                  <label3>Keywords</label3>
                  <label3>Type</label3>
                </div>
                <div className="keywordSearchByBox">
                  {/* Search input */}
                  <div className="searchSection">
                    <img src={searchIcon} alt="search" className="searchIcon" />
                    <input
                      type="text"
                      placeholder="Enter service or home owner name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Dropdown */}
                  <div className="dropdownSection">
                    <span className="leftArrow">&#9662;</span> {/* ▼ */}
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="service">Service</option>
                      <option value="cleaner">Cleaner</option>
                      <option value="homeowner">Home Owner</option>
                    </select>
                  </div>
                </div>
              </div>
              

              {/* Category */}
              <div className="filterGroup">
                <label className="filterLabel5">Select Category</label>
                <CategoryDropdown
                  selectedCategories={selectedCategories}
                  onChange={setSelectedCategories}
                  availableCategories={categoryOptions}
                />
              </div>

              {/* Filter Button */}
              <div className="filterGroup3">
              
                <button className="filterButton3">Filter</button>
              </div>
            </div>

            <div className="result-count2">
              Showing {filtered.length} of {services.length} Results
            </div>
          </div>  
        </div>


          <div className="categories-table-container23">
            <table className="categories-table23">
              <thead>
                <tr>
                  <th className="col-id">ID</th>
                  <th className="col-name">Service Name</th>
                  <th className="col-category">Category</th>
                  <th className="col-cleaner">Cleaner</th>
                  <th className="col-price">Price</th>
                  <th className="col-date" onClick={toggleSort}>Date {sortAsc ? "▲" : "▼"}</th>
                  <th className="col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="nowrap">{item.id}</td>
                    <td className="nowrap"><b>{item.serviceName}</b></td>
                    <td className="nowrap">{item.category}</td>
                    <td className="nowrap">{item.providerName}</td>
                    <td className="nowrap">$ {item.price.toLocaleString()}</td>
                    <td className="nowrap">{format(new Date(item.date), "MMM d, yyyy")}</td>
                    <td className="nowrap">
                      <button className="view-btn" onClick={() => navigate(`/confirmed-jobs/${item.id}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paginationBar">
              <div className="paginationSection left">
                {currentPage > 1 && (
                  <button className="prev-btn" onClick={() => setCurrentPage((prev) => prev - 1)}>&lt; Previous</button>
                )}
              </div>
              <div className="paginationSection center">
                <span className="page-info">Page {currentPage} of {totalPages}</span>
              </div>
              <div className="paginationSection right">
                {currentPage < totalPages && (
                  <button className="next-btn" onClick={() => setCurrentPage((prev) => prev + 1)}>Next &gt;</button>
                )}
              </div>
            </div>
          </div>
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
