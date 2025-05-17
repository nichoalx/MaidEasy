"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginSignup.css"

import mail_icon from "../assets/mail_icon.png"
import lock_icon from "../assets/lock_icon.png"
import visibility_on from "../assets/visibility_on.png"
import visibility_off from "../assets/visibility_off.png"

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: false, password: false })

  const handleLogin = () => {
    const emailEmpty = email.trim() === ""
    const passwordEmpty = password.trim() === ""
    setErrors({ email: emailEmpty, password: passwordEmpty })

    if (!emailEmpty && !passwordEmpty) {
      // if (email === "admin@gmail.com") {
      //   console.log("Admin login successful, redirecting to dashboard...");
      //   navigate("/dashboard");
      // } 
      if (email === "clean@gmail.com") {
        console.log("Cleaner login successful, redirecting to cleaner profile...");
        navigate("/cleaner-profile");
      } else if (email === "platform@gmail.com") {
        console.log("Platform Manager login successful, redirecting to platform management...");
        navigate("/platform-management");
      } else {
        console.log("Login successful, but no specific route assigned. Staying on login.");
      }
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="new-header">
          <h2 className="title-text">Welcome Back</h2>
          <p className="subtext">Login to your account</p>
        </div>

        <div className="group">
          <div className="groups">
            <label>Email</label>
            <div className={`inputs ${errors.email ? "error" : ""}`}>
              <img src={mail_icon || "/placeholder.svg"} alt="email icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={errors.email ? "This field must be filled in!" : "your@mail.com"}
              />
            </div>
          </div>

          <div className="groups">
            <label>Password</label>
            <div className={`inputs ${errors.password ? "error" : ""}`}>
              <img src={lock_icon || "/placeholder.svg"} alt="lock icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={errors.password ? "This field must be filled in!" : "Password"}
              />
              <img
                src={showPassword ? visibility_on : visibility_off}
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                alt="Toggle visibility"
              />
            </div>
          </div>

          <button className="new-login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}