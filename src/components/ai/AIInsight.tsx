import React from 'react';
import { Sparkles } from 'lucide-react';

const AIInsight: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 shadow-md mb-6 relative overflow-hidden text-slate-900 border border-indigo-700">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Sparkles className="h-24 w-24 text-purple-300" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-white/10 p-1.5 rounded-lg shadow-sm border border-white/20">
            <Sparkles className="h-4 w-4 text-purple-300" />
          </div>
          <h3 className="font-bold text-slate-900">GridWise AI Insight</h3>
          <span className="ml-auto bg-white/20 text-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm border border-white/20">AI</span>
        </div>
        
        <p className="text-sm text-indigo-50 font-medium leading-relaxed italic">
          "Your battery is already sufficient for this trip. If you prefer a quick top-up before departure, GridWise Central Hub is the most efficient option because it combines high availability, fast charging and low route deviation."
        </p>
      </div>
    </div>
  );
};

export default AIInsight;
