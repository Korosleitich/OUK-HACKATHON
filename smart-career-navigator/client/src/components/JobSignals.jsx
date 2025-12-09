import React from 'react'


export default function JobSignals({ data }){
const items = data.length ? data : [
{company:'Acme Corp', title:'Junior Backend', score:0.86, date:'2025-11-01'},
{company:'Nova Labs', title:'Backend Intern', score:0.78, date:'2025-10-12'}
]
return (
<div className="card job-signals">
<h4>Job signals</h4>
<ul>
{items.map((it, i)=> (
<li key={i}>
<strong>{it.title}</strong> @ {it.company} <span className="muted">({it.date})</span>
<div className="score">Match: {(it.score*100).toFixed(0)}%</div>
</li>
))}
</ul>
</div>
)
}