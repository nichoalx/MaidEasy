import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import "./editservice.css";

import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";
import cleaningserviceIcon from "../assets/cleaningservice.png"
import confirmIcon from "../assets/confirmed.png"
import photoIcon from "../assets/photo.png";

export default function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editMode, setEditMode] = useState(true); // default to true for editing
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
    const service = getServiceById(Number(id));
    if (service) {
      setServiceName(service.name);
      setCategory(service.category || "");
      setDescription(service.description);
      setPrice(service.price || "");
      setDuration(service.duration || "");
      setAvailability(service.availability || "");
      setMainImage(service.mainImage || null);
      setThumbnails(service.thumbnails || [null, null, null]);
    }
    setLoading(false);
  }, [id]);

  const getServiceById = (serviceId) => {
    const dummyData = [
      {
        id: 1,
        name: "Floor Cleaning",
        description: "Deep clean for all types of floors.",
        category: "Cleaning",
        price: "30",
        duration: "2 hours",
        availability: "Available",
        mainImage: null,
        thumbnails: [null, null, null],
      },
      {
        id: 2,
        name: "Chair Service",
        description: "Thorough chair cleaning.",
        category: "Furniture",
        price: "15",
        duration: "1 hour",
        availability: "Limited",
        mainImage: null,
        thumbnails: [null, null, null],
      },
    ];
    return dummyData.find((s) => s.id === serviceId);
  };

  const handleSave = () => {
    const updatedData = {
      id: Number(id),
      serviceName,
      category,
      description,
      price,
      duration,
      availability,
      mainImage,
      thumbnails,
    };

    console.log("Updated Service:", updatedData);
    navigate("/cleaning-services");
  };

  const handleBack = () => {
    navigate("/cleaning-services");
  };

  return (
    <div className="platform-layout">
      <Sidebar navigate={navigate} />
      <div className="main-content">
        <Header />
            <h1 className="platformTitle">My Services &gt; Edit Services</h1>
            <div className="newServiceWrapper">
            <div className="newServiceContainer">
                <div className="card-header2">
                    <h3>Services Details</h3>
                    <div className="button-group2">
                        <button className="back-btn2" onClick={handleBack}>Back</button>
                        <button className="save-btn2" onClick={handleSave}>Save</button>
                    </div>
                </div>
                <div className="formGrid2">
                    <div className="photoPart2">
                    <label className="formLabel">Service Photo</label>

                        <div
                            className={`photoUpload hoverable ${errors.images[0] ? "errorBorder" : ""}`}
                            onClick={() => fileInputRef.current.click()}
                        >
                            {mainImage ? (
                            <>
                                <img src={mainImage} alt="Uploaded" className="uploadedImage" />
                                <button
                                className="removeButton"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMainImage(null);
                                }}
                                >
                                ✕
                                </button>
                            </>
                            ) : (
                            <img src={photoIcon} alt="Upload" className="uploadIcon" />
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setMainImage(imageUrl);
                            }
                            }}
                        />

                        <div className="thumbnailRow2">
                            {thumbnails.map((thumb, index) => (
                            <div
                                className={`thumbnail hoverable ${errors.images[index + 1] ? "errorBorder" : ""}`}
                                key={index}
                                onClick={() => thumbnailInputRefs.current[index].click()}
                            >
                                {thumb ? (
                                <>
                                    <img src={thumb} alt={`Thumbnail ${index}`} className="uploadedImage" />
                                    <button
                                    className="removeButton"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = [...thumbnails];
                                        updated[index] = null;
                                        setThumbnails(updated);
                                    }}
                                    >
                                    ✕
                                    </button>
                                </>
                                ) : (
                                <img src={photoIcon} alt="Upload thumbnail" className="uploadIcon" />
                                )}
                                <input
                                type="file"
                                accept="image/*"
                                ref={(el) => (thumbnailInputRefs.current[index] = el)}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                    const imageUrl = URL.createObjectURL(file);
                                    const updated = [...thumbnails];
                                    updated[index] = imageUrl;
                                    setThumbnails(updated);
                                    }
                                }}
                                />
                            </div>
                            ))}
                        </div>
                        {errors.images.some((e) => e) && (
                            <div className="imageErrorText">*Please upload image</div>
                        )}
                    </div>


                <div className="inputGroup">
                    <div className="inputRow">
                    <label className="formLabel">Service Name:</label>
                    <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className={`formInput ${errors.serviceName ? "error" : ""}`}
                    />
                    </div>
                    {errors.serviceName && <span className="errorText">*Please fill in this field</span>}

                    <div className="inputRow">
                    <label className="formLabel">Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`formInput ${errors.category ? "error" : ""}`}
                    />
                    </div>
                    {errors.category && <span className="errorText">*Please fill in this field</span>}

                    <div className="inputRow">
                    <label className="formLabel">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`formInput ${errors.description ? "error" : ""}`}
                    />
                    </div>
                    {errors.description && <span className="errorText">*Please fill in this field</span>}

                    <div className="inputRow">
                    <label className="formLabel">Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={`formInput ${errors.price ? "error" : ""}`}
                    />
                    </div>
                    {errors.price && <span className="errorText">*Please fill in this field</span>}

                    <div className="inputRow">
                    <label className="formLabel">Duration:</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className={`formInput ${errors.duration ? "error" : ""}`}
                    />
                    </div>
                    {errors.duration && <span className="errorText">*Please fill in this field</span>}

                    <div className="inputRow">
                    <label className="formLabel">Availability:</label>
                    <input
                        type="text"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className={`formInput ${errors.availability ? "error" : ""}`}
                    />
                    </div>
                    {errors.availability && <span className="errorText">*Please fill in this field</span>}
                    <div className="inputRow">
                            <label className="formLabel">Date Created:</label>
                            <input
                                type="text"
                                value="31/01/2025"
                                readOnly
                                onChange={(e) => setAvailability(e.target.value)}
                                className={`formValue ${errors.availability ? "error" : ""}`}
                            />
                    </div>
                    <div className="inputRow">
                            <label className="formLabel">Total Views:</label>
                            <input
                                type="text"
                                value="214"
                                onChange={(e) => setAvailability(e.target.value)}
                                className={`formValue ${errors.availability ? "error" : ""}`}
                            />
                    </div>
                    <div className="inputRow">
                            <label className="formLabel">Shortlisted:</label>
                            <input
                                type="text"
                                value="12"
                                readOnly
                                onChange={(e) => setAvailability(e.target.value)}
                                className={`formValue ${errors.availability ? "error" : ""}`}
                            />
                    </div>
          

                </div>
                </div>
        
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
             <span><img src={personIcon} alt="person icon" style={{ width: "20px", height: "20px", marginLeft: "-1px"}}/>My Profile</span>
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
