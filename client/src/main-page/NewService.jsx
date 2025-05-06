import { Link } from "react-router-dom";
import { useState, useRef } from "react";

import "./NewService.css";
import photoIcon from "../assets/photo.png";

export default function NewService() {
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([null, null, null]);
  const fileInputRef = useRef(null);
  const thumbnailInputRefs = useRef([null, null, null]);

  // Controlled input states
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
    images: [false, false, false, false], // [mainImage, thumb1, thumb2, thumb3]
  });

  const handleSubmit = () => {
    const newErrors = {
      serviceName: !serviceName.trim(),
      category: !category.trim(),
      description: !description.trim(),
      price: !price.trim(),
      duration: !duration.trim(),
      availability: !availability.trim(),
      images: [
        !mainImage,
        !thumbnails[0],
        !thumbnails[1],
        !thumbnails[2],
      ],
    };

    setErrors(newErrors);

    const hasError =
      Object.values(newErrors).some((val) => val === true) ||
      newErrors.images.some((e) => e === true);

    if (!hasError) {
      alert("Form submitted!");
    }
  };

  return (
    <div className="newServiceWrapper">
      <div className="newServiceContainer">
        <h1 className="newServiceTitle">Create New Services</h1>
        <div className="formGrid">
        <div>
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

          <div className="thumbnailRow">
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
          </div>
        </div>

        <div className="buttonGroup">
          <button className="primaryButton" onClick={handleSubmit}>Create New Services</button>
          <Link to="/" className="secondaryButton">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
