import React from 'react'
import {
  Home,
  Star,
  Trash2,
  Send,
  Search,
  ArrowRight,
} from 'lucide-react'

import './App.css';
import logoImg from './assets/nick.png'

export default function CleaningServiceLanding() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <h1 className="logo-text">
              Garuda
              <br />
              Indonesia
            </h1>
          </div>
          <button className="login-button">Login</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-curve"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">
                A New Solutions For Your Home Cleaning
              </h2>
              <p className="hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                eius mod tempor incididunt ut labore
              </p>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="What service do you want to search?"
                  className="search-input"
                />
                <Search className="search-icon" size={20} />
              </div>
            </div>
            <div className="hero-image-container">
              <img
                src={logoImg}
                alt="Cleaning professional"
                width={400}
                height={500}
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <div className="services-title-container">
              <h2 className="services-title">
                Always Provide The Best Service
              </h2>
            </div>
            <div className="services-subtitle-container">
              <h3 className="services-subtitle">Our Services</h3>
              <p className="services-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
              </p>
            </div>
          </div>

          <div className="services-grid">
            {/* House Cleaning */}
            <a href="/services/house-cleaning" className="service-link">
              <div className="service-card">
                <div className="service-icon-container">
                  <div className="service-icon">
                    <Home size={48} />
                  </div>
                </div>
                <h3 className="service-card-title">House Cleaning</h3>
                <p className="service-card-description">
                  Make your product more eye-catching with a touch of illustration
                </p>
                <div className="service-learn-more">
                  <span className="learn-more-text">Learn more</span>
                  <ArrowRight size={16} className="learn-more-icon" />
                </div>
              </div>
            </a>

            {/* Office Cleaning */}
            <a href="/services/office-cleaning" className="service-link">
              <div className="service-card">
                <div className="service-icon-container">
                  <div className="service-icon">
                    <Star size={48} />
                  </div>
                </div>
                <h3 className="service-card-title">Office Cleaning</h3>
                <p className="service-card-description">
                  Make your product more eye-catching with a touch of illustration
                </p>
                <div className="service-learn-more">
                  <span className="learn-more-text">Learn more</span>
                  <ArrowRight size={16} className="learn-more-icon" />
                </div>
              </div>
            </a>

            {/* Toilet Cleaning */}
            <a href="/services/toilet-cleaning" className="service-link">
              <div className="service-card">
                <div className="service-icon-container">
                  <div className="service-icon">
                    <Trash2 size={48} />
                  </div>
                </div>
                <h3 className="service-card-title">Toilet Cleaning</h3>
                <p className="service-card-description">
                  Make your product more eye-catching with a touch of illustration
                </p>
                <div className="service-learn-more">
                  <span className="learn-more-text">Learn more</span>
                  <ArrowRight size={16} className="learn-more-icon" />
                </div>
              </div>
            </a>

            {/* Window Cleaning */}
            <a href="/services/window-cleaning" className="service-link">
              <div className="service-card">
                <div className="service-icon-container">
                  <div className="service-icon">
                    <Send size={48} />
                  </div>
                </div>
                <h3 className="service-card-title">Window Cleaning</h3>
                <p className="service-card-description">
                  Make your product more eye-catching with a touch of illustration
                </p>
                <div className="service-learn-more">
                  <span className="learn-more-text">Learn more</span>
                  <ArrowRight size={16} className="learn-more-icon" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-info">
              <p className="footer-text">
                Stay updated with our latest cleaning tips, service updates, and helpful articles on maintaining a spotless home.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Services</a></li>
                <li><a href="#" className="footer-link">Our Team</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Know More</h4>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Support</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms & conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-copyright">
            <p>2024 "Procleaning" All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
