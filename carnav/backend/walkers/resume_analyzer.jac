walker resume_analyzer {
    can run;
    has resume_text: str;

    run {
        byllm.extract(
            prompt="Extract technical skills from the resume text",
            text=resume_text
        ) -> extracted;

        report extracted;
    }
}
