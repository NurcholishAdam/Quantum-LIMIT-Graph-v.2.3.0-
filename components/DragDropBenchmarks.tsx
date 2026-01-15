
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BenchmarkData } from '../types';
import { analyzeBenchmarks } from '../services/gemini';

const INITIAL_DATA: BenchmarkData[] = [
  { language: 'English', standardLLM: 88, limitGraph: 94 },
  { language: 'Indonesian', standardLLM: 65, limitGraph: 89 },
  { language: 'Arabic', standardLLM: 58, limitGraph: 91 },
  { language: 'Mandarin', standardLLM: 72, limitGraph: 93 },
];

const DragDropBenchmarks: React.FC = () => {
  const [activeDatasets, setActiveDatasets] = useState<BenchmarkData[]>(INITIAL_DATA);
  const [draggedItem, setDraggedItem] = useState<BenchmarkData | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsAnalyzing(true);
      const text = await analyzeBenchmarks(activeDatasets);
      setAnalysis(text);
      setIsAnalyzing(false);
    };
    fetchAnalysis();
  }, [activeDatasets]);

  const handleDragStart = (item: BenchmarkData) => {
    setDraggedItem(item);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      addItem(draggedItem);
    }
  };

  const addItem = (item: BenchmarkData) => {
    if (!activeDatasets.find(d => d.language === item.language)) {
      setActiveDatasets(prev => [...prev, item]);
    }
  };

  const removeItem = (lang: string) => {
    setActiveDatasets(activeDatasets.filter(d => d.language !== lang));
  };

  const registryItems = ['French', 'Japanese', 'Hindi', 'Spanish', 'German'];

  return (
    <div className="glass rounded-xl p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-bold text-indigo-400">Multilingual Benchmarks</h3>
          <p className="text-xs text-slate-400">Click or drag items to compare LIMIT-GRAPH performance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {registryItems.map(lang => {
            const data: BenchmarkData = { 
              language: lang, 
              standardLLM: 45 + Math.random() * 25, 
              limitGraph: 80 + Math.random() * 15 
            };
            const isActive = activeDatasets.some(d => d.language === lang);
            return (
              <button 
                key={lang}
                draggable
                onDragStart={() => handleDragStart(data)}
                onClick={() => addItem(data)}
                disabled={isActive}
                className={`px-3 py-1 rounded-full border text-[10px] font-bold transition-all ${
                  isActive 
                  ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-indigo-600 hover:border-indigo-500 cursor-pointer active:scale-95'
                }`}
              >
                {isActive ? 'Added' : `+ ${lang}`}
              </button>
            );
          })}
        </div>
      </div>

      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex-grow min-h-[300px] w-full relative group rounded-xl border border-dashed border-transparent hover:border-indigo-500/30 transition-all bg-slate-900/20"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activeDatasets} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="language" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar dataKey="standardLLM" name="Standard LLM" fill="#334155" radius={[4, 4, 0, 0]} />
            <Bar dataKey="limitGraph" name="LIMIT-GRAPH" fill="#818cf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {activeDatasets.map(d => (
          <span key={d.language} className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-300 flex items-center gap-2 font-mono group hover:bg-indigo-500/20 transition-colors">
            {d.language.toUpperCase()}
            <button 
              onClick={() => removeItem(d.language)} 
              className="hover:text-rose-400 transition-colors p-0.5 rounded hover:bg-slate-800"
              aria-label={`Remove ${d.language}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </span>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
            <svg className={`w-3 h-3 text-indigo-400 ${isAnalyzing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gemini AI Analysis</h4>
        </div>
        <div className={`p-4 bg-slate-900/40 rounded-lg border border-slate-800 transition-opacity duration-500 cursor-default ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`}>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {analysis || "Gathering architectural insights for the current dataset..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DragDropBenchmarks;
