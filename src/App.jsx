import React, { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing', 'sign-up', 'sign-in', 'dashboard'
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on mount — verify token with backend
  useEffect(() => {
    let mounted = true
    const init = async () => {
      const savedToken = localStorage.getItem('authToken')
      const savedUser = localStorage.getItem('user')

      if (savedToken) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
          
          const res = await fetch(`${API_BASE}/api/auth/me`, {
            headers: { Authorization: `Bearer ${savedToken}` },
            signal: controller.signal,
          })
          clearTimeout(timeoutId)
          
          if (!res.ok) throw new Error('Invalid token')
          const userData = await res.json()
          if (!mounted) return
          localStorage.setItem('user', JSON.stringify(userData))
          setToken(savedToken)
          setUser(userData)
          setCurrentPage('dashboard')
        } catch (err) {
          // invalid/expired token -> clear and show landing
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
          if (!mounted) return
          setToken(null)
          setUser(null)
          setCurrentPage('landing')
        }
      } else if (savedUser) {
        // no token but user object present (stale) - clear it
        localStorage.removeItem('user')
        if (!mounted) return
        setCurrentPage('landing')
      } else {
        if (!mounted) return
        setCurrentPage('landing')
      }

      if (mounted) setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [])

  const handleSignUp = async (name, email, password) => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed')
      }
      
      // Store token and user in localStorage
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      setToken(data.token)
      setUser(data.user)
      setCurrentPage('dashboard')
      
      console.log('✅ Signup successful:', data.user)
    } catch (error) {
      console.error('❌ Signup error:', error.message)
      if (error.name === 'AbortError') {
        throw new Error('Backend not responding. Please try again or check backend deployment.')
      }
      throw error
    }
  }

  const handleSignIn = async (email, password) => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }
      
      // Store token and user in localStorage
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      setToken(data.token)
      setUser(data.user)
      setCurrentPage('dashboard')
      
      console.log('✅ Login successful:', data.user)
    } catch (error) {
      console.error('❌ Login error:', error.message)
      if (error.name === 'AbortError') {
        throw new Error('Backend not responding. Please try again or check backend deployment.')
      }
      throw error
    }
  }

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    setToken(null)
    setUser(null)
    setCurrentPage('sign-in')
    
    console.log('✅ Logout successful')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-green-400">
            CrowdLocal
          </div>
          <p className="text-slate-400 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Debug indicator */}
      <div style={{position: 'fixed', top: 10, left: 10, background: 'rgba(0,0,0,0.8)', color: '#00FF7F', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', zIndex: 9999}}>
        Page: {currentPage}
      </div>
      
      {currentPage === 'landing' && (
        <Landing onGetStarted={() => setCurrentPage('sign-up')} />
      )}
      {currentPage === 'sign-up' && (
        <SignUp onSuccess={handleSignUp} onSwitchToSignIn={() => setCurrentPage('sign-in')} />
      )}
      {currentPage === 'sign-in' && (
        <SignIn onSuccess={handleSignIn} onSwitchToSignUp={() => setCurrentPage('sign-up')} />
      )}
      {currentPage === 'dashboard' && user && (
        <Dashboard user={user} token={token} onLogout={handleLogout} />
      )}
    </>
  )
}
