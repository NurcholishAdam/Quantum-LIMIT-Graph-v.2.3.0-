
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Node, Link } from '../types';

const GraphVisualizer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch dynamic graph data
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/graph/data');
        if (!response.ok) {
          throw new Error(`Failed to fetch graph data: ${response.statusText}`);
        }
        const data = await response.json();
        setNodes(data.nodes);
        setLinks(data.links);
        setError(null);
      } catch (err) {
        console.error("Error fetching graph data:", err);
        setError("Using fallback data connection...");
        // Fallback to initial data if API is unavailable
        setNodes([
          { id: '1', label: 'Master Orchestrator', type: 'orchestrator', val: 20 },
          { id: '2', label: 'English Agent', type: 'agent', val: 10 },
          { id: '3', label: 'Indo-Agent', type: 'agent', val: 10 },
          { id: '4', label: 'Arabic-Agent', type: 'agent', val: 10 },
          { id: '5', label: 'Mandarin-Agent', type: 'agent', val: 10 },
          { id: '6', label: 'QAOA Solver', type: 'quantum_node', val: 15 },
          { id: '7', label: 'Error Rail', type: 'gateway', val: 12 },
          { id: '8', label: 'Provenance Log', type: 'gateway', val: 12 },
        ]);
        setLinks([
          { source: '1', target: '2', value: 1 },
          { source: '1', target: '3', value: 1 },
          { source: '1', target: '4', value: 1 },
          { source: '1', target: '5', value: 1 },
          { source: '2', target: '6', value: 2 },
          { source: '3', target: '6', value: 2 },
          { source: '4', target: '6', value: 2 },
          { source: '5', target: '6', value: 2 },
          { source: '6', target: '7', value: 3 },
          { source: '7', target: '8', value: 1 },
          { source: '8', target: '1', value: 1 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  // D3 Visualization Logic
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const width = 800;
    const height = 500;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    // Copy data to avoid mutating state directly in D3 simulation
    const nodesCopy = nodes.map(d => ({ ...d }));
    const linksCopy = links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<any>(nodesCopy)
      .force('link', d3.forceLink<any, any>(linksCopy).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#334155')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(linksCopy)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value) * 2);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodesCopy)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('circle')
      .attr('r', (d: any) => d.val)
      .attr('fill', (d: any) => {
        if (d.type === 'orchestrator') return '#38bdf8';
        if (d.type === 'agent') return '#818cf8';
        if (d.type === 'quantum_node') return '#c084fc';
        return '#94a3b8';
      })
      .attr('class', 'quantum-glow');

    node.append('text')
      .text((d: any) => d.label)
      .attr('x', 15)
      .attr('y', 5)
      .attr('fill', '#f8fafc')
      .style('font-size', '10px')
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [nodes, links]);

  const runQAOA = () => {
    setIsAnimating(true);
    const svg = d3.select(svgRef.current);
    
    // Attempt dynamic path animation based on connectivity
    const paths = ['1-2-6-7-8', '1-3-6-7-8', '1-4-6-7-8', '1-5-6-7-8'];
    
    paths.forEach((path, i) => {
      setTimeout(() => {
        const pulse = svg.append('circle')
          .attr('r', 4)
          .attr('fill', '#fb7185')
          .attr('cx', 400) // Start from center for visual effect
          .attr('cy', 250)
          .style('filter', 'blur(2px)');

        pulse.transition()
          .duration(2000)
          .attr('r', 100)
          .style('opacity', 0)
          .remove();
          
        if (i === paths.length - 1) setIsAnimating(false);
      }, i * 300);
    });
  };

  return (
    <div className="relative glass rounded-xl overflow-hidden p-4 min-h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-sky-400">Agent Orchestration Graph</h3>
          <p className="text-xs text-slate-400">
            {isLoading ? "Syncing with API..." : error ? error : "Live Dynamic LIMIT-GRAPH V2.3 Structure"}
          </p>
        </div>
        <button 
          onClick={runQAOA}
          disabled={isAnimating || isLoading}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            isAnimating || isLoading
            ? 'bg-slate-700 text-slate-500' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
          }`}
        >
          {isAnimating ? 'TRAVERSING...' : isLoading ? 'SYNCING...' : 'ANIMATE QAOA PATH'}
        </button>
      </div>

      {isLoading ? (
        <div className="w-full h-[400px] flex flex-col items-center justify-center bg-slate-900/50 rounded-lg gap-4">
          <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-sky-400 animate-pulse">ESTABLISHING QUANTUM LINK...</span>
        </div>
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center bg-slate-900/50 rounded-lg relative">
          <svg ref={svgRef} className="w-full h-full cursor-move" />
          {error && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] text-amber-500 font-bold uppercase tracking-widest">
              Local Fallback Active
            </div>
          )}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sky-400" /> Orchestrator</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-400" /> Agent</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400" /> Quantum Node</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400" /> Gateway</div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
