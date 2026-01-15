
import React from 'react';
import Header from './components/Header';
import GraphVisualizer from './components/GraphVisualizer';
import DragDropBenchmarks from './components/DragDropBenchmarks';
import ProvenanceTimeline from './components/ProvenanceTimeline';
import AIInsights from './components/AIInsights';
import FeatureDetails from './components/FeatureDetails';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-20 selection:bg-indigo-500/30">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 space-y-8 animate-in fade-in duration-700">
        {/* Descriptive blocks for unique features */}
        <FeatureDetails />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Visualizer & Benchmarks Area */}
          <div className="lg:col-span-8 space-y-8">
            <GraphVisualizer />
            <DragDropBenchmarks />
          </div>

          {/* Analysis & Provenance Side Panel */}
          <div className="lg:col-span-4 space-y-8">
            <AIInsights />
            <ProvenanceTimeline />
            
            {/* Real-time Performance Tracking Widget */}
            <div className="glass p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
              <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Architecture Health</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-slate-500 font-mono">NODE_UPTIME</span>
                  <span className="text-sm font-bold font-mono text-emerald-400">99.999%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] animate-pulse"></div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-slate-500 font-mono">LATENCY_P99</span>
                  <span className="text-sm font-bold font-mono text-sky-400">14.2ms</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[14%] h-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Status Footer */}
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
             <button className="text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-tighter">Documentation</button>
             <button className="text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-tighter">Source Code</button>
             <button className="px-4 py-1.5 bg-slate-800 hover:bg-indigo-600 rounded text-[10px] font-bold text-white transition-all shadow-xl">EXPORT_REPORT</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
