
import React, { useState, useEffect } from 'react';
import { getGraphInsights } from '../services/gemini';
import { AIInsight } from '../types';

const AIInsights: React.FC = () => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [history, setHistory] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    const data = await getGraphInsights(8, 11);
    
    if (insight) {
      setHistory(prev => [insight, ...prev].slice(0, 3));
    }
    
    setInsight(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  return (
    <div className="glass rounded-xl p-6 h-full relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-24 h-24 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" /></svg>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
            <svg className="w-6 h-6 text-sky-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-sky-400">Deep Reasoning Hub</h3>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">32k Thinking Budget Active</p>
          </div>
        </div>
        <button 
          onClick={fetchInsight}
          disabled={loading}
          className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-400"
          title="Refresh Reasoning"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      </div>

      {loading ? (
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-sky-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-sky-400 rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-xs font-mono text-sky-400 animate-pulse mb-1">ALLOCATING QUANTA...</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em]">Gemini 3 Pro Thinking</p>
          </div>
        </div>
      ) : insight ? (
        <div className="flex-grow flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-3 bg-sky-500/5 border-l-2 border-sky-500 rounded-r-lg">
            <h4 className="text-sm font-bold text-sky-300 uppercase tracking-tight">{insight.title}</h4>
          </div>
          <p className="text-sm font-medium text-slate-300 leading-relaxed">
            {insight.summary}
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/50">
             <h5 className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Neural Chain Logic</h5>
             <p className="text-xs text-slate-400 leading-relaxed font-mono">
               {insight.details}
             </p>
          </div>
          
          {/* Collapsible History Section */}
          {history.length > 0 && (
            <div className="mt-4 border-t border-slate-800/50 pt-4">
              <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="w-full flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-sky-400 transition-colors group"
              >
                <span>Analysis History ({history.length})</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isHistoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isHistoryOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-3">
                  {history.map((h, i) => (
                    <div key={i} className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/50 hover:border-sky-500/30 transition-colors">
                      <h5 className="text-[10px] font-bold text-sky-400/70 mb-1">{h.title}</h5>
                      <p className="text-[10px] text-slate-500 line-clamp-2">{h.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mt-auto pt-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Architectural Provenance Confirmed</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AIInsights;
