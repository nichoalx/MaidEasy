// components/ViewCleaningService.jsx
import { useState } from "react"
import "./ViewCleaningService.css"
import leftArrow from "../assets/leftchevron.png"
import rightArrow from "../assets/rightchevron.png"
import defaultImage from "../assets/photo.png"
import closeIcon from "../assets/close.png"

export default function ViewCleaningService({ service, onClose }) {
  const {
    serviceName,
    category,
    description,
    price,
    duration,
    availability,
    phone,
    providerName,
    joinedDate,
    providerImage,
    images = [defaultImage]
  } = service

  const [index, setIndex] = useState(0)

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Services Details</h2>
          <button className="close-btn" onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>

        <div className="modal-body">
          {/* Left side: image & cleaner */}
          <div className="left-section">
            <div className="image-slider">
              <button onClick={prevImage} className="arrow-btn">
                <img src={leftArrow} alt="Previous" />
              </button>

              <div className="image-box">
                <img src={images[index]} alt="service" />
              </div>

              <button onClick={nextImage} className="arrow-btn">
                <img src={rightArrow} alt="Next" />
              </button>
            </div>

            <div className="provider-info">
              <img className="provider-avatar" src={providerImage || defaultImage} alt="provider" />
              <div>
                <div className="provider-name">{providerName}</div>
                <div className="joined-text">Joined From {joinedDate}</div>
              </div>
            </div>
          </div>

          {/* Right side: service details */}
          <div className="right-section">
            <div className="detail-row">
              <span className="label">Service Name:</span>
              <span className="value">{serviceName}</span>
            </div>
            <div className="detail-row">
              <span className="label">Category:</span>
              <span className="value">{category}</span>
            </div>
            <div className="detail-row">
              <span className="label">Description:</span>
              <span className="value">{description}</span>
            </div>
            <div className="detail-row">
              <span className="label">Price:</span>
              <span className="value">${price}</span>
            </div>
            <div className="detail-row">
              <span className="label">Duration:</span>
              <span className="value">{duration}</span>
            </div>
            <div className="detail-row">
              <span className="label">Availability:</span>
              <span className="value">{availability}</span>
            </div>
            <div className="detail-row">
              <span className="label">Phone Number:</span>
              <span className="value">{phone}</span>
            </div>

            <button className="back-btn" onClick={onClose}>Back</button>
          </div>
        </div>
      </div>
    </div>
  )
}
