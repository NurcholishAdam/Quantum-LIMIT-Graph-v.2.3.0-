
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['dashboard', 'benchmarks', 'provenance', 'settings'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'benchmarks', label: 'Benchmarks' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <header className="glass border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <span className="text-white font-black text-lg">Q</span>
          </div>
          <a href="#dashboard" className="block">
            <h1 className="text-lg font-black tracking-tighter text-white">
              LIMIT-GRAPH <span className="text-sky-400 text-sm font-normal ml-1 tracking-widest uppercase">v2.3.0</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono -mt-1 uppercase tracking-widest">
              Quantum Agent Orchestration
            </p>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-xs font-bold transition-all border-b-2 pb-1 ${
                activeSection === item.id 
                ? 'text-sky-400 border-sky-400' 
                : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Active Project</span>
            <span className="text-xs font-bold text-slate-300 tracking-tight">AI-RESEARCH-AGENT-TEAM</span>
          </div>
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
