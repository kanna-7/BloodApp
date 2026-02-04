import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>
            Save Lives,
            <span className="highlight"> One Drop at a Time</span>
          </h1>
          <p>
            Connect blood donors with those in need. Be a hero in someone's
            emergency. Join Bloodmate today.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary btn-hero">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline btn-hero">
              Login
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <span className="hero-icon">🩸</span>
            <span>Donate</span>
          </div>
          <div className="hero-card hero-card-2">
            <span className="hero-icon">❤️</span>
            <span>Connect</span>
          </div>
          <div className="hero-card hero-card-3">
            <span className="hero-icon">🚨</span>
            <span>Emergency</span>
          </div>
        </div>
      </section>
      <section className="features">
        <h2>Why Bloodmate?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Eligibility Check</h3>
            <p>Verify weight, height & BMI to ensure you're eligible before donating.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Emergency Buzzer</h3>
            <p>Instant alerts to eligible donors when someone needs blood urgently.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Location Match</h3>
            <p>Find donors near you. Get help fast when it matters most.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Social Feed</h3>
            <p>Stay connected. Share stories. Build a community of lifesavers.</p>
          </div>
        </div>
      </section>
      <section className="cta">
        <h2>Ready to Make a Difference?</h2>
        <p>Sign up as a donor or create an account to request blood in emergencies.</p>
        <Link to="/signup" className="btn-primary btn-lg">
          Join Bloodmate Now
        </Link>
      </section>
      <footer className="footer">
        <p>© 2025 Bloodmate. Save lives, donate blood.</p>
      </footer>
    </div>
  )
}
