"use client"

import { useEffect } from "react"
import "../toast.css"

function Toast({ message, type = "info" }) {
  useEffect(() => {
    // Add animation class after component mounts
    const toast = document.querySelector(".toast")
    if (toast) {
      setTimeout(() => {
        toast.classList.add("show")
      }, 10)
    }
  }, [])

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {type === "success" && <span className="toast-icon">✓</span>}
        {type === "error" && <span className="toast-icon">✕</span>}
        {type === "info" && <span className="toast-icon">ℹ</span>}
        <span className="toast-message">{message}</span>
      </div>
    </div>
  )
}

export default Toast
