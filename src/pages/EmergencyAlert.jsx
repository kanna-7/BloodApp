import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import './EmergencyAlert.css'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function EmergencyAlert() {
  const { user } = useAuth()
  const { createEmergency, emergencies } = useData()

  const [form, setForm] = useState({
    bloodGroup: '',
    location: user?.location || '',
    contact: user?.mobile || '',
    message: '',
    units: '1',
  })
  const [submitted, setSubmitted] = useState(false)

  const updateForm = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.bloodGroup || !form.location || !form.contact) return
    createEmergency(form)
    setSubmitted(true)
  }

  const activeEmergencies = emergencies.filter((e) => e.status === 'active')

  if (submitted) {
    return (
      <div className="emergency-page">
        <Navbar />
        <div className="emergency-success">
          <h1>🚨 Alert Sent!</h1>
          <p>Your emergency request has been broadcast to all eligible donors in your area.</p>
          <p>They will be notified immediately. Please keep your phone available.</p>
          <Link to={user?.type === 'donor' ? '/donor' : '/seeker'} className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="emergency-page">
      <Navbar />
      <div className="emergency-content">
        <div className="emergency-form-section">
          <h1>🚨 Emergency Blood Request</h1>
          <p className="emergency-desc">
            This will send an urgent alert to all eligible donors. Use only in real emergencies.
          </p>
          <form onSubmit={handleSubmit} className="emergency-form">
            <div className="form-group">
              <label>Blood Group Required *</label>
              <select
                value={form.bloodGroup}
                onChange={(e) => updateForm('bloodGroup', e.target.value)}
                required
              >
                <option value="">Select</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Location / Hospital *</label>
              <input
                value={form.location}
                onChange={(e) => updateForm('location', e.target.value)}
                placeholder="City, Hospital name"
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Number *</label>
              <input
                type="tel"
                value={form.contact}
                onChange={(e) => updateForm('contact', e.target.value)}
                placeholder="+1 234 567 8900"
                required
              />
            </div>
            <div className="form-group">
              <label>Units Needed</label>
              <input
                type="number"
                min="1"
                max="10"
                value={form.units}
                onChange={(e) => updateForm('units', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Additional Message</label>
              <textarea
                value={form.message}
                onChange={(e) => updateForm('message', e.target.value)}
                placeholder="Any additional details..."
                rows={3}
              />
            </div>
            <button type="submit" className="btn-emergency">
              🚨 Send Emergency Alert
            </button>
          </form>
        </div>
        <aside className="emergency-list">
          <h3>Active Emergencies</h3>
          {activeEmergencies.length === 0 ? (
            <p>No active emergencies</p>
          ) : (
            activeEmergencies.map((e) => (
              <div key={e.id} className="emergency-mini-card">
                <span className="emergency-bg">{e.bloodGroup}</span>
                <span>{e.location}</span>
                <a href={`tel:${e.contact}`}>Call</a>
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  )
}
