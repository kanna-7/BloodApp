import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { donors, seekers, addLoginLog } = useData()
  const navigate = useNavigate()

  const ADMIN_EMAIL = 'admin@bloodmate.com'
  const ADMIN_PASSWORD = 'admin123'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const donor = donors.find((d) => d.email?.toLowerCase() === email.toLowerCase())
    const seeker = seekers.find((s) => s.email?.toLowerCase() === email.toLowerCase())

    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login({
        id: 'admin',
        email: ADMIN_EMAIL,
        name: 'Admin',
        type: 'admin',
      })
      navigate('/admin')
    } else if (donor && donor.password === password) {
      const userData = { id: donor.id, email: donor.email, name: donor.name, type: 'donor', ...donor }
      addLoginLog({ userId: donor.id, email: donor.email, name: donor.name, type: 'donor' })
      login(userData)
      navigate('/donor')
    } else if (seeker && seeker.password === password) {
      const userData = { id: seeker.id, email: seeker.email, name: seeker.name, type: 'seeker', ...seeker }
      addLoginLog({ userId: seeker.id, email: seeker.email, name: seeker.name, type: 'seeker' })
      login(userData)
      navigate('/seeker')
    } else if (donor || seeker) {
      setError('Invalid password')
    } else {
      setError('No account found with this email. Please sign up first.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="auth-back">← Back</Link>
        <div className="auth-header">
          <span className="auth-logo">🩸</span>
          <h1>Welcome Back</h1>
          <p>Login to your Bloodmate account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
