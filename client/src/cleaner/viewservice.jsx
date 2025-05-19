import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";

import "./viewservice.css";

import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png";
import confirmIcon from "../assets/confirmed.png";
import photoIcon from "../assets/photo.png";

export default function ViewService() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([null, null, null]);
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [availability, setAvailability] = useState("");

  const fileInputRef = useRef(null);
  const thumbnailInputRefs = useRef([null, null, null]);

  const [errors, setErrors] = useState({
    serviceName: false,
    category: false,
    description: false,
    price: false,
    duration: false,
    availability: false,
    images: [false, false, false, false],
  });

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(`/api/cleaner/view/${id}`, {
          withCredentials: true,
        });

        const service = res.data.services;

        setServiceName(service.name || "");
        setCategory(service.category_name || "");
        setDescription(service.description || "");
        setPrice(service.price || "");
        setDuration(service.duration || "");
        setAvailability(service.availability || "");
        setMainImage(service.main_image_url || null);
        setThumbnails([
          service.thumb1_url || null,
          service.thumb2_url || null,
          service.thumb3_url || null,
        ]);
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

  const handleBack = () => navigate("/cleaning-services");
  const handleEdit = () => navigate(`/edit-service/${id}`);

  if (loading) return <p>Loading service details...</p>;

  return (
    <div className="platform-layout">
      <Sidebar navigate={navigate} />
      <div className="main-content">
        <Header />
        <h1 className="platformTitle">My Services &gt; View Services</h1>
        <div className="newServiceWrapper">
          <div className="newServiceContainer">
            <div className="card-header2">
              <h3>Services Details</h3>
              <div className="button-group2">
                <button className="back-btn2" onClick={handleBack}>Back</button>
                <button className="edit-btn2" onClick={handleEdit}>Edit</button>
              </div>
            </div>

            <div className="formGrid2">
              <div className="photoPart2">
                <label className="formLabel">Service Photo</label>
                <div className="photoUpload">
                  {mainImage ? (
                    <img src={mainImage} alt="Main" className="uploadedImage" />
                  ) : (
                    <img src={photoIcon} alt="Placeholder" className="uploadIcon" />
                  )}
                </div>

                <div className="thumbnailRow2">
                  {thumbnails.map((thumb, index) => (
                    <div className="thumbnail" key={index}>
                      {thumb ? (
                        <img src={thumb} alt={`Thumb ${index}`} className="uploadedImage" />
                      ) : (
                        <img src={photoIcon} alt="Upload thumbnail" className="uploadIcon" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="inputGroup">
                <InputRow label="Service Name" value={serviceName} />
                <InputRow label="Category" value={category} />
                <InputRow label="Description" value={description} multiline />
                <InputRow label="Price" value={price} />
                <InputRow label="Duration" value={duration} />
                <InputRow label="Availability" value={availability} />
                <InputRow label="Date Created" value="31/01/2025" />
                <InputRow label="Total Views" value="214" />
                <InputRow label="Shortlisted" value="12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Row Component
function InputRow({ label, value, multiline = false }) {
  return (
    <div className="inputRow">
      <label className="formLabel">{label}:</label>
      {multiline ? (
        <textarea value={value} readOnly className="formInput" />
      ) : (
        <input type="text" value={value} readOnly className="formInput" />
      )}
    </div>
  );
}

// Sidebar Component (unchanged)
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

