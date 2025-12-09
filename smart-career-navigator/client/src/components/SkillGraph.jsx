import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'


export default function SkillGraph({ skills }){
const ref = useRef()
useEffect(()=>{
const el = ref.current
if(!el) return
const data = skills.length ? skills.map((s,i)=>({name:s, score: Math.round(50 + Math.random()*50)})) : [
{name:'Python',score:90},{name:'APIs',score:70},{name:'Docker',score:50}
]
d3.select(el).selectAll('*').remove()
const w = 320, h = 200
const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${w} ${h}`)
const x = d3.scaleBand().domain(data.map(d=>d.name)).range([40,w-20]).padding(0.3)
const y = d3.scaleLinear().domain([0,100]).range([h-30,10])
svg.append('g').attr('transform','translate(0,0)')
.selectAll('rect').data(data).enter().append('rect')
.attr('x', d=>x(d.name)).attr('y',d=>y(d.score))
.attr('width', x.bandwidth()).attr('height', d=>h-30-y(d.score))
svg.append('g').attr('transform',`translate(0,${h-30})`).call(d3.axisBottom(x))
svg.append('g').attr('transform','translate(40,0)').call(d3.axisLeft(y))
},[skills])


return (
<div className="card skill-graph">
<h4>Skill snapshot</h4>
<div ref={ref}></div>
</div>
)
}