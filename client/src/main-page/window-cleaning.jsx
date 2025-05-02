import { Link } from "react-router-dom"
import { Send, ArrowLeft } from "lucide-react"


export default function WindowCleaningPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="service-header">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">
              Garuda
              <br />
              Indonesia
            </h1>
          </Link>
          <button
            className="login-button"
            onClick={() => window.open("/login", "_blank")}
          >
            Login
          </button>
        </div>
      </header>

      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/" className="back-button">
          <ArrowLeft size={16} className="back-icon" />
          Back to Home
        </Link>
      </div>

      {/* Service Details */}
      <section className="service-details">
        <div className="service-container">
          <div className="service-icon-wrapper">
            <div className="service-icon-bg">
              <Send size={48} />
            </div>
          </div>

          <h1 className="service-title">Window Cleaning Services</h1>

          <div className="service-content">
            <p className="service-intro">
              Our professional window cleaning services will leave your windows spotless and streak-free. We use
              specialized equipment and techniques to clean windows of all sizes and heights, both interior and
              exterior.
            </p>

            <div className="service-features">
              <img
                src="/placeholder.svg"
                alt="Window Cleaning"
                width={400}
                height={300}
                className="service-image"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://placehold.co/400x300?text=Window+Cleaning"
                }}
              />
              <div className="service-offers">
                <h2 className="offers-title">What We Offer</h2>
                <ul className="offers-list">
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Interior window cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Exterior window cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Screen cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Track and sill cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Hard water stain removal</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="process-section">
              <h2 className="process-title">Our Window Cleaning Process</h2>
              <ol className="process-list">
                <li className="process-item">
                  <span className="process-number">1</span>
                  <div>
                    <h3 className="process-step">Assessment</h3>
                    <p className="process-description">
                      We evaluate your windows and determine the best cleaning approach.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">2</span>
                  <div>
                    <h3 className="process-step">Pre-cleaning</h3>
                    <p className="process-description">We remove dust and debris from frames, tracks, and screens.</p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">3</span>
                  <div>
                    <h3 className="process-step">Washing</h3>
                    <p className="process-description">
                      We use professional-grade solutions to clean the glass thoroughly.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">4</span>
                  <div>
                    <h3 className="process-step">Finishing</h3>
                    <p className="process-description">We squeegee and polish the glass for a streak-free finish.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="cta-section">
              <h2 className="cta-title">Ready for Crystal Clear Windows?</h2>
              <p className="cta-description">
                Contact us today to schedule your window cleaning service or request a free quote.
              </p>
              <button className="cta-button">Get Started</button>
            </div>
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
