"use client"

import "../modal.css"

function ViewProfileModal({ role, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>View Profile Role</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="role-details">
            <div className="detail-row">
              <span className="detail-label">Role Name:</span>
              <span className="detail-value">{role.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-${role.status.toLowerCase()}`}>{role.status}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Number of Users:</span>
              <span className="detail-value">{role.users}</span>
            </div>

            {role.description && (
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value description">{role.description}</span>
              </div>
            )}

            {role.permissions && role.permissions.length > 0 && (
              <div className="detail-section">
                <span className="detail-label">Permissions:</span>
                <ul className="permissions-list">
                  {role.permissions.map((permission, index) => (
                    <li key={index} className="permission-item">
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

export default ViewProfileModal
