import React, {useState} from 'react'
import { spawnWalker } from '../api'


export default function ResumeUpload(){
const [file, setFile] = useState(null)
const [status, setStatus] = useState('')


async function handleUpload(){
if(!file) return setStatus('Choose a file')
const text = await file.text()
setStatus('Processing...')
try{
// Example: call walker "parse_resume"
const res = await spawnWalker('parse_resume', { resume_text: text })
setStatus('Done: ' + (res?.result ? 'ok' : JSON.stringify(res)))
}catch(e){
setStatus('Error: ' + e.message)
}
}


return (
<div className="card">
<h3>Upload Resume</h3>
<input type="file" accept=".txt" onChange={e=> setFile(e.target.files[0])} />
<button onClick={handleUpload}>Upload & Analyze</button>
<p>{status}</p>
</div>
)
}