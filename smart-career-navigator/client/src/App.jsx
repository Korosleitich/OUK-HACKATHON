import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import SkillGraph from './components/SkillGraph'
import JobSignals from './components/JobSignals'
import LearningPath from './components/LearningPath'
import ResumeUpload from './components/ResumeUpload'
import ThemeSwitcher from './components/ThemeSwitcher'
import JacClientDemo from './components/JacClientDemo'
import './themes.css'

function App() {
  const [theme, setTheme] = useState('modern')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize app
    const init = async () => {
      try {
        const res = await fetch('/api/health')
        if (res.ok) {
          console.log('✅ Backend connected!')
        }
      } catch (error) {
        console.log('⚠️  Backend not ready yet')
      }
      
      setLoading(false)
    }
    
    init()
  }, [])

  const handleResumeUpload = async (data) => {
    // In real app: await fetch('/api/upload', ...)
    // For demo:
    const mockUser = {
      id: 'user_' + Date.now(),
      name: data.name || 'Hackathon User',
      skills: ['Python', 'JavaScript', 'React'],
      experience: 3,
      wow: '✨ Resume parsed with Jaseci AI!'
    }
    
    setUser(mockUser)
    localStorage.setItem('career_user', JSON.stringify(mockUser))
    
    return mockUser
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="sparkle">✨</div>
        <h1>Smart Career Navigator</h1>
        <p>Initializing Jaseci AI...</p>
        <div className="loader"></div>
        <p className="hint">Hackathon Ready! 🚀</p>
      </div>
    )
  }

  return (
    <Router>
      <div className={`app ${theme}`}>
        <header className="app-header">
          <div className="logo">
            <h1>🚀 Smart Career Navigator</h1>
            <p>AI-powered with Jaseci OSP & byLLM</p>
          </div>
          <div className="header-right">
            <ThemeSwitcher theme={theme} onChange={setTheme} />
            {user && <span className="user-badge">👤 {user.name}</span>}
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={
              user ? <Dashboard user={user} /> : <ResumeUpload onUpload={handleResumeUpload} />
            } />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/graph" element={<SkillGraph user={user} />} />
            <Route path="/market" element={<JobSignals user={user} />} />
            <Route path="/learn" element={<LearningPath user={user} />} />
            <Route path="/demo" element={<JacClientDemo />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="tech-stack">
            <span className="tech-badge">🔗 OSP Graph</span>
            <span className="tech-badge">🤖 byLLM AI</span>
            <span className="tech-badge">⚡ Jac Client</span>
            <span className="tech-badge">🎯 Career AI</span>
          </div>
          <p>Built for Jaseci Hackathon 2023 • Smart Career Navigator</p>
        </footer>
      </div>
    </Router>
  )
}

export default App