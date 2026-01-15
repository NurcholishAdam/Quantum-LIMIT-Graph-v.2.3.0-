
import React from 'react';

const FeatureDetails: React.FC = () => {
  const features = [
    {
      title: "Error Correction Rails",
      description: "LIMIT-GRAPH implements multi-layered verification. Every agent output is cross-referenced against a vector-grounded 'Truth Gateway'. If variance exceeds 15%, the QAOA optimizer triggers a rerouting event to prevent hallucination cascades.",
      icon: (
        <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Deterministic Reproducibility",
      description: "By leveraging a hash-linked provenance timeline, LIMIT-GRAPH ensures that any inference path can be replayed with 100% fidelity. This 'Reproducibility Rail' is critical for enterprise auditing and safety compliance.",
      icon: (
        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "QAOA Path Optimization",
      description: "Traditional agent chains are linear. LIMIT-GRAPH uses the Quantum Approximate Optimization Algorithm (QAOA) to evaluate all possible traversal paths simultaneously, selecting the most contextually relevant route in O(1) time.",
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div key={i} className="glass p-6 rounded-2xl border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all group cursor-default">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h4 className="font-bold text-slate-200">{f.title}</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {f.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureDetails;
