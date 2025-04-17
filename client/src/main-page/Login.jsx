import React, { useState } from "react";
import "./LoginSignup.css";

import mail_icon from "../Assets/mail_icon.png";
import lock_icon from "../Assets/lock_icon.png";
import visibility_on from "../Assets/visibility_on.png";
import visibility_off from "../Assets/visibility_off.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleLogin = () => {
    const emailEmpty = email.trim() === "";
    const passwordEmpty = password.trim() === "";
    setErrors({ email: emailEmpty, password: passwordEmpty });

    if (!emailEmpty && !passwordEmpty) {
      // Proceed with login logic
      alert("Logging in...");
    }
  };

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
              <img src={mail_icon} alt="email icon" />
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
              <img src={lock_icon} alt="lock icon" />
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

          <button className="new-login-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}