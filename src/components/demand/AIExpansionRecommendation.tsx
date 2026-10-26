import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AIExpansionRecommendationProps {
  onReview: () => void;
}

const AIExpansionRecommendation: React.FC<AIExpansionRecommendationProps> = ({ onReview }) => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-md mb-6 relative overflow-hidden text-slate-900">
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-600 rounded-full opacity-20 blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-purple-400" /> AI Infrastructure Recommendation
          </h3>
          <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-purple-700/50 shadow-sm hidden sm:block">
            SIMULATED AI
          </span>
        </div>
        
        <p className="text-slate-300 font-medium leading-relaxed mb-6 text-sm sm:text-base">
          "Based on simulated demand, utilization and growth signals, <span className="font-bold text-slate-900">Gandhipuram</span> has the strongest case for near-term charging expansion."
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Opportunity Score</p>
            <p className="font-black text-purple-400">96 / 100</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended</p>
            <p className="font-black text-blue-400">+7</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Type</p>
            <p className="font-black text-slate-200 text-xs mt-1">DC Fast</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Priority</p>
            <p className="font-black text-red-400 uppercase tracking-wider text-xs mt-1">Critical</p>
          </div>
        </div>

        <button 
          onClick={onReview}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-600 text-white rounded-xl font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          Review Recommendation <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIExpansionRecommendation;
