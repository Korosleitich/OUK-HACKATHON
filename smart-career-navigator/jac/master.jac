import from byllm.llm { Model }

glob llm = Model(model_name="gemini/gemini-2.5-flash", verbose=False);


node User:
    has name: str;
    has email: str;
    has skills: list;

node Skill:
    has name: str;
    has proficiency: int;

node Role:
    has title: str;
    has required_skills: list;

node Course:
    has title: str;
    has topics: list;

edge HasSkill(User -> Skill);
edge RequiresSkill(Role -> Skill);
edge Learned(User -> Course);

### Agents ###
agent SkillAdvisor:
    can suggest_learning_plan(user: User) -> dict:
        missing_skills = [];
        recommended_courses = [];

        user_skill_names = [s.name for s in user.skills];

        for r in Role.all():
            for req_skill in r.required_skills:
                if req_skill.name not in user_skill_names:
                    if req_skill.name not in [s.name for s in missing_skills]:
                        missing_skills.append(req_skill);

        for c in Course.all():
            for topic in c.topics:
                if topic.name in [s.name for s in missing_skills]:
                    if c not in recommended_courses:
                        recommended_courses.append(c);

        return {
            "recommended_skills": [s.name for s in missing_skills],
            "recommended_courses": [c.title for c in recommended_courses]
        };

agent JobSignalAnalyzer:
    can generate_signals(user: User) -> list:
        return [
            {"role": "Data Scientist", "trend": "rising"},
            {"role": "ML Engineer", "trend": "stable"}
        ];


walker init_project:
    can api.get;
    
    with entry {
        u = spawn node::User(name="Jane Doe", email="jane@example.com", skills=[]);

        skill_python = spawn node::Skill(name="Python", proficiency=3);
        skill_sql = spawn node::Skill(name="SQL", proficiency=2);
        skill_ml = spawn node::Skill(name="Machine Learning", proficiency=0);

        r_ds = spawn node::Role(title="Data Scientist", required_skills=[skill_python, skill_ml]);
        r_ml = spawn node::Role(title="ML Engineer", required_skills=[skill_python, skill_ml]);

        c_python = spawn node::Course(title="Python for Data Science", topics=[skill_python]);
        c_ml = spawn node::Course(title="ML Basics", topics=[skill_ml]);

        spawn edge::HasSkill(from=u, to=skill_python);
        spawn edge::HasSkill(from=u, to=skill_sql);
        spawn edge::RequiresSkill(from=r_ds, to=skill_python);
        spawn edge::RequiresSkill(from=r_ds, to=skill_ml);
        spawn edge::RequiresSkill(from=r_ml, to=skill_python);
        spawn edge::RequiresSkill(from=r_ml, to=skill_ml);
        spawn edge::Learned(from=u, to=c_python);

        report {
            "result": "Initialization complete",
            "user": u,
            "roles": [r_ds, r_ml],
            "courses": [c_python, c_ml]
        };
    }

walker parse_resume:
    can api.post;
    has payload: dict = {};
    
    with entry {
        # Fetch user or create new
        u = payload.get("user");
        if not u:
            u = spawn node::User(name="Jane Doe", email="jane@example.com", skills=[]);

        resume_text = payload.get("resume_text", "").lower();

        # Simple keyword-based skill detection for demo
        skill_keywords = {
            "python": 3,
            "sql": 2,
            "machine learning": 1,
            "data analysis": 2,
            "tensorflow": 1,
            "pytorch": 1
        };

        for skill_name, proficiency in skill_keywords.items():
            if skill_name in resume_text:
                # Check if skill already exists
                existing = [s for s in u.skills if s.name.lower() == skill_name];
                if not existing:
                    s = spawn node::Skill(name=skill_name.title(), proficiency=proficiency);
                    spawn edge::HasSkill(from=u, to=s);

        report {"result": "resume parsed", "user": u};
    }

walker generate_learning_plan:
    can api.post;
    has user: User = null;
    
    with entry {
        if (!user) {
            report {"error": "No user provided"};
            return;
        }
        advisor = spawn here ++> node::agent::SkillAdvisor();
        plan = advisor.suggest_learning_plan(user);
        report plan;
    }

walker generate_job_signals:
    can api.post;
    has user: User = null;
    
    with entry {
        if (!user) {
            report {"error": "No user provided"};
            return;
        }
        analyzer = spawn here ++> node::agent::JobSignalAnalyzer();
        signals = analyzer.generate_signals(user);
        report signals;
    }

walker health:
    can api.get;
    
    with entry {
        report {"ok": true};
    }