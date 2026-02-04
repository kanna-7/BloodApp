import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignupChoice from './pages/SignupChoice'
import DonorSignup from './pages/DonorSignup'
import SeekerSignup from './pages/SeekerSignup'
import DonorDashboard from './pages/DonorDashboard'
import SeekerDashboard from './pages/SeekerDashboard'
import EmergencyAlert from './pages/EmergencyAlert'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function ProtectedRoute({ children, allowedTypes }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (allowedTypes && !allowedTypes.includes(user.type)) {
    return <Navigate to="/" replace />
  }
  return children
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading Bloodmate...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={user ? <Navigate to={user.type === 'admin' ? '/admin' : user.type === 'donor' ? '/donor' : '/seeker'} replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" replace /> : <SignupChoice />}
      />
      <Route
        path="/signup/donor"
        element={user ? <Navigate to="/" replace /> : <DonorSignup />}
      />
      <Route
        path="/signup/seeker"
        element={user ? <Navigate to="/" replace /> : <SeekerSignup />}
      />
      <Route
        path="/donor"
        element={
          <ProtectedRoute allowedTypes={['donor']}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seeker"
        element={
          <ProtectedRoute allowedTypes={['seeker']}>
            <SeekerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/emergency"
        element={
          <ProtectedRoute>
            <EmergencyAlert />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedTypes={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
