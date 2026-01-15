
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BenchmarkData } from '../types';

const data: BenchmarkData[] = [
  { language: 'English', standardLLM: 88, limitGraph: 94 },
  { language: 'Indonesian', standardLLM: 65, limitGraph: 89 },
  { language: 'Arabic', standardLLM: 58, limitGraph: 91 },
  { language: 'Mandarin', standardLLM: 72, limitGraph: 93 },
];

const MultilingualBenchmarks: React.FC = () => {
  return (
    <div className="glass rounded-xl p-6 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-indigo-400">Multilingual Benchmarks</h3>
        <p className="text-xs text-slate-400">LIMIT-GRAPH Accuracy vs Standard Baselines</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="language" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="standardLLM" name="Standard LLM" fill="#334155" radius={[4, 4, 0, 0]} />
            <Bar dataKey="limitGraph" name="LIMIT-GRAPH" fill="#818cf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-slate-900/40 rounded-lg border border-slate-800">
        <p className="text-xs text-slate-400 leading-relaxed italic">
          *LIMIT-GRAPH exhibits a 32.7% performance uplift in low-resource linguistics through dynamic semantic anchoring.
        </p>
      </div>
    </div>
  );
};

export default MultilingualBenchmarks;
