from flask import Blueprint, request, jsonify
import requests
import os


api = Blueprint('api', __name__)
JASECI_API = os.getenv('JASECI_API', 'http://localhost:8000/js')


def _call_walker(name, ctx):
try:
resp = requests.post(f"{JASECI_API}/run", json={"name": name, "ctx": ctx}, timeout=8)
return resp.json()
except Exception:
return {"fallback": True, "name": name, "ctx": ctx}


@api.route('/career/path', methods=['POST'])
def career_path():
data = request.json or {}
role = data.get('role', 'Software Engineer')
return jsonify(_call_walker('generate_learning_path', {'role': role}))


@api.route('/resume/analyze', methods=['POST'])
def resume_analyze():
data = request.json or {}
resume = data.get('resume', '')
return jsonify(_call_walker('analyze_resume', {'resume': resume}))


@api.route('/skills/recommend', methods=['POST'])
def skills_recommend():
data = request.json or {}
skills = data.get('skills', [])
return jsonify(_call_walker('skill_recommender', {'skills': skills}))