// components/ServiceCard.jsx
import { useState } from "react"
import redHeart from "../assets/RedHeart.svg"
import noHeart from "../assets/NoHeart.svg"
import menuIcon from "../assets/menu.svg"

import "./ServiceCard.css"

export default function ServiceCard({
  service,
  serviceName,
  category,
  price,
  providerName,
  joinedDate,
  isFavorite = false,
  imageUrl,            // ✅ Add this
  profileImage,
  onViewClick
}) {
  const [favorite, setFavorite] = useState(isFavorite)

  // 🛠️ Optional future: send favorite toggle to backend
  const toggleFavorite = () => {
    setFavorite(!favorite)
    // TODO: Send to backend (e.g., POST /api/favorites/{serviceId})
  }

  return (
    <div className="service-card">
      {/* Top Section */}
      <div className="top-section">
        <div className="service-image">
            {imageUrl ? (
                <img src={imageUrl} alt={serviceName} className="service-img-preview" />
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
          <div className="value">$ {price?.toLocaleString() || "0"}</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="provider">
            <div className="avatar">
                {profileImage ? (
                    <img src={profileImage} alt={providerName} className="avatar-img" />
                ) : (
                    providerName.charAt(0)
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

          <button className="favorite-button" onClick={toggleFavorite}>
              <img src={favorite ? redHeart : noHeart} alt="favorite icon" />
          </button>
        </div>
      </div>
    </div>
  )
}
