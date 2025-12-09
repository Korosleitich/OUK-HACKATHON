import axios from 'axios'
const BASE = 'http://localhost:5001/api'


export async function analyzeResume(resumeText){
const res = await axios.post('http://localhost:5001/api/resume/analyze', { resume: resumeText })
return res.data
}


export async function getLearningPath(role){
const res = await axios.post('http://localhost:5001/api/career/path', { role })
return res.data
}


export async function getSkillsRecommendation(skills){
const res = await axios.post('http://localhost:5001/api/skills/recommend', { skills })
return res.data
}


export default { analyzeResume, getLearningPath, getSkillsRecommendation }
EOF