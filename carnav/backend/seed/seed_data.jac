walker seed_data {
    can run;

    run {
        u = spawn node::User(
            user_id="u1",
            name="Test User",
            experience_years=2
        );

        s1 = spawn node::Skill(name="Python", level=3);
        s2 = spawn node::Skill(name="SQL", level=2);

        r = spawn node::Role(title="Backend Developer", demand_score=0.8);

        spawn edge::HAS_SKILL(u, s1, confidence=0.7);
        spawn edge::REQUIRES_SKILL(r, s1, importance=0.9);
        spawn edge::REQUIRES_SKILL(r, s2, importance=0.8);

        report "Seed data created";
    }
}
