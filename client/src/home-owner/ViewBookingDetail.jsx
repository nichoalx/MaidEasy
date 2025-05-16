// components/BookingDetailModal.jsx
import "./ViewBookingDetail.css"
import defaultServiceImage from "../assets/Sample1.png"
import defaultCleanerImage from "../assets/nick.png"
import { format } from "date-fns"

export default function BookingDetailModal({ booking, onClose }) {
  if (!booking) return null

  // Use dynamic fields with fallbacks
  const {
    id,
    serviceName = "Unnamed Service",
    category = "Uncategorized",
    price = 0,
    providerName = "Unknown Cleaner",
    phone = "-",
    date,
    serviceImage,
    providerImage
  } = booking

  const formattedDate = new Date(date).toLocaleDateString("en-GB") // e.g. 15/04/2025

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <div className="booking-modal-header">
          <h2>Book #{id}</h2>
          <button className="back-btn" onClick={onClose}>Back</button>
        </div>

        <div className="booking-modal-section">
          <h3>Service Details</h3>
          <div className="booking-service">
            <img
              src={serviceImage || defaultServiceImage}
              alt="Service"
              className="booking-service-img"
            />
            <div className="booking-details-text">
              <p><strong>Service Name:</strong> {serviceName}</p>
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Price:</strong> ${price}</p>
            </div>
          </div>
        </div>

        <div className="booking-modal-section">
          <h3>Cleaner Details</h3>
          <div className="booking-cleaner">
            <img
              src={providerImage || defaultCleanerImage}
              alt="Cleaner"
              className="booking-cleaner-img"
            />
            <div className="booking-details-text">
              <p><strong>Name:</strong> {providerName}</p>
              <p><strong>Phone Number:</strong> {phone}</p>
            </div>
          </div>
        </div>

        <div className="booking-modal-section">
          <h3>Date/Time</h3>
          <p>{format(new Date(date), "MMM d, yyyy")}</p>
        </div>
      </div>
    </div>
  )
}
