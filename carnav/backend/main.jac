import "./graph/nodes.jac";
import "./graph/edges.jac";
import "./walkers/resume_analyzer.jac";
import "./walkers/skill_gap.jac";
import "./walkers/learning_path.jac";
import "./seed/seed_data.jac";

walker init_system {
    can run;
    run {
        spawn seed_data;
        report "Career Navigator backend initialized";
    }
}
