import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewService.css";

import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png"
import confirmIcon from "../assets/confirmed.png"

export default function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [services, setServices] = useState(0);

  const serviceData = [
    { id: 1, name: "Floor Cleaning", createdOn: "01/12/2001", services: 120, description: "Professional floor cleaning services for all types of flooring" },
    { id: 2, name: "Chair", createdOn: "02/10/2002", services: 100, description: "Chair cleaning and maintenance services" },
    { id: 3, name: "Rooftop", createdOn: "03/12/2010", services: 10, description: "Rooftop cleaning and maintenance services" },
  ];

  useEffect(() => {
    const service = serviceData.find((s) => s.id === Number(id));
    if (service) {
      setCategoryName(service.name);
      setDescription(service.description);
      setCreatedOn("01/01/2024"); // placeholder
      setServices(service.views);
    }
    setLoading(false);
  }, [id])

  const handleBack = () => navigate("/cleaning-services");

  const handleSave = () => {
    alert("Service updated successfully!");
    navigate("/cleaning-services");
  }

  return (
    <div className="platform-layout">
      <Sidebar navigate={navigate} />
      <div className="main-content">
        <Header />
        <div className="newServiceWrapper">
          <div className="newServiceContainer">
            <h1 className="newServiceTitle">
              {editMode ? "Edit Category" : "View Category"}
            </h1>
            {loading ? (
              <div className="loading-indicator">Loading...</div>
            ) : (
              <>
                <div className="inputGroup">
                  <div className="inputRow">
                    <label>Category Name:</label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="formInput"
                      disabled={!editMode}
                    />
                  </div>

                  <div className="inputRow">
                    <label>Created On:</label>
                    <input
                      type="text"
                      value={createdOn}
                      className="formInput"
                      disabled
                    />
                  </div>

                  <div className="inputRow">
                    <label>Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="formInput"
                      disabled={!editMode}
                    />
                  </div>

                  <div className="inputRow">
                    <label>Total Services:</label>
                    <input
                      type="text"
                      value={services}
                      className="formInput"
                      disabled
                    />
                  </div>
                </div>

                <div className="buttonGroup">
                  <button className="secondaryButton" onClick={handleBack}>Back</button>
                  {editMode ? (
                    <button className="primaryButton" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="primaryButton" onClick={() => setEditMode(true)}>Edit</button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ navigate }) {
  return (
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
            <span><img src={personIcon} alt="person icon" />My Profile</span>
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
  );
}

function Header() {
  return (
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
  );
}
