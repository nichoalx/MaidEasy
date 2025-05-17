"use client"

import "../modal.css"

function ViewAccountModal({ user, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>View Account</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="user-details">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{user.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Role:</span>
              <span className="detail-value">{user.role}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-${user.status.toLowerCase()}`}>{user.status}</span>
            </div>

            {user.dateOfBirth && (
              <div className="detail-row">
                <span className="detail-label">Date of Birth:</span>
                <span className="detail-value">{user.dateOfBirth}</span>
              </div>
            )}

            {user.contactNumber && (
              <div className="detail-row">
                <span className="detail-label">Contact Number:</span>
                <span className="detail-value">{user.contactNumber}</span>
              </div>
            )}

            {/* Additional user details would be displayed here */}
            <div className="detail-row">
              <span className="detail-label">Created Date:</span>
              <span className="detail-value">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="modal-footer">
            <button className="save-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAccountModal
