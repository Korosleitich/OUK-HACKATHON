import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'
import { api } from '../api'

const SkillGraph = ({ user }) => {
  const svgRef = useRef()
  const [graphData, setGraphData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    if (user) {
      loadGraphData()
    }
  }, [user])

  useEffect(() => {
    if (graphData && svgRef.current) {
      drawGraph()
    }
  }, [graphData])

  const loadGraphData = async () => {
    try {
      const data = await api.visualizeSkills(user.id)
      setGraphData(data.report?.[0]?.graph_data || createDemoGraph())
    } catch {
      // Demo graph for hackathon
      setGraphData(createDemoGraph())
    }
  }

  const createDemoGraph = () => {
    return {
      nodes: [
        { id: 'user', label: 'You', type: 'user', size: 30 },
        { id: 'python', label: 'Python', type: 'skill', size: 25 },
        { id: 'javascript', label: 'JavaScript', type: 'skill', size: 20 },
        { id: 'react', label: 'React', type: 'skill', size: 20 },
        { id: 'data_scientist', label: 'Data Scientist', type: 'role', size: 28 },
        { id: 'full_stack', label: 'Full Stack', type: 'role', size: 28 },
        { id: 'ml_course', label: 'ML Course', type: 'course', size: 18 },
        { id: 'aws', label: 'AWS', type: 'skill', size: 22 }
      ],
      edges: [
        { source: 'user', target: 'python', label: 'has', strength: 2 },
        { source: 'user', target: 'javascript', label: 'has', strength: 1 },
        { source: 'user', target: 'react', label: 'has', strength: 1 },
        { source: 'python', target: 'data_scientist', label: 'leads to' },
        { source: 'python', target: 'full_stack', label: 'leads to' },
        { source: 'javascript', target: 'full_stack', label: 'leads to' },
        { source: 'python', target: 'ml_course', label: 'learn from' },
        { source: 'aws', target: 'full_stack', label: 'required for' }
      ]
    }
  }

  const drawGraph = () => {
    const width = 800
    const height = 500
    const svg = d3.select(svgRef.current)
    
    svg.selectAll('*').remove()
    
    // Add zoom
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })
    
    svg.call(zoom)
    
    const container = svg.append('g')
    
    // Create force simulation
    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.edges).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => d.size + 5))

    // Draw edges
    const edges = container.append('g')
      .selectAll('line')
      .data(graphData.edges)
      .enter()
      .append('line')
      .attr('stroke', '#4A5568')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', d => d.label === 'has' ? '0' : '5,5')

    // Draw nodes
    const nodes = container.append('g')
      .selectAll('g')
      .data(graphData.nodes)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        setSelectedNode(d)
        // Add pulse effect
        d3.select(event.currentTarget)
          .select('circle')
          .transition()
          .attr('r', d.size + 5)
          .transition()
          .attr('r', d.size)
      })

    // Add circles
    nodes.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => {
        if (d.type === 'user') return '#4299E1'
        if (d.type === 'skill') return '#48BB78'
        if (d.type === 'role') return '#ED8936'
        return '#9F7AEA'
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)

    // Add labels
    nodes.append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.size + 15)
      .attr('fill', '#2D3748')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')

    // Add icons
    nodes.append('text')
      .attr('dy', '0.3em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-size', '14px')
      .text(d => {
        if (d.type === 'user') return '👤'
        if (d.type === 'skill') return '💡'
        if (d.type === 'role') return '🎯'
        return '📚'
      })

    // Update positions
    simulation.on('tick', () => {
      edges
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      nodes.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }
  }

  return (
    <div className="skill-graph-container">
      <div className="graph-header">
        <h2>🔗 OSP Skill Graph</h2>
        <p>Visualize how your skills connect to roles and courses</p>
        <div className="graph-controls">
          <button onClick={() => setGraphData(createDemoGraph())}>
            🔄 Refresh Graph
          </button>
          <button onClick={() => svgRef.current && d3.select(svgRef.current).call(d3.zoom().transform, d3.zoomIdentity)}>
            🏠 Reset View
          </button>
        </div>
      </div>

      <div className="graph-content">
        <div className="graph-visualization">
          <svg 
            ref={svgRef} 
            width="800" 
            height="500"
            className="graph-svg"
          />
        </div>

        <div className="graph-sidebar">
          <div className="legend">
            <h3>Legend</h3>
            <div className="legend-item">
              <div className="legend-circle user"></div>
              <span>You</span>
            </div>
            <div className="legend-item">
              <div className="legend-circle skill"></div>
              <span>Skills</span>
            </div>
            <div className="legend-item">
              <div className="legend-circle role"></div>
              <span>Target Roles</span>
            </div>
            <div className="legend-item">
              <div className="legend-circle course"></div>
              <span>Courses</span>
            </div>
          </div>

          {selectedNode && (
            <motion.div 
              className="node-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>🎯 {selectedNode.label}</h3>
              <p>Type: <strong>{selectedNode.type}</strong></p>
              <p>Size: <strong>{selectedNode.size}px</strong></p>
              
              {selectedNode.type === 'skill' && (
                <div className="action-buttons">
                  <button className="btn-small">Find Courses</button>
                  <button className="btn-small">View Jobs</button>
                </div>
              )}
            </motion.div>
          )}

          <div className="osp-info">
            <h4>🔍 OSP Graph Features</h4>
            <ul>
              <li>✨ Real-time skill connections</li>
              <li>🎯 Visual career pathways</li>
              <li>🔗 Interactive node dragging</li>
              <li>📊 Zoom & pan enabled</li>
            </ul>
            <p className="hint">Try: Drag nodes, click to select, scroll to zoom</p>
          </div>
        </div>
      </div>

      <div className="graph-footer">
        <p>
          <strong>🎯 Hackathon Feature:</strong> This OSP graph shows how Jaseci connects 
          data nodes. In production, this updates in real-time as you learn new skills!
        </p>
      </div>
    </div>
  )
}

export default SkillGraph