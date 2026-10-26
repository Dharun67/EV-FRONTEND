import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const AIDemandInsight: React.FC = () => {
  return (
    <div className="bg-purple-900 rounded-2xl border border-purple-700 p-6 shadow-md mb-6 relative overflow-hidden">
      {/* Decorative */}
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
          "Charging demand is consistently highest between 6 PM and 8 PM. Stations around <span className="font-bold text-slate-900">Avinashi Road</span> and <span className="font-bold text-slate-900">Gandhipuram</span> are approaching peak utilization."
        </p>
        
        <div className="bg-purple-800/50 p-4 rounded-xl border border-purple-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-purple-300 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-bold text-purple-100">Consider increasing available capacity in these zones during evening hours.</p>
          </div>
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-slate-900 rounded-lg font-bold text-xs shadow-sm transition-colors flex-shrink-0">
            View Capacity Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIDemandInsight;
