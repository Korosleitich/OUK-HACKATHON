node User {
    has user_id: str;
    has name: str;
    has experience_years: int;
}

node Skill {
    has name: str;
    has level: int;   # 1 to 5
}

node Role {
    has title: str;
    has demand_score: float;
}

node Course {
    has title: str;
    has duration_weeks: int;
}
