import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts'
import { api, mockData } from '../api'
import { 
  Target, TrendingUp, BookOpen, Zap, 
  Award, Briefcase, Users, Star 
} from 'lucide-react'

const Dashboard = ({ user }) => {
  const [targetRole, setTargetRole] = useState('Data Scientist')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [wowEffect, setWowEffect] = useState(false)

  const roles = ['Data Scientist', 'Full Stack Developer', 'AI Engineer', 'DevOps Engineer']

  useEffect(() => {
    if (user) {
      analyzeCareer()
    }
  }, [user, targetRole])

  const analyzeCareer = async () => {
    setLoading(true)
    setWowEffect(true)
    
    try {
      // Try real API first
      const gaps = await api.analyzeGaps(user.id, targetRole)
      const market = await api.getJobMarket(targetRole)
      const path = await api.getLearningPath(user.id, targetRole)
      
      setAnalysis({
        gaps: gaps.report?.[0] || gaps,
        market: market.report?.[0] || market,
        path: path.report?.[0] || path
      })
      
    } catch (error) {
      // Fallback to mock data for demo
      console.log('Using mock data for demo')
      setAnalysis({
        gaps: mockData.analyzeGaps(),
        market: {
          role: targetRole,
          demand_score: 8,
          avg_salary: 120000,
          hot_skills: ['Python', 'ML', 'Cloud']
        },
        path: mockData.getLearningPath()
      })
    }
    
    setLoading(false)
    
    // Reset wow effect
    setTimeout(() => setWowEffect(false), 2000)
  }

  // Chart data
  const skillData = [
    { name: 'Python', level: 8, target: 9 },
    { name: 'JavaScript', level: 7, target: 8 },
    { name: 'React', level: 6, target: 8 },
    { name: 'ML', level: 4, target: 9 },
    { name: 'AWS', level: 5, target: 7 }
  ]

  const roleMatchData = [
    { name: 'Data Scientist', value: 75 },
    { name: 'Full Stack', value: 85 },
    { name: 'AI Engineer', value: 60 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {wowEffect && (
        <div className="wow-overlay">
          <div className="sparkle">✨</div>
          <p>Jaseci AI working its magic!</p>
        </div>
      )}

      <div className="dashboard-header">
        <h2>🎯 Your Career Dashboard</h2>
        <div className="role-selector">
          <Target size={20} />
          <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button onClick={analyzeCareer} className="refresh-btn">
            {loading ? 'Analyzing...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard 
          icon={<Target />}
          title="Role Match"
          value={analysis?.gaps?.match_score ? `${analysis.gaps.match_score}%` : '75%'}
          color="blue"
          delay={0}
        />
        
        <StatCard 
          icon={<TrendingUp />}
          title="Market Demand"
          value={analysis?.market?.demand_score ? `${analysis.market.demand_score}/10` : '8/10'}
          color="green"
          delay={0.1}
        />
        
        <StatCard 
          icon={<BookOpen />}
          title="Skills to Learn"
          value={analysis?.gaps?.missing_skills?.length || 2}
          color="purple"
          delay={0.2}
        />
        
        <StatCard 
          icon={<Zap />}
          title="Timeline"
          value={analysis?.path?.timeline_months ? `${analysis.path.timeline_months}m` : '6m'}
          color="orange"
          delay={0.3}
        />
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-card">
          <h3>📊 Skill Levels vs Target</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="level" fill="#8884d8" name="Current" />
              <Bar dataKey="target" fill="#82ca9d" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>🎯 Role Compatibility</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roleMatchData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roleMatchData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      {analysis?.gaps?.recommended_courses && (
        <motion.div 
          className="recommendations"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>📚 AI-Recommended Courses</h3>
          <div className="courses-grid">
            {(analysis.gaps.recommended_courses.slice(0, 3) || []).map((course, i) => (
              <div key={i} className="course-card">
                <div className="course-header">
                  <span className="priority">{course.priority || 'High'}</span>
                  <span className="duration">{course.duration || '2 months'}</span>
                </div>
                <h4>{course.title || 'Python for Data Science'}</h4>
                <p>{course.provider || 'Coursera'}</p>
                <div className="skills">
                  {course.teaches_skill && <span className="skill-tag">{course.teaches_skill}</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* OSP Graph Preview */}
      <div className="osp-preview">
        <h3>🔗 OSP Graph Preview</h3>
        <p>Your skills connected to roles in real-time</p>
        <div className="graph-mini">
          <div className="node user-node">You</div>
          <div className="edge"></div>
          <div className="node skill-node">Python</div>
          <div className="edge"></div>
          <div className="node role-node">Data Scientist</div>
        </div>
        <button 
          className="view-full-btn"
          onClick={() => window.open('/graph', '_blank')}
        >
          View Full OSP Graph →
        </button>
      </div>

      {/* Jaseci Feature Highlight */}
      <div className="feature-highlight">
        <div className="feature">
          <div className="feature-icon">🔗</div>
          <h4>OSP Graph</h4>
          <p>Skills, roles, courses all connected</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🤖</div>
          <h4>byLLM AI</h4>
          <p>Smart analysis & predictions</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h4>Jac Client</h4>
          <p>Instant walker execution</p>
        </div>
      </div>
    </motion.div>
  )
}

const StatCard = ({ icon, title, value, color, delay }) => (
  <motion.div 
    className={`stat-card ${color}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  </motion.div>
)

export default Dashboard