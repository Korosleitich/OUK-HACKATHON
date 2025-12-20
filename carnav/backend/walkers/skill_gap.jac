walker skill_gap {
    can run;
    has target_role: str;

    run {
        missing = [];

        for r in Role {
            if r.title == target_role {
                for e in r <- REQUIRES_SKILL {
                    if not (me -> HAS_SKILL -> e.skill) {
                        missing.append(e.skill.name);
                    }
                }
            }
        }

        report missing;
    }
}
