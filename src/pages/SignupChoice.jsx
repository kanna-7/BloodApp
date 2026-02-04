import { Link } from 'react-router-dom'
import './Auth.css'

export default function SignupChoice() {
  return (
    <div className="auth-page">
      <div className="auth-container auth-choice">
        <Link to="/" className="auth-back">← Back</Link>
        <div className="auth-header">
          <span className="auth-logo">🩸</span>
          <h1>Join Bloodmate</h1>
          <p>Choose how you want to contribute</p>
        </div>
        <div className="choice-cards">
          <Link to="/signup/donor" className="choice-card">
            <span className="choice-icon">🩸</span>
            <h3>I'm a Donor</h3>
            <p>Donate blood for free or paid. Get eligibility checked. Help save lives.</p>
          </Link>
          <Link to="/signup/seeker" className="choice-card">
            <span className="choice-icon">❤️</span>
            <h3>I Need Blood</h3>
            <p>Find donors near you. Request blood in emergencies. Get help fast.</p>
          </Link>
        </div>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
