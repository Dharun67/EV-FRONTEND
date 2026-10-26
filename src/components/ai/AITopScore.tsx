import React from 'react';
import { BrainCircuit, CheckCircle2, TrendingUp } from 'lucide-react';
import { AIBadge } from '../shared/AIBadge';

export const AITopScore: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-2xl p-8 text-slate-900 shadow-lg relative overflow-hidden mb-6 h-full flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <BrainCircuit className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-bold">Network Intelligence Score</h2>
            <AIBadge type="insight" />
          </div>
          <p className="text-6xl font-black text-slate-900 mb-2">92<span className="text-2xl text-purple-300 font-bold">/100</span></p>
          <p className="text-purple-200 font-medium">GridWise AI engine reports high network stability with isolated expansion opportunities.</p>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">Operational Confidence</p>
            </div>
            <p className="text-2xl font-black text-slate-900">89%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">Forecast Confidence</p>
            </div>
            <p className="text-2xl font-black text-slate-900">87%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
