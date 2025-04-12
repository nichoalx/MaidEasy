import { Star, ArrowLeft } from "lucide-react"

import "./service-page.css"

export default function OfficeCleaningPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="service-header">
        <div className="header-container">
          <Link href="/" className="logo-link">
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
        <Link href="/" className="back-button">
          <ArrowLeft size={16} className="back-icon" />
          Back to Home
        </Link>
      </div>

      {/* Service Details */}
      <section className="service-details">
        <div className="service-container">
          <div className="service-icon-wrapper">
            <div className="service-icon-bg">
              <Star size={48} />
            </div>
          </div>

          <h1 className="service-title">Office Cleaning Services</h1>

          <div className="service-content">
            <p className="service-intro">
              Our professional office cleaning services are designed to create a clean, healthy, and productive work
              environment. We understand that a clean office makes a great impression on clients and boosts employee
              morale.
            </p>

            <div className="service-features">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Office Cleaning"
                width={400}
                height={300}
                className="service-image"
              />
              <div className="service-offers">
                <h2 className="offers-title">What We Offer</h2>
                <ul className="offers-list">
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Regular office cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Carpet and upholstery cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Restroom sanitization</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Kitchen and break room cleaning</span>
                  </li>
                  <li className="offers-item">
                    <span className="check-mark">✓</span>
                    <span>Window and glass cleaning</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="process-section">
              <h2 className="process-title">Our Approach</h2>
              <ol className="process-list">
                <li className="process-item">
                  <span className="process-number">1</span>
                  <div>
                    <h3 className="process-step">Consultation</h3>
                    <p className="process-description">
                      We meet with you to understand your office cleaning requirements.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">2</span>
                  <div>
                    <h3 className="process-step">Custom Cleaning Schedule</h3>
                    <p className="process-description">
                      We develop a cleaning schedule that works around your business hours.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">3</span>
                  <div>
                    <h3 className="process-step">Professional Service</h3>
                    <p className="process-description">
                      Our trained professionals clean your office with minimal disruption.
                    </p>
                  </div>
                </li>
                <li className="process-item">
                  <span className="process-number">4</span>
                  <div>
                    <h3 className="process-step">Quality Assurance</h3>
                    <p className="process-description">Regular inspections ensure consistent cleaning standards.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="cta-section">
              <h2 className="cta-title">Ready for a Cleaner Office?</h2>
              <p className="cta-description">
                Contact us today to schedule your office cleaning service or request a free quote.
              </p>
              <button className="cta-button">Get a Quote</button>
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
                  <Link href="#" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Know More</h4>
              <ul className="footer-list">
                <li>
                  <Link href="#" className="footer-link">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Terms & conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-copyright">
            <p>2024 "Procleaning" All Rights Received</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
