import React from 'react';
import { ShieldCheck } from 'lucide-react';

const CoverageScore: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>

      <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 self-start w-full">
        <ShieldCheck className="w-5 h-5 text-blue-600" /> Network Coverage Score
      </h3>

      <div className="relative w-40 h-40 mt-4 mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            stroke="#f1f5f9" 
            strokeWidth="12" 
          />
          {/* Progress circle */}
          <circle 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            stroke="#2563eb" 
            strokeWidth="12"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * 0.78)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900 leading-none">78</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">/ 100</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Score</p>
          <p className="font-black text-slate-900 text-lg">90 / 100</p>
        </div>
        <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-center">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Coverage Gap</p>
          <p className="font-black text-red-600 text-lg">12 points</p>
        </div>
      </div>

      <p className="text-xs font-medium text-slate-600 text-center bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
        "Charging coverage is strong in central urban areas but weaker in suburban and highway corridors."
      </p>

    </div>
  );
};

export default CoverageScore;
