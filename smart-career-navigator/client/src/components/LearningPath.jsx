import React from 'react'


export default function LearningPath({ plan }){
const steps = plan || [
{step:'Polish JS fundamentals', due:'1 week'},
{step:'REST & HTTP deep dive', due:'2 weeks'},
{step:'Dockerize a small app', due:'3 weeks'}
]
return (
<div className="card learning-path">
<h4>Learning path</h4>
<ol>
{steps.map((s,i)=> <li key={i}>{s.step} <em className="muted">({s.due})</em></li>)}
</ol>
</div>
)
}