from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os


app = Flask(__name__)
CORS(app)


# Environment: set JASECI_API to point to your Jaseci instance (if used)
JASECI_API = os.getenv("JASECI_API", "http://localhost:8000/js")


@app.route('/api/health')
def health():
return jsonify({"status": "ok", "name": "smart-career-backend"})


@app.route('/api/proxy/run', methods=['POST'])
def proxy_run():
payload = request.json or {}
walker = payload.get('walker')
ctx = payload.get('ctx', {})
if not walker:
return jsonify({"error": "walker missing"}), 400
try:
# Proxy to Jaseci (if available) otherwise return an example
resp = requests.post(f"{JASECI_API}/run", json={"name": walker, "ctx": ctx}, timeout=10)
return jsonify(resp.json())
except Exception:
# graceful fallback for hackathon/demo
return jsonify({
"ok": True,
"walker": walker,
"ctx": ctx,
"result": {"message": "jaseci unavailable, returning demo output"}
})


if __name__ == '__main__':
    app.run(port=5001, debug=True)