
import React from 'react';
import { ProvenanceEvent } from '../types';

const EVENTS: ProvenanceEvent[] = [
  { id: '1', timestamp: '2024-05-20 10:00:01', action: 'Inference Start', actor: 'Master Orchestrator', details: 'Initialized multilingual pipeline.', status: 'success' },
  { id: '2', timestamp: '2024-05-20 10:00:04', action: 'Hallucination Detected', actor: 'Error Rail', details: 'Detected variance > 0.4 in Arabic reasoning.', status: 'correction' },
  { id: '3', timestamp: '2024-05-20 10:00:05', action: 'Path Correction', actor: 'QAOA Solver', details: 'Rerouted to Semantic Anchor node 4B.', status: 'success' },
  { id: '4', timestamp: '2024-05-20 10:00:08', action: 'Consistency Verified', actor: 'Provenance Log', details: 'Hash: 0x82f...a3 matched gold standard.', status: 'success' },
  { id: '5', timestamp: '2024-05-20 10:00:10', action: 'Final Output Render', actor: 'Master Orchestrator', details: 'Success with 0.99 reproducibility score.', status: 'success' },
];

const ProvenanceTimeline: React.FC = () => {
  return (
    <div className="glass rounded-xl p-6 h-full">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-rose-400">Provenance Timeline</h3>
          <p className="text-xs text-slate-400">Reproducibility & Correction Lineage</p>
        </div>
        <div className="px-3 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-bold rounded-full border border-rose-500/20">
          REPRODUCIBILITY: 99.9%
        </div>
      </div>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-z-10 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rose-500 before:via-slate-800 before:to-transparent">
        {EVENTS.map((event) => (
          <div key={event.id} className="relative pl-10 group">
            <div className={`absolute left-0 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center transition-all ${
              event.status === 'correction' ? 'bg-amber-500 ring-4 ring-amber-500/20' : 'bg-rose-500 ring-4 ring-rose-500/20'
            }`}>
              {event.status === 'correction' ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              ) : (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-mono text-slate-500">{event.timestamp}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                  event.status === 'correction' ? 'text-amber-400 bg-amber-400/10' : 'text-emerald-400 bg-emerald-400/10'
                }`}>
                  {event.actor}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200">{event.action}</h4>
              <p className="text-xs text-slate-400 mt-1">{event.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProvenanceTimeline;
