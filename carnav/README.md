# Smart Career Path Navigator (Jaseci Hackathon Project)

## Overview
This project is a Smart Career Path Navigator built using the Jaseci ecosystem
and the Jac programming language. The goal is to help users understand what
skills they are missing for a target role and generate a simple learning plan.

The system uses:
- Object Spatial Programming (OSP) graphs
- Multiple walkers (agents)
- byLLM for analysis and generation
- Jac Client for frontend interaction using Spawn()

This project was built as part of the Jaseci AI Hackathon.

---

## Features
- Resume skill extraction using byLLM
- Skill gap analysis using graph traversal
- Learning path generation using byLLM
- Interactive frontend actions via Jac Client
- Seed data for easy testing and demo

---

## Technologies Used
- Jac Programming Language
- Jaseci Runtime
- Object Spatial Programming (OSP)
- byLLM
- Jac Client

---

## Project Structure

career-navigator/
├── backend/
│   ├── main.jac
│   ├── graph/
│   │   ├── nodes.jac
│   │   └── edges.jac
│   ├── walkers/
│   │   ├── resume_analyzer.jac
│   │   ├── skill_gap.jac
│   │   └── learning_path.jac
│   └── seed/
│       └── seed_data.jac
│
├── client/
│   ├── app.jac
│   └── components/
│       └── dashboard.jac
│
├── demo/
│   └── test_flow.jac
│
├── requirements.txt
└── .env.example

---

## How the System Works

1. The user provides resume text from the frontend (Jac Client).
2. The resume_analyzer walker uses byLLM to extract skills.
3. The user selects a target role.
4. The skill_gap walker traverses the OSP graph to find missing skills.
5. The learning_path walker uses byLLM to generate a learning roadmap.
6. Results are displayed through the Jac Client interface.

---

## byLLM Usage

- Analytical: Resume skill extraction
- Generative: Learning roadmap creation

---

## How to Run the Project

### 1. Create virtual environment
python -m venv venv
source venv/bin/activate 
# Windows: venv\Scripts\activate
### 2. Install dependencies
pip install jaseci
pip install byllm

### 3. Set environment variables
Copy `.env.example` to `.env` and configure your LLM provider.

### 4. Run test flow

---

## Demo Notes
Seed data is included so the project can run without external APIs.
The demo/test_flow.jac file demonstrates the full end-to-end workflow.

---

## Limitations
- Job market data is mocked
- UI is minimal and focused on functionality
- Learning plan is text-based

---

## Future Improvements
- Live job API integration
- Skill proficiency tracking over time
- Visual graph dashboard

