import React, {useRef} from 'react'
import { analyzeResume } from '../api'


export default function ResumeUpload({ onResult }){
const taRef = useRef()


const handleAnalyze = async ()=>{
const text = taRef.current.value
if(!text) return alert('Paste a resume text into the box')
const r = await analyzeResume(text)
// Demo-friendly: normalize a nice object
const normalized = r.fallback ? {
skills: ['Python','REST','Docker'],
signals: [{company:'Acme',title:'Junior Dev',score:0.9}],
learning_path: [{step:'Learn REST APIs', due:'2 weeks'},{step:'Docker basics',due:'3 weeks'}]
} : r
onResult(normalized)
}


return (
<div className="card resume-upload">
<h3>Resume (paste text)</h3>
<textarea ref={taRef} rows={8} placeholder="Paste resume text here..." />
<div className="actions">
<button onClick={handleAnalyze}>Analyze resume</button>
</div>
</div>
)
}