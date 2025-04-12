import { Link } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

export default function HouseCleaningPage() {
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
          <button className="login-button">Login</button>
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
              <Home size={48} />
            </div>
          </div>

          <h1 className="service-title">House Cleaning Services</h1>

          <div className="service-content">
            <p className="service-intro">
              Our professional house cleaning services are designed to keep your home spotless and comfortable. We use
              eco-friendly cleaning products and follow a detailed checklist to ensure every corner of your home shines.
            </p>

            <div className="service-features">
              <img
                src="/placeholder.svg"
                alt="House Cleaning"
                width={400}
                height={300}
                className="service-image"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://placehold.co/400x300?text=House+Cleaning"
                }}
              />
              <div className="service-offers">
                <h2 className="offers-title">What We Offer</h2>
                <ul className="offers-list">
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Deep cleaning of all rooms</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Dusting and vacuuming</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Kitchen and bathroom sanitization</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Floor washing and polishing</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Window cleaning (interior)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rest of the component remains the same */}
            <div className="process-section">
              <h2 className="process-title">Our Process</h2>
              <ol className="process-list">
                <li className="process-item">
                  <span className="process-number">1</span>
                  <div>
                    <h3 className="process-step">Initial Assessment</h3>
                    <p className="process-description">
                      We evaluate your home and discuss your specific cleaning needs.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">2</span>
                  <div>
                    <h3 className="process-step">Customized Cleaning Plan</h3>
                    <p className="process-description">
                      We create a tailored cleaning plan based on your requirements.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">3</span>
                  <div>
                    <h3 className="process-step">Professional Cleaning</h3>
                    <p className="process-description">
                      Our trained staff executes the cleaning plan with attention to detail.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">4</span>
                  <div>
                    <h3 className="process-step">Quality Check</h3>
                    <p className="process-description">
                      We perform a thorough inspection to ensure everything meets our high standards.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="cta-section">
              <h2 className="cta-title">Ready to Book?</h2>
              <p className="cta-description">
                Contact us today to schedule your house cleaning service or request a free quote.
              </p>
              <button className="cta-button">Book Now</button>
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
                    Terms & Conditions
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
