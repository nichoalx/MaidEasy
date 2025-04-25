import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Import the auth hook
import "./LoginSignup.css";
import mail_icon from "../assets/mail_icon.png";
import lock_icon from "../assets/lock_icon.png";
import visibility_on from "../assets/visibility_on.png";
import visibility_off from "../assets/visibility_off.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ 
    email: false, 
    password: false,
    emailInvalid: false,
  });
  const { login, error: authError, loading } = useAuth(); // Destructure from useAuth
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const emailEmpty = email.trim() === "";
    const passwordEmpty = password.trim() === "";
    const emailValid = validateEmail(email);
    
    setErrors({ 
      email: emailEmpty, 
      password: passwordEmpty,
      emailInvalid: !emailEmpty && !emailValid,
    });

    if (!emailEmpty && !passwordEmpty && emailValid) {
      try {
        await login(email, password); // Uses the login function from useAuth
        
      } catch (err) {
        // Error is already handled by useAuth
        console.error("Login error:", err);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="new-header">
          <h2 className="title-text">Welcome Back</h2>
          <p className="subtext">Login to your account</p>
          {authError && (
            <div className="error-message">
              {authError}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="group">
            <div className="groups">
              <label>Email</label>
              <div className={`inputs ${errors.email || errors.emailInvalid ? "error" : ""}`}>
                <img src={mail_icon} alt="email icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    errors.email ? "This field must be filled in!" : 
                    errors.emailInvalid ? "Please enter a valid email" :
                    "your@mail.com"
                  }
                  disabled={loading}
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
                  placeholder={
                    errors.password ? "This field must be filled in!" : "Password"
                  }
                  disabled={loading}
                />
                <img
                  src={showPassword ? visibility_on : visibility_off}
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  alt="Toggle visibility"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="new-login-button" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}