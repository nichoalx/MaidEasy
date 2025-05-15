"use client"

import { useState } from "react"
import "../modal.css"

function AddProfileModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
    users: 0,
  })

  const [errors, setErrors] = useState({})

  const availablePermissions = [
    "User Management",
    "Profile Management",
    "System Settings",
    "Reports",
    "Service Management",
    "Schedule Management",
    "Client Communication",
    "Service Booking",
    "Payment Management",
    "Reviews",
    "Team Management",
    "Project Planning",
    "Ticket Management",
    "Knowledge Base",
    "Financial Reports",
    "Invoice Management",
    "Payment Processing",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePermissionChange = (permission) => {
    const updatedPermissions = [...formData.permissions]

    if (updatedPermissions.includes(permission)) {
      // Remove permission if already selected
      const index = updatedPermissions.indexOf(permission)
      updatedPermissions.splice(index, 1)
    } else {
      // Add permission if not selected
      updatedPermissions.push(permission)
    }

    setFormData({
      ...formData,
      permissions: updatedPermissions,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Role name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.permissions.length === 0) newErrors.permissions = "At least one permission must be selected"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Profile Role</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Role Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? "error" : ""}
                rows="3"
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label>Permissions</label>
              {errors.permissions && <span className="error-message">{errors.permissions}</span>}

              <div className="permissions-container">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="permission-checkbox">
                    <input
                      type="checkbox"
                      id={`permission-${permission}`}
                      checked={formData.permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    <label htmlFor={`permission-${permission}`}>{permission}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProfileModal
