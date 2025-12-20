walker test_flow {
    can run;

    run {
        spawn init_system;

        skills = spawn resume_analyzer(
            resume_text="I have experience with Python and basic SQL"
        );

        gaps = spawn skill_gap(target_role="Backend Developer");
        path = spawn learning_path(missing_skills=gaps);

        report {
            "skills": skills,
            "gaps": gaps,
            "path": path
        };
    }
}
