# OUK-HACKATHON
HACKATHON

this is a readme file that explains what our project is all about.
# 🚀 Smart Career Navigator - Jaseci Hackathon Project

**AI-powered career path planning with OSP Graph + byLLM + Jac Client**

## 🎯 Hackathon Features

✅ **OSP Graph** - Skills, roles, courses connected in real-time  
✅ **byLLM AI** - Smart resume parsing & career predictions  
✅ **Jac Client** - Instant walker execution from frontend  
✅ **Wow Effects** - Animations, sparks, live visualizations  
✅ **Hackathon Ready** - Simple setup, impressive demo  

## 📁 Project Structure
smart-career-navigator/
├─ backend/
│ ├─ server.py # Flask proxy for Jaseci
│ ├─ api.py # REST wrapper for walkers
│ ├─ requirements.txt # Python dependencies
│ └─ ft_dataset_generator.py # Demo data generator
│
├─ client/
│ ├─ package.json # Frontend dependencies
│ ├─ public/index.html # Main HTML
│ └─ src/
│ ├─ main.jsx # React entry
│ ├─ App.jsx # Main app
│ ├─ api.js # Jac Client API
│ └─ components/ # React components
│ ├─ Dashboard.jsx # Main dashboard
│ ├─ SkillGraph.jsx # OSP Graph visualization
│ ├─ JobSignals.jsx # Market insights
│ ├─ LearningPath.jsx # Learning timeline
│ ├─ ResumeUpload.jsx # Resume upload
│ └─ ThemeSwitcher.jsx # UI themes
│
├─ utils/
│ ├─ roles.json # Career role definitions
│ ├─ skills.json # Skill database
│ └─ courses.json # Learning resources
│
├─ jac/
│ └─ master.jac # All Jaseci code (walkers + nodes)
│
└─ README.md # This file

## 🚀 Quick Start (2 Minutes!)

```bash
# 1. Clone and navigate
git clone <your-repo>
cd smart-career-navigator

# 2. Install Jaseci
pip install jaseci jaseci-ai-kit

# 3. Install backend deps
cd backend
pip install -r requirements.txt

# 4. Start Jaseci server (in new terminal)
jsctl serv init

# 5. Start backend (in another terminal)
python server.py

# 6. Start frontend (in another terminal)
cd ../client
npm install
npm run dev

# 7. Open browser
# Go to: http://localhost:5173