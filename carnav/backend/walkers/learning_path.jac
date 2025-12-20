walker learning_path {
    can run;
    has missing_skills: list;

    run {
        byllm.generate(
            prompt="Create a simple learning plan for the missing skills",
            context=missing_skills
        ) -> plan;

        report plan;
    }
}
