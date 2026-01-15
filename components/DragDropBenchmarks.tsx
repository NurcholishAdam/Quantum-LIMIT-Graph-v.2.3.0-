
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BenchmarkData } from '../types';

const INITIAL_DATA: BenchmarkData[] = [
  { language: 'English', standardLLM: 88, limitGraph: 94 },
  { language: 'Indonesian', standardLLM: 65, limitGraph: 89 },
  { language: 'Arabic', standardLLM: 58, limitGraph: 91 },
  { language: 'Mandarin', standardLLM: 72, limitGraph: 93 },
];

const DragDropBenchmarks: React.FC = () => {
  const [activeDatasets, setActiveDatasets] = useState<BenchmarkData[]>(INITIAL_DATA);
  const [draggedItem, setDraggedItem] = useState<BenchmarkData | null>(null);

  const handleDragStart = (item: BenchmarkData) => {
    setDraggedItem(item);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && !activeDatasets.find(d => d.language === draggedItem.language)) {
      setActiveDatasets([...activeDatasets, draggedItem]);
    }
  };

  const removeItem = (lang: string) => {
    setActiveDatasets(activeDatasets.filter(d => d.language !== lang));
  };

  return (
    <div className="glass rounded-xl p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-bold text-indigo-400">Multilingual Benchmarks</h3>
          <p className="text-xs text-slate-400">Drag items from the registry to compare LIMIT-GRAPH performance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['French', 'Japanese', 'Hindi', 'Spanish', 'German'].map(lang => (
            <div 
              key={lang}
              draggable
              onDragStart={() => handleDragStart({ language: lang, standardLLM: 45 + Math.random() * 25, limitGraph: 80 + Math.random() * 15 })}
              className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-[10px] cursor-grab active:cursor-grabbing hover:bg-slate-700 text-slate-300 font-bold transition-colors"
            >
              + {lang}
            </div>
          ))}
        </div>
      </div>

      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex-grow min-h-[300px] w-full relative group rounded-xl border border-dashed border-transparent hover:border-indigo-500/30 transition-all"
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
          <span key={d.language} className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-300 flex items-center gap-2 font-mono">
            {d.language.toUpperCase()}
            <button onClick={() => removeItem(d.language)} className="hover:text-white transition-colors">&times;</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DragDropBenchmarks;
