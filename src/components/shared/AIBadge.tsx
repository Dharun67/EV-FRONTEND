import React from 'react';

export const AIBadge: React.FC<{ type?: 'insight' | 'Operational' | 'confidence' | 'simulated' }> = ({ type = 'insight' }) => {
  if (type === 'Operational' || type === 'simulated') {
    return (
      <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-slate-700 shadow-sm whitespace-nowrap">
        SIMULATED ANALYSIS
      </span>
    );
  }
  
  if (type === 'confidence') {
    return (
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-green-200 shadow-sm whitespace-nowrap">
        HIGH CONFIDENCE
      </span>
    );
  }

  return (
    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-purple-200 shadow-sm whitespace-nowrap">
      AI INSIGHT
    </span>
  );
};
