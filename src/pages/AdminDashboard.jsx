import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import { useData } from '../context/DataContext'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const { donors, seekers, emergencies, posts, loginLogs } = useData()

  const stats = useMemo(() => {
    const totalDonors = donors.length
    const totalSeekers = seekers.length
    const totalLogins = loginLogs.length
    const uniqueUserLogins = new Set(loginLogs.map((l) => l.userId)).size
    const todayLogins = loginLogs.filter((l) => {
      const d = new Date(l.timestamp)
      const today = new Date()
      return d.toDateString() === today.toDateString()
    }).length
    const weekLogins = loginLogs.filter((l) => {
      const d = new Date(l.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return d >= weekAgo
    }).length

    const donorLogins = loginLogs.filter((l) => l.type === 'donor').length
    const seekerLogins = loginLogs.filter((l) => l.type === 'seeker').length

    return {
      totalDonors,
      totalSeekers,
      totalLogins,
      uniqueUserLogins,
      todayLogins,
      weekLogins,
      donorLogins,
      seekerLogins,
      totalEmergencies: emergencies.length,
      activeEmergencies: emergencies.filter((e) => e.status === 'active').length,
      totalPosts: posts.length,
    }
  }, [donors, seekers, loginLogs, emergencies, posts])

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleString()
  }

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Monitor users, logins, and platform usage</p>
        </header>

        <section className="admin-stats">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{stats.totalDonors}</span>
              <span className="stat-label">Total Donors</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.totalSeekers}</span>
              <span className="stat-label">Total Seekers</span>
            </div>
            <div className="stat-card stat-highlight">
              <span className="stat-value">{stats.totalLogins}</span>
              <span className="stat-label">Total Logins</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.uniqueUserLogins}</span>
              <span className="stat-label">Unique Users Logged In</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.todayLogins}</span>
              <span className="stat-label">Logins Today</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.weekLogins}</span>
              <span className="stat-label">Logins (Last 7 Days)</span>
            </div>
          </div>
        </section>

        <section className="admin-stats">
          <h2>Platform Usage</h2>
          <div className="stats-grid stats-compact">
            <div className="stat-card">
              <span className="stat-value">{stats.donorLogins}</span>
              <span className="stat-label">Donor Logins</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.seekerLogins}</span>
              <span className="stat-label">Seeker Logins</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.totalEmergencies}</span>
              <span className="stat-label">Total Emergencies</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.activeEmergencies}</span>
              <span className="stat-label">Active Emergencies</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.totalPosts}</span>
              <span className="stat-label">Feed Posts</span>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <h2>Login History</h2>
          <p className="admin-desc">All login events are saved. Recent logins below.</p>
          {loginLogs.length === 0 ? (
            <div className="admin-empty">No login data yet.</div>
          ) : (
            <div className="login-table-wrap">
              <table className="login-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {loginLogs.slice(0, 50).map((log) => (
                    <tr key={log.id}>
                      <td>{log.name}</td>
                      <td>{log.email}</td>
                      <td>
                        <span className={`type-badge type-${log.type}`}>
                          {log.type}
                        </span>
                      </td>
                      <td>{formatDate(log.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
