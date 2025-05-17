"use client"

import { useEffect, useState } from "react"

function SuspendProfileModal({ role, onClose, onConfirm }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete before removing from DOM
  }

  const handleConfirm = () => {
    setIsVisible(false)
    setTimeout(onConfirm, 300) // Wait for animation to complete before confirming
  }

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      onClick={handleClose}
    >
      <div
        className="modal-container"
        style={{
          maxWidth: "400px",
          borderRadius: "12px",
          padding: "0",
          backgroundColor: "white",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          transform: isVisible ? "scale(1)" : "scale(0.9)",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "24px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#3e4772",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {role.status === "Active" ? "Confirm Suspend" : "Confirm Activate"}
          </h2>

          <p
            style={{
              textAlign: "center",
              marginBottom: "24px",
              fontSize: "16px",
            }}
          >
            Are you sure you want {role.status === "Active" ? "suspend" : "activate"}?
          </p>

          <div style={{ marginBottom: "24px" }}>
            <div className="detail-row" style={{ display: "flex", marginBottom: "12px" }}>
              <span style={{ width: "120px", fontWeight: "500" }}>Role Name:</span>
              <span>{role.name}</span>
            </div>
            <div className="detail-row" style={{ display: "flex", marginBottom: "12px" }}>
              <span style={{ width: "120px", fontWeight: "500" }}>Description:</span>
              <span style={{ flex: 1 }}>{role.description}</span>
            </div>
            <div className="detail-row" style={{ display: "flex", marginBottom: "12px" }}>
              <span style={{ width: "120px", fontWeight: "500" }}>Permissions:</span>
              <span>{role.permissions.join(", ")}</span>
            </div>
            <div className="detail-row" style={{ display: "flex", marginBottom: "12px" }}>
              <span style={{ width: "120px", fontWeight: "500" }}>Active User:</span>
              <span>{role.users} Users</span>
            </div>
          </div>

          <div className="button-group" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={handleConfirm}
              style={{
                backgroundColor: role.status === "Active" ? "#ca3032" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = role.status === "Active" ? "#b52a2c" : "#3e8e41")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = role.status === "Active" ? "#ca3032" : "#4CAF50")
              }
            >
              {role.status === "Active" ? "Suspend" : "Activate"}
            </button>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: "#f0f2fa",
                color: "#333",
                border: "none",
                borderRadius: "50px",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e4e6ee")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f0f2fa")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuspendProfileModal
