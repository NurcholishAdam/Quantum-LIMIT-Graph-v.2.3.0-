
import React, { useState, useMemo } from 'react';
import { ProvenanceEvent } from '../types';

const EVENTS: ProvenanceEvent[] = [
  { id: '1', timestamp: '2024-05-20 10:00:01', action: 'Inference Start', actor: 'Master Orchestrator', details: 'Initialized multilingual pipeline.', status: 'success' },
  { id: '2', timestamp: '2024-05-20 10:00:04', action: 'Hallucination Detected', actor: 'Error Rail', details: 'Detected variance > 0.4 in Arabic reasoning.', status: 'correction' },
  { id: '3', timestamp: '2024-05-20 10:00:05', action: 'Path Correction', actor: 'QAOA Solver', details: 'Rerouted to Semantic Anchor node 4B.', status: 'success' },
  { id: '4', timestamp: '2024-05-20 10:00:08', action: 'Consistency Verified', actor: 'Provenance Log', details: 'Hash: 0x82f...a3 matched gold standard.', status: 'success' },
  { id: '5', timestamp: '2024-05-20 10:00:10', action: 'Final Output Render', actor: 'Master Orchestrator', details: 'Success with 0.99 reproducibility score.', status: 'success' },
];

const ProvenanceTimeline: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'success' | 'correction'>('all');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return EVENTS;
    return EVENTS.filter(event => event.status === filter);
  }, [filter]);

  const counts = {
    all: EVENTS.length,
    success: EVENTS.filter(e => e.status === 'success').length,
    correction: EVENTS.filter(e => e.status === 'correction').length,
  };

  return (
    <div className="glass rounded-xl p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-rose-400">Provenance Timeline</h3>
            <p className="text-xs text-slate-400">Reproducibility & Correction Lineage</p>
          </div>
          <div className="px-3 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-bold rounded-full border border-rose-500/20">
            REPRODUCIBILITY: 99.9%
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-slate-900/60 rounded-lg border border-slate-800 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
              filter === 'all' 
                ? 'bg-slate-700 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
              filter === 'success' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'text-slate-500 hover:text-emerald-400'
            }`}
          >
            Success ({counts.success})
          </button>
          <button
            onClick={() => setFilter('correction')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
              filter === 'correction' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-500 hover:text-amber-400'
            }`}
          >
            Correction ({counts.correction})
          </button>
        </div>
      </div>
      
      <div className="flex-grow space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-z-10 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rose-500 before:via-slate-800 before:to-transparent overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div 
              key={event.id} 
              onClick={() => setSelectedEventId(selectedEventId === event.id ? null : event.id)}
              className={`relative pl-10 group cursor-pointer transition-all duration-300 ${
                selectedEventId === event.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'
              }`}
            >
              <div className={`absolute left-0 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center transition-all z-10 ${
                event.status === 'correction' ? 'bg-amber-500 ring-4 ring-amber-500/20' : 'bg-rose-500 ring-4 ring-rose-500/20'
              }`}>
                {event.status === 'correction' ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
              <div className={`bg-slate-900/50 p-3 rounded-lg border transition-all ${
                selectedEventId === event.id 
                  ? 'border-indigo-500 bg-slate-900 ring-1 ring-indigo-500/30' 
                  : 'border-slate-800 group-hover:border-slate-700'
              }`}>
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
                
                {selectedEventId === event.id && (
                  <div className="mt-4 pt-4 border-t border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 uppercase font-black">Event Hash</span>
                        <span className="text-indigo-400 font-mono">0x{Math.random().toString(16).slice(2, 10)}...</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 uppercase font-black">Consistency Score</span>
                        <span className="text-emerald-400 font-mono">0.9992</span>
                      </div>
                      <button className="mt-2 w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold text-slate-300 transition-colors uppercase tracking-widest">
                        Copy Audit Trail
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-600">
            <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">No events found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvenanceTimeline;
