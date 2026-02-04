import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import './SeekerDashboard.css'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function SeekerDashboard() {
  const { user } = useAuth()
  const { getDonorsNearLocation } = useData()
  const [bloodFilter, setBloodFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState(user?.location || '')
  const [searchLocation, setSearchLocation] = useState(user?.location || '')

  const nearbyDonors = useMemo(() => {
    const loc = searchLocation || locationFilter || user?.location
    return getDonorsNearLocation(loc)
  }, [getDonorsNearLocation, searchLocation, locationFilter, user?.location])

  const filteredDonors = useMemo(() => {
    if (!bloodFilter) return nearbyDonors
    return nearbyDonors.filter((d) => d.bloodGroup === bloodFilter)
  }, [nearbyDonors, bloodFilter])

  const handleSearch = (e) => {
    e?.preventDefault()
    setSearchLocation(locationFilter)
  }

  return (
    <div className="seeker-dashboard">
      <Navbar />
      <div className="seeker-content">
        <header className="seeker-header">
          <h1>Find Blood Donors</h1>
          <p>Browse donors available near you. Contact them directly for help.</p>
        </header>

        <div className="search-filters">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Enter city or location..."
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
          <div className="blood-filters">
            <span>Filter by blood:</span>
            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
            >
              <option value="">All</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="donors-grid">
          {filteredDonors.length === 0 ? (
            <div className="no-donors">
              <p>No donors found in this location.</p>
              <p>Try adjusting your search or check back later.</p>
            </div>
          ) : (
            filteredDonors.map((donor) => (
              <div key={donor.id} className="donor-card">
                <div className="donor-card-header">
                  <div className="donor-avatar">{donor.name?.[0]?.toUpperCase()}</div>
                  <span className="donor-blood">{donor.bloodGroup}</span>
                </div>
                <h3>{donor.name}</h3>
                <p className="donor-location">📍 {donor.location}</p>
                <p className="donor-type">
                  {donor.donateType === 'paid' ? '💰 Paid' : '🆓 Free'}
                </p>
                <a href={`tel:${donor.mobile}`} className="btn-contact">
                  📞 Call
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
