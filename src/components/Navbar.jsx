import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { emergencies } = useData()
  const navigate = useNavigate()
  const activeEmergencies = emergencies.filter((e) => e.status === 'active')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">🩸</span>
        <span>Bloodmate</span>
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            {user.type === 'admin' && (
              <Link to="/admin">Admin</Link>
            )}
            {user.type === 'donor' && (
              <Link to="/donor">Dashboard</Link>
            )}
            {user.type === 'seeker' && (
              <Link to="/seeker">Find Donors</Link>
            )}
            {user.type !== 'admin' && (
            <Link to="/emergency" className={`nav-emergency ${activeEmergencies.length ? 'has-alerts' : ''}`}>
              🚨 Emergency {activeEmergencies.length ? `(${activeEmergencies.length})` : ''}
            </Link>
            )}
            <button onClick={handleLogout} className="btn-outline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn-primary-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
