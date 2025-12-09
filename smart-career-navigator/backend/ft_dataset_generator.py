"""
Generate demo data for hackathon
Simple and effective!
"""
import json
import random
from datetime import datetime

def create_sample_data():
    """Create hackathon-ready sample data"""
    
    # 1. Sample resumes
    resumes = [
        {
            "name": "Alex Johnson",
            "text": "Python developer with 3 years at TechCorp. Built APIs with FastAPI. Machine learning projects with scikit-learn. AWS certified.",
            "skills": ["Python", "FastAPI", "Machine Learning", "AWS", "REST APIs"]
        },
        {
            "name": "Sam Smith", 
            "text": "Frontend developer specializing in React. 2 years at StartupXYZ. Built dashboards with D3.js. Experience with Node.js backend.",
            "skills": ["JavaScript", "React", "Node.js", "D3.js", "HTML/CSS"]
        },
        {
            "name": "Taylor Swift",
            "text": "Data Analyst with SQL and Python. Created reports with Power BI. Statistics background. Looking for Data Scientist role.",
            "skills": ["Python", "SQL", "Power BI", "Statistics", "Data Analysis"]
        }
    ]
    
    # 2. Career paths
    career_paths = {
        "Data Scientist": {
            "timeline": "6-9 months",
            "skills": ["Python", "ML", "Statistics", "SQL"],
            "courses": ["ML Specialization", "Data Science Bootcamp"],
            "salary_growth": "+45%"
        },
        "Full Stack Developer": {
            "timeline": "4-6 months", 
            "skills": ["JavaScript", "React", "Node.js", "AWS"],
            "courses": ["React Masterclass", "Node.js Course"],
            "salary_growth": "+35%"
        },
        "AI Engineer": {
            "timeline": "8-12 months",
            "skills": ["Python", "Deep Learning", "TensorFlow", "Cloud"],
            "courses": ["Deep Learning Specialization", "MLOps Course"],
            "salary_growth": "+60%"
        }
    }
    
    # 3. Market trends
    trends = [
        {
            "skill": "Python",
            "demand": "Very High",
            "growth": "+25% YoY",
            "roles": ["Data Scientist", "Backend Developer", "AI Engineer"]
        },
        {
            "skill": "React",
            "demand": "High", 
            "growth": "+20% YoY",
            "roles": ["Frontend Developer", "Full Stack Developer"]
        },
        {
            "skill": "AWS",
            "demand": "Very High",
            "growth": "+30% YoY", 
            "roles": ["DevOps Engineer", "Cloud Architect", "Backend Developer"]
        }
    ]
    
    # 4. Learning resources
    courses = [
        {
            "title": "Python for Data Science",
            "provider": "Coursera",
            "duration": "2 months",
            "skills": ["Python", "Pandas", "Data Analysis"],
            "difficulty": "Beginner"
        },
        {
            "title": "React Native Bootcamp",
            "provider": "Udemy", 
            "duration": "3 months",
            "skills": ["React", "JavaScript", "Mobile"],
            "difficulty": "Intermediate"
        },
        {
            "title": "AWS Certified Solutions Architect",
            "provider": "AWS",
            "duration": "4 months",
            "skills": ["AWS", "Cloud", "Architecture"],
            "difficulty": "Advanced"
        }
    ]
    
    dataset = {
        "resumes": resumes,
        "career_paths": career_paths,
        "market_trends": trends,
        "courses": courses,
        "metadata": {
            "generated_at": datetime.now().isoformat(),
            "for_hackathon": True,
            "purpose": "Smart Career Navigator Demo"
        }
    }
    
    # Save to file
    with open('../data/sample_dataset.json', 'w') as f:
        json.dump(dataset, f, indent=2)
    
    print("✅ Generated hackathon dataset!")
    print(f"📊 {len(resumes)} resumes")
    print(f"🎯 {len(career_paths)} career paths")
    print(f"📈 {len(trends)} market trends")
    print(f"📚 {len(courses)} courses")
    
    return dataset

# Run if this file is executed
if __name__ == "__main__":
    print("🎯 Creating hackathon demo data...")
    data = create_sample_data()
    print("✅ Done! Dataset ready for OSP graph!")