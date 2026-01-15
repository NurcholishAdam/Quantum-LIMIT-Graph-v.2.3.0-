
import React, { useState, useEffect } from 'react';
import { getGraphInsights } from '../services/gemini';
import { AIInsight } from '../types';

const AIInsights: React.FC = () => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const data = await getGraphInsights(8, 11);
      setInsight(data);
      setLoading(false);
    };
    fetchInsight();
  }, []);

  return (
    <div className="glass rounded-xl p-6 h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-24 h-24 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" /></svg>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-sky-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-sky-400">AI Architecture Analyst</h3>
          <p className="text-xs text-slate-500 font-mono">powered by gemini-3-flash</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-6 bg-slate-800 rounded animate-pulse w-3/4"></div>
          <div className="h-20 bg-slate-800 rounded animate-pulse"></div>
          <div className="h-32 bg-slate-800 rounded animate-pulse"></div>
        </div>
      ) : insight ? (
        <div className="space-y-4">
          <div className="p-3 bg-sky-500/5 border-l-2 border-sky-500 rounded-r-lg">
            <h4 className="text-sm font-bold text-sky-300 uppercase tracking-tight">{insight.title}</h4>
          </div>
          <p className="text-sm font-medium text-slate-300 leading-relaxed">
            {insight.summary}
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/50">
             <h5 className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">In-depth Analysis</h5>
             <p className="text-xs text-slate-400 leading-relaxed font-mono">
               {insight.details}
             </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Real-time Context Synced</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AIInsights;
