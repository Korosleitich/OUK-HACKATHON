const API_BASE = 'http://localhost:5000/api'

const wowFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    
    const data = await response.json()
    
    // Add hackathon magic
    if (data && !data.error) {
      console.log(`✅ ${url.split('/').pop()} success!`)
    }
    
    return data
  } catch (error) {
    console.error(`❌ API error: ${error}`)
    return {
      error: 'API error',
      hackathon_note: 'Check if backend is running on port 5000',
      fix: 'Run: python backend/server.py'
    }
  }
}

// Walker execution (Jac Client style)
export const spawnWalker = async (walkerName, ctx = {}) => {
  return wowFetch(`${API_BASE}/walker/${walkerName}`, {
    method: 'POST',
    body: JSON.stringify(ctx)
  })
}

// Career-specific functions
export const parseResume = (text) => {
  return spawnWalker('parse_resume', { resume_text: text })
}

export const analyzeGaps = (userId, targetRole) => {
  return spawnWalker('analyze_skill_gaps', {
    user_id: userId,
    target_role: targetRole
  })
}

export const getLearningPath = (userId, targetRole) => {
  return spawnWalker('generate_learning_path', {
    user_id: userId,
    target_role: targetRole
  })
}

export const getJobMarket = (role) => {
  return spawnWalker('analyze_job_market', { role })
}

export const visualizeSkills = (userId) => {
  return spawnWalker('visualize_skills', { user_id: userId })
}

export const getCareerTips = (skills, target) => {
  return spawnWalker('get_personal_tips', {
    user_skills: skills,
    target_role: target
  })
}

export const simulateCareer = (userId, targetRole, months = 12) => {
  return spawnWalker('simulate_career', {
    user_id: userId,
    target_role: targetRole,
    months: months
  })
}

// Demo function for hackathon showcase
export const runHackathonDemo = async () => {
  console.log('🚀 Starting hackathon demo...')
  
  const steps = [
    { name: 'Resume Parsing', func: () => parseResume('Python developer with ML experience') },
    { name: 'Skill Analysis', func: () => analyzeGaps('demo123', 'Data Scientist') },
    { name: 'Market Insights', func: () => getJobMarket('AI Engineer') },
    { name: 'Learning Path', func: () => getLearningPath('demo123', 'Data Scientist') }
  ]
  
  const results = []
  
  for (const step of steps) {
    console.log(`▶️  Running: ${step.name}`)
    const result = await step.func()
    results.push({ step: step.name, result })
    await new Promise(resolve => setTimeout(resolve, 500)) // Visual delay
  }
  
  return {
    success: true,
    message: '🎯 Hackathon demo complete!',
    results,
    wow: '✨ All Jaseci features demonstrated!'
  }
}

// Mock data for demo (fallback)
export const mockData = {
  parseResume: () => ({
    user_id: 'user_' + Date.now(),
    skills: ['Python', 'JavaScript', 'React', 'AWS'],
    experience_years: 3,
    wow: '✨ AI parsed your resume!',
    ai_note: 'byLLM extraction successful'
  }),
  
  analyzeGaps: () => ({
    match_score: 75,
    missing_skills: ['Machine Learning', 'Docker'],
    recommended_courses: [
      { title: 'ML Crash Course', duration: '2 months', priority: 'High' }
    ],
    insight: '🎯 2 key skills needed for Data Scientist role'
  }),
  
  getLearningPath: () => ({
    timeline_months: 6,
    path: [
      { month: 1, focus: 'Python Deep Dive', action: 'Complete course' },
      { month: 2, focus: 'ML Fundamentals', action: 'Build project' }
    ],
    wow: '💫 Personalized path generated!'
  })
}

export default {
  spawnWalker,
  parseResume,
  analyzeGaps,
  getLearningPath,
  getJobMarket,
  visualizeSkills,
  runHackathonDemo,
  mockData
}