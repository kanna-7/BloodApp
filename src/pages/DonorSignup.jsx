import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { checkEligibility } from '../utils/eligibility'
import './Auth.css'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function DonorSignup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addDonor, addLoginLog } = useData()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    age: '',
    bloodGroup: '',
    location: '',
    donateType: 'free', // free or paid
    weight: '',
    height: '',
    lastDonation: '',
  })
  const [eligibilityResult, setEligibilityResult] = useState(null)
  const [error, setError] = useState('')

  const updateForm = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  const handleCheckEligibility = () => {
    const weight = parseFloat(form.weight)
    const height = parseFloat(form.height)
    const age = parseInt(form.age, 10)

    if (!weight || !height || !age) {
      setError('Please enter weight, height, and age')
      return null
    }

    const result = checkEligibility(weight, height, age)
    setEligibilityResult(result)
    if (result.eligible) setError('')
    else setError(result.reason)
    return result
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (step === 1) {
      if (!form.name || !form.email || !form.password || !form.mobile || !form.age) {
        setError('Please fill all required fields')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!form.bloodGroup || !form.location || !form.donateType) {
        setError('Please fill all required fields')
        return
      }
      setStep(3)
    } else if (step === 3) {
      const result = handleCheckEligibility()
      if (!result) return
      if (!result.eligible) return
      setStep(4)
    } else {
      const donorData = {
        ...form,
        isEligible: eligibilityResult.eligible,
        bmi: eligibilityResult.bmi,
      }
      const newDonor = addDonor(donorData)
      addLoginLog({ userId: newDonor.id, email: newDonor.email, name: newDonor.name, type: 'donor' })
      login({
        ...newDonor,
        type: 'donor',
      })
      navigate('/donor')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container auth-wide">
        <Link to="/signup" className="auth-back">← Back</Link>
        <div className="auth-header">
          <span className="auth-logo">🩸</span>
          <h1>Donor Registration</h1>
          <p>Step {step} of 4</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          {step === 1 && (
            <>
              <div className="form-row">
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
                  <label>Age (18-65) *</label>
                  <input
                    type="number"
                    min="18"
                    max="65"
                    value={form.age}
                    onChange={(e) => updateForm('age', e.target.value)}
                    placeholder="25"
                    required
                  />
                </div>
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
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>Blood Group *</label>
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
                <label>Location / City *</label>
                <input
                  value={form.location}
                  onChange={(e) => updateForm('location', e.target.value)}
                  placeholder="New York, NY"
                  required
                />
              </div>
              <div className="form-group">
                <label>Donation Type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="donateType"
                      value="free"
                      checked={form.donateType === 'free'}
                      onChange={(e) => updateForm('donateType', e.target.value)}
                    />
                    <span>Free (Voluntary)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="donateType"
                      value="paid"
                      checked={form.donateType === 'paid'}
                      onChange={(e) => updateForm('donateType', e.target.value)}
                    />
                    <span>Paid</span>
                  </label>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="eligibility-section">
                <h3>Eligibility Check (Weight & Height)</h3>
                <p className="eligibility-desc">
                  Min weight: 45 kg. BMI must be 18.5 - 29.9
                </p>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="30"
                    max="200"
                    value={form.weight}
                    onChange={(e) => updateForm('weight', e.target.value)}
                    placeholder="65"
                  />
                </div>
                <div className="form-group">
                  <label>Height (cm) *</label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={form.height}
                    onChange={(e) => updateForm('height', e.target.value)}
                    placeholder="170"
                  />
                </div>
              </div>
              {eligibilityResult && (
                <div className={`eligibility-result ${eligibilityResult.eligible ? 'success' : 'fail'}`}>
                  <strong>{eligibilityResult.eligible ? '✓ Eligible' : '✗ Not Eligible'}</strong>
                  <p>{eligibilityResult.reason}</p>
                  {eligibilityResult.bmi && <small>BMI: {eligibilityResult.bmi}</small>}
                </div>
              )}
              <button
                type="button"
                className="btn-outline btn-full"
                onClick={handleCheckEligibility}
              >
                Check Eligibility
              </button>
            </>
          )}

          {step === 4 && (
            <div className="summary-section">
              <h3>Confirm Your Details</h3>
              <div className="summary-grid">
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Mobile:</strong> {form.mobile}</p>
                <p><strong>Blood:</strong> {form.bloodGroup}</p>
                <p><strong>Location:</strong> {form.location}</p>
                <p><strong>Type:</strong> {form.donateType}</p>
                <p><strong>Eligible:</strong> ✓ Yes (BMI: {eligibilityResult?.bmi})</p>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && step < 4 && (
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </button>
            )}
            <button type="submit" className="btn-primary">
              {step === 4 ? 'Create Account' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
