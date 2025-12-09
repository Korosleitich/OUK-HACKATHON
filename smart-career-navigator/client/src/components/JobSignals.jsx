import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '../api'
import { TrendingUp, DollarSign, Users, Zap, Target, Clock } from 'lucide-react'

const JobSignals = ({ user }) => {
  const [marketData, setMarketData] = useState([])
  const [selectedRole, setSelectedRole] = useState('Data Scientist')
  const [loading, setLoading] = useState(false)

  const roles = ['Data Scientist', 'Full Stack Developer', 'AI Engineer', 'DevOps Engineer']

  useEffect(() => {
    fetchMarketData()
  }, [selectedRole])

  const fetchMarketData = async () => {
    setLoading(true)
    
    try {
      const data = await api.getJobMarket(selectedRole)
      const result = data.report?.[0] || data
      
      // Generate trend data
      const trends = [
        { month: 'Jan', demand: 65, salary: 90 },
        { month: 'Feb', demand: 68, salary: 92 },
        { month: 'Mar', demand: 72, salary: 95 },
        { month: 'Apr', demand: 75, salary: 98 },
        { month: 'May', demand: 78, salary: 102 },
        { month: 'Jun', demand: 80, salary: 105 },
        { month: 'Jul', demand: 82, salary: 108 },
        { month: 'Aug', demand: 85, salary: 110 },
      ]
      
      setMarketData({
        trends,
        current: result,
        hotSkills: result.hot_skills || ['Python', 'Machine Learning', 'Cloud']
      })
      
    } catch {
      // Mock data for demo
      setMarketData({
        trends: [
          { month: 'Jan', demand: 65, salary: 90 },
          { month: 'Feb', demand: 70, salary: 95 },
          { month: 'Mar', demand: 75, salary: 100 },
        ],
        current: {
          role: selectedRole,
          demand_score: 8,
          avg_salary: 120000,
          trend: 'Growing',
          insight: 'High demand for remote positions'
        },
        hotSkills: ['Python', 'React', 'AWS', 'Docker']
      })
    }
    
    setLoading(false)
  }

  const MarketCard = ({ icon, title, value, change, color }) => (
    <motion.div 
      className={`market-card ${color}`}
      whileHover={{ scale: 1.02 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h4>{title}</h4>
        <p className="card-value">{value}</p>
        {change && <span className={`change ${change > 0 ? 'positive' : 'negative'}`}>
          {change > 0 ? '↗' : '↘'} {Math.abs(change)}%
        </span>}
      </div>
    </motion.div>
  )

  return (
    <div className="job-signals">
      <div className="signals-header">
        <h2>📈 Job Market Signals</h2>
        <p>Real-time insights for {selectedRole} roles</p>
        
        <div className="role-tabs">
          {roles.map(role => (
            <button
              key={role}
              className={`role-tab ${selectedRole === role ? 'active' : ''}`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-market">
          <div className="loader"></div>
          <p>Fetching market data...</p>
        </div>
      ) : (
        <>
          {/* Market Overview */}
          <div className="market-overview">
            <MarketCard
              icon={<TrendingUp />}
              title="Demand Score"
              value={`${marketData.current?.demand_score || 8}/10`}
              change={+12}
              color="blue"
            />
            
            <MarketCard
              icon={<DollarSign />}
              title="Avg Salary"
              value={`$${marketData.current?.avg_salary?.toLocaleString() || '120,000'}`}
              change={+8}
              color="green"
            />
            
            <MarketCard
              icon={<Users />}
              title="Open Positions"
              value="2,500+"
              change={+15}
              color="purple"
            />
            
            <MarketCard
              icon={<Zap />}
              title="Growth Trend"
              value={marketData.current?.trend || 'Growing'}
              change={+20}
              color="orange"
            />
          </div>

          {/* Trend Chart */}
          <div className="trend-chart">
            <h3>📊 Demand Trend (Last 8 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={marketData.trends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  name="Demand Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="salary" 
                  stroke="#82ca9d" 
                  strokeWidth={3}
                  name="Salary (K)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Hot Skills */}
          <div className="hot-skills">
            <h3>🔥 Hot Skills in Demand</h3>
            <div className="skills-grid">
              {marketData.hotSkills?.map((skill, index) => (
                <motion.div 
                  key={skill}
                  className="skill-card"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="skill-rank">#{index + 1}</div>
                  <h4>{skill}</h4>
                  <p className="skill-demand">High Demand</p>
                  <div className="skill-meta">
                    <span>🎯 {Math.floor(Math.random() * 2000) + 1000} jobs</span>
                    <span>💰 +{Math.floor(Math.random() * 20) + 10}% salary</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <motion.div 
            className="ai-insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>🤖 AI Market Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-icon">🎯</div>
                <h4>Remote Opportunity</h4>
                <p>45% of {selectedRole} roles are now remote-friendly</p>
              </div>
              
              <div className="insight-card">
                <div className="insight-icon">📈</div>
                <h4>Salary Growth</h4>
                <p>Average salary increased 15% in past year</p>
              </div>
              
              <div className="insight-card">
                <div className="insight-icon">⚡</div>
                <h4>Fastest Growing</h4>
                <p>This role growing 3x faster than market average</p>
              </div>
              
              <div className="insight-card">
                <div className="insight-icon">🎓</div>
                <h4>Skill Shift</h4>
                <p>Cloud skills now required in 80% of job postings</p>
              </div>
            </div>
          </motion.div>

          {/* Action Steps */}
          <div className="action-steps">
            <h3>🎯 Your Action Plan</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Learn Hot Skills</h4>
                  <p>Focus on {marketData.hotSkills?.[0] || 'Python'} first</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Update Resume</h4>
                  <p>Highlight {marketData.hotSkills?.slice(0, 2).join(' & ') || 'Python & AWS'}</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Network</h4>
                  <p>Connect with professionals in this field</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="data-source">
        <p>
          <strong>💡 Note:</strong> Real data would come from APIs like LinkedIn, 
          Indeed, and Glassdoor via Jaseci walkers
        </p>
      </div>
    </div>
  )
}

export default JobSignals