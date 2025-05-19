// components/BookingDetailModal.jsx
import "./ViewBookingDetail.css"
import defaultServiceImage from "../assets/Sample1.png"
import defaultCleanerImage from "../assets/nick.png"
import { format } from "date-fns"

export default function BookingDetailModal({ booking, onClose }) {
  if (!booking) return null

  const {
    id,
    serviceName = "Unnamed Service",
    category = "Uncategorized",
    price = 0,
    providerName = "Unknown Cleaner",
    phone = "-",
    date,
    serviceImage,
    cleanerImage
  } = booking

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <div className="booking-modal-header">
          <h2>Book #{id}</h2>
          <button className="booking-back-btn" onClick={onClose}>Back</button>
        </div>

        <div className="booking-modal-section">
          <h3 className="booking-section-title">Service Details</h3>
          <div className="booking-service">
            <img
              src={serviceImage || defaultServiceImage}
              alt="Service"
              className="booking-service-img"
            />
            <div className="booking-details-text">
              <div className="booking-row">
                <span className="booking-label">Service Name:</span>
                <span className="booking-value">{serviceName}</span>
              </div>
              <div className="booking-row">
                <span className="booking-label">Category:</span>
                <span className="booking-value">{category}</span>
              </div>
              <div className="booking-row">
                <span className="booking-label">Price:</span>
                <span className="booking-value">${price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-modal-section">
          <h3 className="booking-section-title">Cleaner Details</h3>
          <div className="booking-cleaner">
            <img
              src={cleanerImage || defaultCleanerImage}
              alt="Cleaner"
              className="booking-cleaner-img"
            />
            <div className="booking-details-text">
              <div className="booking-row">
                <span className="booking-label">Name:</span>
                <span className="booking-value">{providerName}</span>
              </div>
              <div className="booking-row">
                <span className="booking-label">Phone Number:</span>
                <span className="booking-value">{phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-modal-section">
          <h3 className="booking-section-title">Date/Time</h3>
          <div className="booking-row">
            <span className="booking-value">{format(new Date(date), "MMM d, yyyy")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
