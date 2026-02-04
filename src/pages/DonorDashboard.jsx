import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import './DonorDashboard.css'

export default function DonorDashboard() {
  const { user } = useAuth()
  const { emergencies, posts, addPost, likePost } = useData()
  const [postText, setPostText] = useState('')
  const [activeTab, setActiveTab] = useState('feed')

  const activeEmergencies = emergencies.filter((e) => e.status === 'active')

  const handleAddPost = (e) => {
    e.preventDefault()
    if (!postText.trim()) return
    addPost({
      userId: user.id,
      userName: user.name,
      userBlood: user.bloodGroup,
      text: postText.trim(),
    })
    setPostText('')
  }

  return (
    <div className="donor-dashboard">
      <Navbar />
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="profile-card">
            <div className="profile-avatar">{user?.name?.[0]?.toUpperCase() || 'D'}</div>
            <h3>{user?.name || 'Donor'}</h3>
            <span className="blood-badge">{user?.bloodGroup}</span>
            <span className={`status-badge ${user?.isEligible ? 'eligible' : ''}`}>
              {user?.isEligible ? '✓ Eligible' : 'Check eligibility'}
            </span>
            <p className="profile-location">📍 {user?.location}</p>
          </div>
          <nav className="sidebar-nav">
            <button
              className={activeTab === 'feed' ? 'active' : ''}
              onClick={() => setActiveTab('feed')}
            >
              📱 Feed
            </button>
            <button
              className={activeTab === 'alerts' ? 'active' : ''}
              onClick={() => setActiveTab('alerts')}
            >
              🚨 Alerts ({activeEmergencies.length})
            </button>
          </nav>
        </aside>
        <main className="main-content">
          {activeTab === 'feed' && (
            <>
              <div className="post-creator">
                <form onSubmit={handleAddPost}>
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Share your donation story or encouragement..."
                    rows={3}
                  />
                  <button type="submit" className="btn-primary">
                    Post
                  </button>
                </form>
              </div>
              <div className="feed">
                {posts.length === 0 ? (
                  <div className="empty-feed">
                    <p>No posts yet. Be the first to share!</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="feed-card">
                      <div className="feed-card-header">
                        <div className="feed-avatar">{post.userName?.[0]}</div>
                        <div>
                          <strong>{post.userName}</strong>
                          <span className="feed-blood">{post.userBlood}</span>
                        </div>
                      </div>
                      <p className="feed-text">{post.text}</p>
                      <div className="feed-actions">
                        <button onClick={() => likePost(post.id)}>
                          ❤️ {post.likes || 0}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
          {activeTab === 'alerts' && (
            <div className="alerts-section">
              <h2>Emergency Alerts</h2>
              <p className="alerts-desc">
                When someone needs blood urgently, alerts appear here. All eligible donors in the area get notified.
              </p>
              {activeEmergencies.length === 0 ? (
                <div className="empty-alerts">
                  <p>No active emergencies right now.</p>
                  <Link to="/emergency">Create an emergency request</Link>
                </div>
              ) : (
                <div className="alerts-list">
                  {activeEmergencies.map((alert) => (
                    <div key={alert.id} className="alert-card emergency-card">
                      <span className="alert-badge">🚨 URGENT</span>
                      <h3>Blood needed: {alert.bloodGroup}</h3>
                      <p>{alert.message || 'Emergency blood requirement'}</p>
                      <p className="alert-location">📍 {alert.location}</p>
                      <p className="alert-contact">📞 {alert.contact}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
