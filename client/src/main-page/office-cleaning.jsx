import { Link } from "react-router-dom"
import { Trash2, ArrowLeft } from "lucide-react"


export default function ToiletCleaningPage() {
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
              <Trash2 size={48} />
            </div>
          </div>

          <h1 className="service-title">Toilet Cleaning Services</h1>

          <div className="service-content">
            <p className="service-intro">
              Our professional toilet cleaning services ensure your bathrooms are not just clean, but thoroughly
              sanitized and disinfected. We use hospital-grade cleaning agents to eliminate germs and bacteria, leaving
              your toilets fresh and hygienic.
            </p>

            <div className="service-features">
              <img
                src="/placeholder.svg"
                alt="Toilet Cleaning"
                width={400}
                height={300}
                className="service-image"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://placehold.co/400x300?text=Toilet+Cleaning"
                }}
              />
              <div className="service-offers">
                <h2 className="offers-title">What We Offer</h2>
                <ul className="offers-list">
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Deep toilet bowl cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Sink and counter sanitization</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Mirror and glass cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Floor disinfection</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Odor elimination</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rest of the component remains the same */}
            <div className="process-section">
              <h2 className="process-title">Our Cleaning Process</h2>
              <ol className="process-list">
                <li className="process-item">
                  <span className="process-number">1</span>
                  <div>
                    <h3 className="process-step">Pre-treatment</h3>
                    <p className="process-description">
                      We apply specialized cleaning agents to break down stains and buildup.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">2</span>
                  <div>
                    <h3 className="process-step">Deep Cleaning</h3>
                    <p className="process-description">
                      We thoroughly clean all surfaces, paying special attention to high-touch areas.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">3</span>
                  <div>
                    <h3 className="process-step">Sanitization</h3>
                    <p className="process-description">
                      We use hospital-grade disinfectants to eliminate germs and bacteria.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">4</span>
                  <div>
                    <h3 className="process-step">Final Touch</h3>
                    <p className="process-description">
                      We polish fixtures and apply air fresheners for a pleasant environment.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="cta-section">
              <h2 className="cta-title">Need Professional Toilet Cleaning?</h2>
              <p className="cta-description">
                Contact us today to schedule your toilet cleaning service or request a free quote.
              </p>
              <button className="cta-button">Schedule Service</button>
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
