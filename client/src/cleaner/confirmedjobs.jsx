import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import personIcon from "../assets/circle_person.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";
import searchIcon from "../assets/search.png";
import calendarIcon from "../assets/calender_icon.png";
import closeIcon from "../assets/close.png";

import "./confirmedjobs.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

import DeleteModal from "./deleteModal";
import CategoryDropdown from "./categoryDropdown";

// You may import or replace these with real image paths
import sample1 from "../assets/Sample1.png";
import nick from "../assets/nick.png";

export default function ConfirmedJobsPage() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [typeFilter, setTypeFilter] = useState("service");
  const [range, setRange] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const generateDummyServices = () =>
    Array.from({ length: 42 }, (_, i) => ({
      id: i + 1,
      serviceName: `Service ${i + 1}`,
      category: ["Floor", "Glass", "Furniture", "Living Room"][i % 4],
      providerName: `Cleaner ${i + 1}`,
      phone: `+62 812 3456 78${String(i).padStart(2, "0")}`,
      price: 70000 + i * 500,
      date: new Date(2024, i % 12, (i % 28) + 1),
      serviceImage: sample1,
      providerImage: nick,
    }));

  useEffect(() => {
    const dummy = generateDummyServices();
    setServices(dummy);
    setFiltered(dummy);
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
        <div className="search-header">
            <h1 className="services-title3">My Profile</h1>
        </div>
        <div className="cleanerSearchContainer">
          <div className="labelRow2">
            <label>Keywords</label>
            <label>Type</label>
            <label>Category</label>
            <label>Date</label>
          </div>

          <div className="cleanerSearchBar">
            <div className="searchGroup3">
              <span className="searchIcon2">
                <img src={searchIcon} alt="search icon" />
              </span>
              <input
                type="text"
                placeholder="Search By Services or Cleaners"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="cleanerBy">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="service">By Service</option>
                <option value="cleaner">By Cleaners</option>
              </select>
            </div>

            <div className="cleanerCategoryDropdown">
              <CategoryDropdown
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
                availableCategories={categoryOptions}
              />
            </div>

            <div className="cleanerDateFilter" style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div
                className="searchGroup"
                onClick={() => setShowPicker(!showPicker)}
                style={{ cursor: "pointer" }}
              >
                <span className="searchIcon">
                  <img src={calendarIcon} alt="calendar icon" />
                </span>
                <span className="calendarText">{formatRange()}</span>
              </div>

              {range && (
                <button
                  className="clear-date-btn"
                  onClick={() => setRange(null)}
                  style={{
                    marginLeft: "8px",
                    padding: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                  aria-label="Clear date range"
                >
                  <img src={closeIcon} alt="Clear" style={{ width: 20, height: 20 }} />
                </button>
              )}

              {showPicker && (
                <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 999 }}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range || [{ startDate: new Date(), endDate: new Date(), key: "selection" }]}
                  />
                </div>
              )}
            </div>

            <button className="filterButton">Filter</button>
          </div>

          <div className="result-count2">
            Showing {filtered.length} of {services.length} Results
          </div>

          <div className="categories-table-container">
            <table className="categories-table">
              <thead>
                <tr>
                    <th className="col-id">ID</th>
                    <th className="col-name">Service Name</th>
                    <th className="col-category">Category</th>
                    <th className="col-cleaner">Cleaners</th>
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
                        <button
                        className="view-btn"
                        onClick={() => navigate(`/confirmed-jobs/${item.id}`)}
                        >
                        View
                        </button>
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
        </div>
    </div>
  );
}
