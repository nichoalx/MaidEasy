// components/ViewCleaningService.jsx
import { useState } from "react"
import "./ViewCleaningService.css"
import closeIcon from "../assets/close.png"
import redHeart from "../assets/RedHeart.svg"
import noHeart from "../assets/NoHeart.svg"

export default function ViewCleaningService({ service, onClose, onToggleFavorite }) {
  const {
    serviceName,
    category,
    description,
    price,
    duration,
    availability,
    phone,
    cleanerName,
    joinedDate,
  } = service

  const [favorite, setFavorite] = useState(service.isFavorite || false)

  const handleFavoriteClick = () => {
    setFavorite(!favorite)
    onToggleFavorite(service.id)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Services Details</h2>
          <button className="view-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>

        <div className="modal-body">
          {/* Left side: cleaner info only */}
          <div className="left-section">
            <div className="provider-info">
              <div className="provider-initials">
                {cleanerName?.charAt(0).toUpperCase() || "?"}
              </div>
              <div>
                <div className="provider-name">{cleanerName}</div>
                <div className="joined-text">Joined From {joinedDate}</div>
              </div>
            </div>
          </div>

          {/* Right side: service details */}
          <div className="right-section">
            <div className="detail-row">
              <span className="view-label">Service Name:</span>
              <span className="view-value">{serviceName}</span>
            </div>
            <div className="detail-row">
              <span className="view-label">Category:</span>
              <span className="view-value">{category}</span>
            </div>
            <div className="detail-row">
              <span className="view-label">Description:</span>
              <span className="view-value">{description}</span>
            </div>
            <div className="detail-row">
              <span className="view-label">Price:</span>
              <span className="view-value">${price}</span>
            </div>
            <div className="detail-row">
              <span className="view-label">Duration:</span>
              <span className="view-value">{duration}</span>
            </div>
            <div className="detail-row">
              <span className="view-label">Availability:</span>
              <span className="view-value">{availability}</span>
            </div>
            <div className="detail-row">
              <span className="view-label">Phone Number:</span>
              <span className="view-value">{phone}</span>
            </div>

            <div className="view-action-row">
              <button className="view-back-btn" onClick={onClose}>Back</button>
              <button className="view-favorite-btn" onClick={handleFavoriteClick}>
                <img src={favorite ? redHeart : noHeart} alt="favorite icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
