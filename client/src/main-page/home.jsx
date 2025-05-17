import { Link } from "react-router-dom"
import { Home, Star, Trash2, Send, Search, ArrowRight } from "lucide-react"
import logoImg from "../Assets/nick.png"
import livingRoomBg from "../Assets/livingroom.png";
import "./home.css";

export default function HomePage() {
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
          <button
            className="login-button"
            onClick={() => window.open("/login", "_self")}
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-background"
          style={{
            backgroundImage: `url(${livingRoomBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="hero-overlay" />
        </div>


        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">A New Solutions For Your Home Cleaning</h2>
              <p className="hero-description">
                Lorem ipsum dolor sit amet, consectetur dipiscing <br />elit eius mod tempor incididunt ut labore
              </p>
              <div className="search-container">
                <input type="text" placeholder="What service do you want to search?" className="search-input" />
                <Search className="search-icon" size={20} />
              </div>
            </div>
            <div className="hero-image-container">
              {/* Fallback to placeholder if image fails to load */}
              <img
                src={logoImg || "/placeholder.svg"}
                alt="Cleaning professional"
                width={400}
                height={500}
                className="hero-image"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.svg"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <div className="services-title-container">
              <h2 className="services-title">Always Provide The <br />Best Service</h2>
            </div>
            <div className="services-subtitle-container">
              <h3 className="services-subtitle">Our Services</h3>
              <p className="services-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, <br />sed do eiusmod tempor incididunt ut labore
              </p>
            </div>
          </div>

          <div className="services-grid">
            {/* House Cleaning */}
            <Link to="/services/house-cleaning" className="service-link">
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
            </Link>

            {/* Office Cleaning */}
            <Link to="/services/office-cleaning" className="service-link">
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
            </Link>

            {/* Toilet Cleaning */}
            <Link to="/services/toilet-cleaning" className="service-link">
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
            </Link>

            {/* Window Cleaning */}
            <Link to="/services/window-cleaning" className="service-link">
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
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-info">
              <p className="footer-text">
                Stay updated with our latest cleaning tips, service updates, and helpful articles on maintaining a
                spotless home.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li>
                  <Link to="#" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="footer-link">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="#" className="footer-link">
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Know More</h4>
              <ul className="footer-list">
                <li>
                  <Link to="#" className="footer-link">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="#" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="footer-link">
                    Terms & conditions
                  </Link>
                </li>
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