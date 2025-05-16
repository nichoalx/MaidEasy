import React from "react";
import "./deleteModal.css";

export default function DeleteModal({ service, onDelete, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2 className="modal-title">Confirm Delete</h2>
        <p className="modal-subtitle">Are you sure you want delete?</p>

        <div className="modal-details">
        <div className="modal-detail-row">
            <span className="modal-detail-label">Service Name:</span>
            <span className="modal-detail-value">{service.name}</span>
        </div>
        <div className="modal-detail-row">
            <span className="modal-detail-label">Category:</span>
            <span className="modal-detail-value">{service.category}</span>
        </div>
        <div className="modal-detail-row">
            <span className="modal-detail-label">Price:</span>
            <span className="modal-detail-value">${service.price}</span>
        </div>
        <div className="modal-detail-row">
            <span className="modal-detail-label">Date Created:</span>
            <span className="modal-detail-value">{service.date}</span>
        </div>
        <div className="modal-detail-row">
            <span className="modal-detail-label">Total Views:</span>
            <span className="modal-detail-value">{service.views}</span>
        </div>
        <div className="modal-detail-row">
            <span className="modal-detail-label">Shortlisted:</span>
            <span className="modal-detail-value">{service.shortlisted}</span>
        </div>
        </div>


        <button className="delete2-btn" onClick={() => onDelete(service.id)}>Delete</button>
        <button className="cancel2-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}