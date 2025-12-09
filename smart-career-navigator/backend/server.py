from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Jaseci server config
JAC_SERVER = "http://localhost:8000"
token = None
sentinel_id = None

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "🚀 Ready!",
        "time": datetime.now().isoformat(),
        "features": ["OSP", "byLLM", "Jac Client", "Career AI"]
    })

@app.route('/api/init', methods=['POST'])
def init_jaseci():
    """Initialize Jaseci server"""
    global token, sentinel_id
    
    try:
        # 1. Login
        auth = requests.post(f"{JAC_SERVER}/js_admin/user_create", json={
            "name": "hackathon",
            "password": "awesome123"
        })
        
        # 2. Get token
        login = requests.post(f"{JAC_SERVER}/js_admin/user_token_get", json={
            "name": "hackathon",
            "password": "awesome123"
        })
        token = login.json()['token']
        
        # 3. Create graph
        headers = {'Authorization': f'token {token}'}
        graph = requests.post(f"{JAC_SERVER}/js/graph_create", headers=headers)
        graph_id = graph.json()['jid']
        
        # 4. Load our Jac code
        with open('../jac/master.jac', 'r') as f:
            jac_code = f.read()
        
        sentinel = requests.post(
            f"{JAC_SERVER}/js/sentinel_register",
            headers=headers,
            json={"code": jac_code}
        )
        sentinel_id = sentinel.json()['jid']
        
        return jsonify({
            "success": True,
            "message": "🎯 Jaseci initialized!",
            "graph_id": graph_id,
            "sentinel_id": sentinel_id,
            "wow": "OSP Graph ready for magic!"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/walker/<name>', methods=['POST'])
def run_walker(name):
    """Run any Jaseci walker"""
    if not token:
        return jsonify({"error": "Not initialized"}), 400
    
    data = request.json or {}
    
    headers = {'Authorization': f'token {token}'}
    
    try:
        # Spawn walker
        spawn = requests.post(
            f"{JAC_SERVER}/js/walker_spawn_create",
            headers=headers,
            json={
                "name": name,
                "snt": sentinel_id
            }
        )
        
        walker_id = spawn.json()['jid']
        
        # Run with context
        run = requests.post(
            f"{JAC_SERVER}/js/walker_run",
            headers=headers,
            json={
                "wlk": walker_id,
                "ctx": data
            }
        )
        
        result = run.json()
        
        # Add some hackathon flare
        result["_meta"] = {
            "executed_by": "Jac Client via Flask",
            "timestamp": datetime.now().isoformat(),
            "hackathon_ready": True
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e), "walker": name}), 500

@app.route('/api/upload', methods=['POST'])
def upload_resume():
    """Upload and parse resume"""
    if 'file' not in request.files:
        return jsonify({"error": "No file"}), 400
    
    file = request.files['file']
    text = file.read().decode('utf-8')
    
    # Run parse_resume walker
    result = run_walker("parse_resume")({"resume_text": text})
    
    # Add some sparkle
    result_data = result.get_json()
    result_data["wow_factor"] = f"✨ AI found {len(result_data.get('skills', []))} skills!"
    
    return jsonify(result_data)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """Analyze career path"""
    data = request.json
    
    # Run multiple walkers for complete analysis
    results = {
        "gaps": run_walker("analyze_skill_gaps")(data),
        "market": run_walker("analyze_job_market")({"role": data.get('target_role')}),
        "path": run_walker("generate_learning_path")(data)
    }
    
    return jsonify({
        "analysis": results,
        "insight": "🎯 Your personalized career roadmap is ready!",
        "ai_note": "Powered by Jaseci OSP + byLLM"
    })

@app.route('/api/visualize', methods=['GET'])
def visualize():
    """Get graph visualization data"""
    user_id = request.args.get('user_id')
    
    result = run_walker("visualize_skills")({"user_id": user_id})
    return jsonify(result.get_json())

# Demo endpoint for hackathon showcase
@app.route('/api/wow', methods=['GET'])
def wow_demo():
    """Showcase demo endpoints"""
    demos = {
        "osp_magic": "/api/walker/visualize_skills",
        "ai_analysis": "/api/walker/analyze_skill_gaps",
        "career_predict": "/api/walker/simulate_career",
        "instant_tips": "/api/walker/get_personal_tips",
        "market_insights": "/api/walker/analyze_job_market"
    }
    
    return jsonify({
        "message": "🚀 Smart Career Navigator - Hackathon Ready!",
        "features": [
            "🔗 OSP Graph: Skills connected to roles & courses",
            "🤖 byLLM AI: Smart resume parsing & predictions",
            "⚡ Jac Client: Instant walker execution",
            "💫 Wow Effects: Live graph visualization",
            "🎯 Career AI: Personalized learning paths"
        ],
        "demo_endpoints": demos,
        "tech_stack": ["Jaseci", "Python/Flask", "React", "OSP", "byLLM"]
    })

@app.route('/')
def index():
    """Serve frontend"""
    return send_file('../client/public/index.html')

if __name__ == '__main__':
    print("""
    🚀🚀🚀 SMART CAREER NAVIGATOR 🚀🚀🚀
    
    Starting hackathon-ready backend...
    
    Features:
    ✅ OSP Graph with career nodes
    ✅ byLLM AI for smart analysis  
    ✅ Jac Client integration
    ✅ Flask proxy for Jaseci
    ✅ Hackathon wow effects!
    
    Starting on http://localhost:5000
    """)
    app.run(host='0.0.0.0', port=5000, debug=True)