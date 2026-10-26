import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const AIDemandInsight: React.FC = () => {
  return (
    <div className="bg-purple-900 rounded-2xl border border-purple-700 p-6 shadow-md mb-6 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600 rounded-full opacity-20 blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-purple-100 flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-purple-400" /> GridWise AI Demand Insight
          </h3>
          <span className="bg-purple-800 text-purple-200 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-purple-600 shadow-sm hidden sm:block">
            AI INSIGHT
          </span>
        </div>
        
        <p className="text-purple-200 font-medium leading-relaxed mb-4 text-sm sm:text-base">
          "Evening charging demand is expected to remain high between 6 PM and 8 PM. <span className="font-bold text-slate-900">Gandhipuram</span>, <span className="font-bold text-slate-900">Avinashi Road</span> and <span className="font-bold text-slate-900">Peelamedu</span> are showing the strongest demand signals."
        </p>
        
        <div className="bg-purple-800/50 p-4 rounded-xl border border-purple-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-purple-300 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-bold text-purple-100">Consider increasing charging capacity and dynamically adjusting slot availability in these zones.</p>
          </div>
        </div>
        <p className="text-[10px] text-purple-400 mt-4 text-right">AI Analysis Engine</p>
      </div>
    </div>
  );
};

export default AIDemandInsight;
