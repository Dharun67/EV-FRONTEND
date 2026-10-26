import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const SmartChargingInsight: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-sm mb-6 text-slate-900">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-blue-600" />
        <h3 className="font-bold">Smart Charging Recommendation</h3>
      </div>
      
      <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
        "Your charging pattern shows frequent fast-charging sessions. When time allows, using slower AC charging can reduce battery stress."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 border border-white/5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended</p>
          <p className="font-bold text-slate-900 mb-2">AC Charging</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended Target</p>
          <p className="font-bold text-slate-900">80–85%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 border border-white/5 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">Avoid</p>
          <p className="text-sm font-medium text-slate-300">
            Frequent 100% charging unless required for long trips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartChargingInsight;
