
import React, { useState } from 'react';
import Header from './components/Header';
import GraphVisualizer from './components/GraphVisualizer';
import DragDropBenchmarks from './components/DragDropBenchmarks';
import ProvenanceTimeline from './components/ProvenanceTimeline';
import AIInsights from './components/AIInsights';
import FeatureDetails from './components/FeatureDetails';

const App: React.FC = () => {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleSettingClick = (label: string) => {
    setLastAction(`Updating ${label}...`);
    setTimeout(() => setLastAction(`System: ${label} config synchronized.`), 1500);
    setTimeout(() => setLastAction(null), 4000);
  };

  const settings = [
    { label: 'Quantum Precision', value: 'High (64-bit)', desc: 'Controls QAOA solver accuracy.' },
    { label: 'Inference Mode', value: 'Deterministic', desc: 'Ensures output reproducibility.' },
    { label: 'Cluster Region', value: 'QAOA-PROD-GLOBAL', desc: 'Current active compute nodes.' },
    { label: 'Hallucination Threshold', value: '0.15 σ', desc: 'Sensitivity of the Error Rail.' },
    { label: 'Multilingual Anchoring', value: 'Enabled', desc: 'Dynamic semantic bridging active.' },
    { label: 'API Sync interval', value: '500ms', desc: 'Dashboard update frequency.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-20 selection:bg-indigo-500/30">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 space-y-16 animate-in fade-in duration-700">
        
        {/* Dashboard Section */}
        <section id="dashboard" className="scroll-mt-24 space-y-8">
          <FeatureDetails />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <GraphVisualizer />
            </div>
            <div className="lg:col-span-4">
              <AIInsights />
            </div>
          </div>
        </section>

        {/* Benchmarks Section */}
        <section id="benchmarks" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <DragDropBenchmarks />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="glass p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-default">
                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Inference Node Health</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-slate-500 font-mono">NODE_UPTIME</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">99.999%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="p-6 glass rounded-2xl border border-indigo-500/20">
                <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Benchmark Notice</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Data points are aggregated from over 5,000 heterogeneous inference tasks processed via the QAOA optimizer. Accuracy metrics represent 95% confidence intervals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Provenance Section */}
        <section id="provenance" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ProvenanceTimeline />
            </div>
            <div className="lg:col-span-4">
              <div className="glass p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 h-full">
                <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-4">Security Audit</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  All provenance events are signed using the <span className="font-mono text-rose-400">Ed25519</span> algorithm and committed to the immutable state vector.
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-slate-500">
                    LAST_HASH: 0x82f...a3e
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-slate-500">
                    SIGNATURE: VALID
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section id="settings" className="scroll-mt-24 pb-20">
          <div className="glass p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
            {lastAction && (
              <div className="absolute top-8 right-8 bg-indigo-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded shadow-lg animate-in fade-in slide-in-from-right-4 duration-300">
                {lastAction}
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              System Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settings.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSettingClick(s.label)}
                  className="text-left p-4 bg-slate-900/40 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all group active:scale-[0.98]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{s.label}</span>
                    <span className="text-xs font-bold text-sky-400">{s.value}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end gap-4">
              <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-lg text-xs font-bold transition-all uppercase tracking-widest">
                Factory Reset
              </button>
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-lg text-xs font-bold text-white transition-all shadow-lg shadow-indigo-500/20 uppercase tracking-widest">
                Apply Changes
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 glass border-t border-slate-800/50 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">LIVE_SYNC_READY</span>
             </div>
             <div className="hidden md:flex h-5 w-px bg-slate-800"></div>
             <div className="hidden md:block text-[10px] font-mono text-slate-500">
               VERSION: 2.3.0-STABLE | CLUSTER: QAOA_PROD_01
             </div>
          </div>
          <div className="flex items-center gap-6">
             <button className="text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-tighter cursor-pointer">Documentation</button>
             <button className="text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-tighter cursor-pointer">Source Code</button>
             <button className="px-4 py-1.5 bg-slate-800 hover:bg-indigo-600 rounded text-[10px] font-bold text-white transition-all shadow-xl active:scale-95">EXPORT_REPORT</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
