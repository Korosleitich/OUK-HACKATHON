import React from 'react'


export default function LearningPath(){
const steps = [
{id:1, title:'Foundations: Python', due:'2 weeks'},
{id:2, title:'Data Structures & SQL', due:'3 weeks'},
{id:3, title:'ML Basics', due:'4 weeks'}
]
return (
<div className="card">
<h3>Learning Path</h3>
<ol>
{steps.map(s=> <li key={s.id}><strong>{s.title}</strong> — {s.due}</li>)}
</ol>
</div>
)
}