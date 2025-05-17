"use client"

import { useState } from "react"
import "../modal.css"

function AddAccountModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Cleaner",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    contactNumber: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Remove confirmPassword before saving
      const { confirmPassword, ...dataToSave } = formData
      onSave(dataToSave)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Account</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? "error" : ""}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={errors.contactNumber ? "error" : ""}
                />
                {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="Cleaner">Cleaner</option>
                <option value="Home Owner">Home Owner</option>
                <option value="Project Management">Project Management</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="cancel-button" onClick={onClose}>
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

export default AddAccountModal
