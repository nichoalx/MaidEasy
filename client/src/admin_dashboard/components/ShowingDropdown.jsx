"use client"

import { useState, useRef, useEffect } from "react"

function ShowingDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="showing-dropdown" ref={dropdownRef}>
      <span className="showing-label">Showing :</span>
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          {value}
          <i className="dropdown-icon"></i>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <div
                key={option}
                className={`dropdown-item ${option === value ? "active" : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowingDropdown
