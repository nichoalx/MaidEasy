// components/ServiceCard.jsx
import { useState } from "react"
import redHeart from "../assets/RedHeart.svg"
import noHeart from "../assets/NoHeart.svg"
import menuIcon from "../assets/menu.svg"
import "./ServiceCard.css"

export default function ServiceCard({ service, onViewClick, onToggleFavorite}) {
  const {
    serviceName,
    category,
    price,
    providerName,
    joinedDate,
    isFavorite = false,
    images = [],
    providerImage
  } = service

  return (
    <div className="service-card">
      {/* Top Section */}
      <div className="top-section">
        <div className="service-image">
          {images[0] ? (
            <img src={images[0]} alt={serviceName} className="service-img-preview" />
          ) : (
            <span>Image</span>
          )}
        </div>

        <div className="service-details">
          <div className="label">Service Name:</div>
          <div className="value">{serviceName || "Unnamed Service"}</div>
          <div className="label">Category:</div>
          <div className="value">{category || "Uncategorized"}</div>
          <div className="label">Price:</div>
          <div className="value">Rp {price?.toLocaleString() || "0"}</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="provider">
          <div className="avatar">
            {providerImage ? (
              <img src={providerImage} alt={providerName} className="avatar-img" />
            ) : (
              providerName?.charAt(0)
            )}
          </div>
          <div>
            <div className="provider-name">{providerName || "Unknown Cleaner"}</div>
            <div className="provider-joined">Joined from {joinedDate || "?"}</div>
          </div>
        </div>

        <div className="card-actions">
          <button className="view-button" onClick={() => onViewClick(service)}>
            <img src={menuIcon} alt="view" />
          </button>

          <button className="favorite-button" onClick={() => onToggleFavorite(service.id)}>
            <img src={service.isFavorite ? redHeart : noHeart} alt="favorite icon" />
          </button>
        </div>
      </div>
    </div>
  )
}
