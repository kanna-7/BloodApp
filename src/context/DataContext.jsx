import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext(null)

const STORAGE_KEYS = {
  donors: 'bloodmate_donors',
  seekers: 'bloodmate_seekers',
  emergencies: 'bloodmate_emergencies',
  posts: 'bloodmate_posts',
  loginLogs: 'bloodmate_login_logs',
}

const DEMO_DONORS = [
  { id: 'demo1', name: 'Alex Johnson', email: 'alex@demo.com', mobile: '+1 555 0100', bloodGroup: 'O+', location: 'New York', donateType: 'free', isEligible: true },
  { id: 'demo2', name: 'Sarah Williams', email: 'sarah@demo.com', mobile: '+1 555 0101', bloodGroup: 'A+', location: 'New York', donateType: 'free', isEligible: true },
  { id: 'demo3', name: 'Mike Davis', email: 'mike@demo.com', mobile: '+1 555 0102', bloodGroup: 'B+', location: 'Brooklyn', donateType: 'paid', isEligible: true },
]

function loadFromStorage(key, defaultVal = []) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultVal
  } catch {
    return defaultVal
  }
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function DataProvider({ children }) {
  const [donors, setDonors] = useState([])
  const [seekers, setSeekers] = useState([])
  const [emergencies, setEmergencies] = useState([])
  const [posts, setPosts] = useState([])
  const [loginLogs, setLoginLogs] = useState([])

  useEffect(() => {
    const stored = loadFromStorage(STORAGE_KEYS.donors)
    const initial = stored.length > 0 ? stored : DEMO_DONORS
    if (stored.length === 0) saveToStorage(STORAGE_KEYS.donors, DEMO_DONORS)
    setDonors(initial)
    setSeekers(loadFromStorage(STORAGE_KEYS.seekers))
    setEmergencies(loadFromStorage(STORAGE_KEYS.emergencies))
    setPosts(loadFromStorage(STORAGE_KEYS.posts))
    setLoginLogs(loadFromStorage(STORAGE_KEYS.loginLogs))
  }, [])

  const addLoginLog = (log) => {
    const newLog = {
      id: Date.now().toString(),
      userId: log.userId,
      email: log.email,
      name: log.name,
      type: log.type,
      timestamp: new Date().toISOString(),
    }
    setLoginLogs((prev) => {
      const next = [newLog, ...prev]
      saveToStorage(STORAGE_KEYS.loginLogs, next)
      return next
    })
  }

  const addDonor = (donor) => {
    const newDonor = { ...donor, id: Date.now().toString() }
    const next = [...donors, newDonor]
    setDonors(next)
    saveToStorage(STORAGE_KEYS.donors, next)
    return newDonor
  }

  const updateDonor = (id, updates) => {
    const next = donors.map((d) => (d.id === id ? { ...d, ...updates } : d))
    setDonors(next)
    saveToStorage(STORAGE_KEYS.donors, next)
  }

  const addSeeker = (seeker) => {
    const newSeeker = { ...seeker, id: Date.now().toString() }
    const next = [...seekers, newSeeker]
    setSeekers(next)
    saveToStorage(STORAGE_KEYS.seekers, next)
    return newSeeker
  }

  const createEmergency = (emergency) => {
    const newEmergency = {
      ...emergency,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'active',
    }
    const next = [newEmergency, ...emergencies]
    setEmergencies(next)
    saveToStorage(STORAGE_KEYS.emergencies, next)
    return newEmergency
  }

  const resolveEmergency = (id) => {
    const next = emergencies.map((e) =>
      e.id === id ? { ...e, status: 'resolved' } : e
    )
    setEmergencies(next)
    saveToStorage(STORAGE_KEYS.emergencies, next)
  }

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    }
    const next = [newPost, ...posts]
    setPosts(next)
    saveToStorage(STORAGE_KEYS.posts, next)
  }

  const likePost = (postId) => {
    const next = posts.map((p) =>
      p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
    )
    setPosts(next)
    saveToStorage(STORAGE_KEYS.posts, next)
  }

  const getEligibleDonors = (bloodGroup, location) => {
    return donors.filter(
      (d) =>
        d.isEligible &&
        d.bloodGroup === bloodGroup &&
        d.location?.toLowerCase().includes(location?.toLowerCase())
    )
  }

  const getDonorsNearLocation = (location) => {
    if (!location) return donors.filter((d) => d.isEligible)
    return donors.filter(
      (d) =>
        d.isEligible &&
        d.location?.toLowerCase().includes(location?.toLowerCase())
    )
  }

  return (
    <DataContext.Provider
      value={{
        donors,
        seekers,
        emergencies,
        posts,
        loginLogs,
        addDonor,
        updateDonor,
        addSeeker,
        createEmergency,
        resolveEmergency,
        addPost,
        likePost,
        addLoginLog,
        getEligibleDonors,
        getDonorsNearLocation,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
