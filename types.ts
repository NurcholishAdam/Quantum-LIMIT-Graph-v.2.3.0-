
import * as d3 from 'd3';

// Fix: Extended d3.SimulationNodeDatum requires d3 namespace to be available via import
export interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'orchestrator' | 'agent' | 'gateway' | 'quantum_node';
  val: number;
}

// Fix: Extended d3.SimulationLinkDatum requires d3 namespace to be available via import
export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

export interface BenchmarkData {
  language: string;
  standardLLM: number;
  limitGraph: number;
}

export interface ProvenanceEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  status: 'success' | 'correction' | 'pending';
}

export interface AIInsight {
  title: string;
  summary: string;
  details: string;
}
