import React from "react";
import "./deleteModal.css";

export default function DeleteModal({ service, onDelete, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2 className="modal-title">Confirm Delete</h2>
        <p className="modal-subtitle">Are you sure you want delete?</p>

        <div className="modal-details">
          <p><strong>Service Name:</strong> {service.name}</p>
          <p><strong>Category:</strong> {service.category}</p>
          <p><strong>Price:</strong> ${service.price}</p>
          <p><strong>Date Created:</strong> {service.date}</p>
          <p><strong>Total Views:</strong> {service.views}</p>
          <p><strong>Shortlisted:</strong> {service.shortlisted}</p>
        </div>

        <button className="delete2-btn" onClick={() => onDelete(service.id)}>Delete</button>
        <button className="cancel2-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}