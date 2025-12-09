import React, {useState} from 'react'
import ResumeUpload from './ResumeUpload'
import SkillGraph from './SkillGraph'
import JobSignals from './JobSignals'
import LearningPath from './LearningPath'


export default function Dashboard(){
const [analysis, setAnalysis] = useState(null)
return (
<div className="dashboard">
<div className="left">
<ResumeUpload onResult={setAnalysis} />
<LearningPath plan={analysis && analysis.learning_path} />
</div>
<div className="right">
<JobSignals data={(analysis && analysis.signals) || []} />
<SkillGraph skills={(analysis && analysis.skills) || []} />
</div>
</div>
)
}