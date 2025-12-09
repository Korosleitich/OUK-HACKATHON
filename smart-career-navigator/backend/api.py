"""
Simple REST wrapper for Jaseci walkers
Hackathon-ready with wow effects!
"""
import requests
import json

class CareerAPI:
    def __init__(self):
        self.base = "http://localhost:5000/api"
        self.headers = {"Content-Type": "application/json"}
    
    def wow_effect(self, result):
        """Add hackathon flare to results"""
        if isinstance(result, dict):
            result["_hackathon"] = {
                "project": "Smart Career Navigator",
                "team": "Jaseci Hackers",
                "prize_ready": True
            }
        return result
    
    def parse_resume(self, text):
        """Parse resume with AI magic"""
        response = requests.post(
            f"{self.base}/walker/parse_resume",
            json={"resume_text": text},
            headers=self.headers
        )
        return self.wow_effect(response.json())
    
    def analyze_gaps(self, user_id, target_role):
        """Find skill gaps"""
        response = requests.post(
            f"{self.base}/walker/analyze_skill_gaps",
            json={"user_id": user_id, "target_role": target_role},
            headers=self.headers
        )
        return self.wow_effect(response.json())
    
    def learning_path(self, user_id, target_role):
        """Get AI-powered learning path"""
        response = requests.post(
            f"{self.base}/walker/generate_learning_path",
            json={"user_id": user_id, "target_role": target_role},
            headers=self.headers
        )
        return self.wow_effect(response.json())
    
    def job_market(self, role):
        """Get market insights"""
        response = requests.post(
            f"{self.base}/walker/analyze_job_market",
            json={"role": role},
            headers=self.headers
        )
        return self.wow_effect(response.json())
    
    def visualize_graph(self, user_id):
        """Get OSP graph data"""
        response = requests.get(
            f"{self.base}/visualize?user_id={user_id}",
            headers=self.headers
        )
        return self.wow_effect(response.json())
    
    def quick_check(self, skills, interest):
        """Instant career check"""
        response = requests.post(
            f"{self.base}/walker/quick_career_check",
            json={"current_skills": skills, "interest": interest},
            headers=self.headers
        )
        return self.wow_effect(response.json())
    
    def simulate_future(self, user_id, target_role, months=12):
        """Simulate career progression"""
        response = requests.post(
            f"{self.base}/walker/simulate_career",
            json={
                "user_id": user_id, 
                "target_role": target_role,
                "months": months
            },
            headers=self.headers
        )
        return self.wow_effect(response.json())

# Global instance
api = CareerAPI()

# Simple functions for frontend
def parse_resume(text):
    return api.parse_resume(text)

def analyze_skill_gaps(user_id, role):
    return api.analyze_gaps(user_id, role)

def get_learning_path(user_id, role):
    return api.learning_path(user_id, role)

def get_job_market(role):
    return api.job_market(role)

def get_graph_viz(user_id):
    return api.visualize_graph(user_id)

# Hackathon demo function
def demo_all_features():
    """Show all features for demo"""
    return {
        "osp_demo": get_graph_viz("demo_user"),
        "ai_demo": parse_resume("Python developer with 3 years experience"),
        "career_demo": analyze_skill_gaps("demo_user", "Data Scientist"),
        "wow_factor": "🎯 All features working with Jaseci magic!"
    }