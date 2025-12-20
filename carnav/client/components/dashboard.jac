component Dashboard {

    action analyzeResume(text) {
        result = spawn resume_analyzer(resume_text=text);
        show(result);
    }

    action getPath(role) {
        gaps = spawn skill_gap(target_role=role);
        path = spawn learning_path(missing_skills=gaps);
        show(path);
    }

}
