import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const AIInfrastructureInsight: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-md mb-6 relative overflow-hidden text-slate-900 h-full flex flex-col">
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-bold text-slate-100 flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-purple-400" /> GridWise AI Infrastructure Insight
          </h3>
          <div className="flex gap-2">
            <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-purple-700/50 shadow-sm">
              AI INSIGHT
            </span>
            <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-slate-700 shadow-sm hidden sm:block">
              SIMULATED ANALYSIS
            </span>
          </div>
        </div>
        
        <p className="text-slate-300 font-medium leading-relaxed mb-6 text-sm md:text-base flex-1">
          "Five zones currently show a combination of high charging demand and insufficient infrastructure. <span className="font-bold text-slate-900">Gandhipuram</span> has the highest expansion priority based on its critical 8-charger deficit and projected 22% demand growth."
        </p>
        
        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 backdrop-blur-sm mb-6">
          <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">Primary Recommendation</p>
          <p className="font-bold text-slate-100">
            "Prioritize 8 additional chargers in Gandhipuram, followed by Avinashi Road and Saravanampatti."
          </p>
        </div>

        <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-slate-900 rounded-xl font-bold shadow-sm transition-colors flex items-center justify-center gap-2">
          Generate Full AI Report <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIInfrastructureInsight;
