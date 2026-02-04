import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import './Auth.css'

export default function SeekerSignup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addSeeker, addLoginLog } = useData()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    location: '',
  })
  const [error, setError] = useState('')

  const updateForm = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password || !form.mobile || !form.location) {
      setError('Please fill all required fields')
      return
    }
    const newSeeker = addSeeker(form)
    addLoginLog({ userId: newSeeker.id, email: newSeeker.email, name: newSeeker.name, type: 'seeker' })
    login({
      ...newSeeker,
      type: 'seeker',
    })
    navigate('/seeker')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/signup" className="auth-back">← Back</Link>
        <div className="auth-header">
          <span className="auth-logo">❤️</span>
          <h1>Seeker Registration</h1>
          <p>Create account to find donors</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              value={form.name}
              onChange={(e) => updateForm('name', e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm('email', e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateForm('password', e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number *</label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) => updateForm('mobile', e.target.value)}
              placeholder="+1 234 567 8900"
              required
            />
          </div>
          <div className="form-group">
            <label>Location / City *</label>
            <input
              value={form.location}
              onChange={(e) => updateForm('location', e.target.value)}
              placeholder="New York, NY"
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-full">
            Create Account
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
