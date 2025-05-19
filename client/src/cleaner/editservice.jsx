import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";

import "./editservice.css";
import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";

export default function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [views, setViews] = useState("");
  const [shortlisted, setShortlisted] = useState("");

  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [availability, setAvailability] = useState("");

  const [errors, setErrors] = useState({
    serviceName: false,
    category: false,
    description: false,
    price: false,
    duration: false,
    availability: false,
  });

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

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(`/api/cleaner/view/${id}`, { withCredentials: true });
        const service = Array.isArray(res.data.services) ? res.data.services[0] : res.data.services;

        if (!service) {
          alert("Service not found.");
          navigate("/cleaning-services");
          return;
        }

        setServiceName(service.name || "");
        setCategory(service.category_name || "");
        setDescription(service.description || "");
        setPrice(service.price ? String(service.price) : "");
        setDuration(service.duration || "");
        setAvailability(service.availability || "");
        setCreatedAt(service.created_at ? formatDate(service.created_at) : "");
        setViews(service.view_count || "");
        setShortlisted(service.shortlist_count || "");
      } catch (error) {
        console.error("Failed to fetch service:", error);
        alert("Service not found.");
        navigate("/cleaning-services");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleSave = async () => {
    const newErrors = {
      serviceName: !serviceName.trim(),
      category: !category.trim(),
      description: !description.trim(),
      price: !price.trim(),
      duration: !duration.trim(),
      availability: !availability.trim(),
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e === true);
    if (!hasError) {
      try {
        await axios.put(
          `/api/cleaner/update/${id}`,
          {
            name: serviceName,
            category_name: category,
            description,
            price,
            duration,
            availability,
          },
          { withCredentials: true }
        );
        alert("Service updated successfully!");
        navigate("/cleaning-services");
      } catch (error) {
        console.error("Update failed:", error);
        alert("Failed to update service.");
      }
    }
  };

  const handleBack = () => navigate("/cleaning-services");

  if (loading || !user) return <p>Loading service...</p>;

  return (
    <div className="platform-layout">
      <Sidebar navigate={navigate} />
      <div className="main-content">
        <Header user={user} />
        <h1 className="platformTitle">My Services &gt; Edit Services</h1>
        <div className="newServiceWrapper">
          <div className="newServiceContainer">
            <div className="card-header2">
              <h3>Service Details</h3>
              <div className="button-group2">
                <button className="back-btn2" onClick={handleBack}>Back</button>
                <button className="save-btn2" onClick={handleSave}>Save</button>
              </div>
            </div>

            <div className="formGrid3">
              <div className="inputGroup2">
                {[{ label: "Service Name", state: serviceName, setter: setServiceName, key: "serviceName" },
                  { label: "Category", state: category, setter: setCategory, key: "category" },
                  { label: "Description", state: description, setter: setDescription, key: "description", multiline: true },
                  { label: "Price", state: price, setter: setPrice, key: "price" },
                  { label: "Duration", state: duration, setter: setDuration, key: "duration" },
                  { label: "Availability", state: availability, setter: setAvailability, key: "availability" }
                ].map(({ label, state, setter, key, multiline }) => (
                  <div className="inputRow" key={key}>
                    <label className="formLabel">{label}:</label>
                    {multiline ? (
                      <textarea value={state} onChange={(e) => setter(e.target.value)} className={`formInput ${errors[key] ? "error" : ""}`} />
                    ) : (
                      <input type="text" value={state} onChange={(e) => setter(e.target.value)} className={`formInput ${errors[key] ? "error" : ""}`} />
                    )}
                    {errors[key] && <span className="errorText">*Please fill in this field</span>}
                  </div>
                ))}

                <div className="inputRow">
                  <label className="formLabel">Date Created:</label>
                  <input type="text" value={createdAt} readOnly className="formValue" />
                </div>
                <div className="inputRow">
                  <label className="formLabel">Total Views:</label>
                  <input type="text" value={views} readOnly className="formValue" />
                </div>
                <div className="inputRow">
                  <label className="formLabel">Shortlisted:</label>
                  <input type="text" value={shortlisted} readOnly className="formValue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
          className="nav-item active"
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
          className="nav-item"
          onClick={(e) => {
            e.preventDefault()
            navigate("/cleaning-services")
          }}
        >
          <i className="icon profile-icon"></i>
          <span><img src={cleaningserviceIcon} alt="cleaning icon" />Cleaning Services</span>
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
          <span><img src={confirmIcon} alt="confirmed icon" />Confirmed Jobs</span>
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

function Header({ user }) {
  return (
    <header className="platform-header">
      <div className="greeting">
        <h2>Hi, {user.first_name} 👋</h2>
      </div>

      <div className="user-profile">
        <img src={personIcon} alt="user icon" />
        <div className="user-details">
          <div className="user-name">{user.first_name} {user.last_name}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
    </header>
  );
}