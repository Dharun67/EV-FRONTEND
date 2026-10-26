import React from 'react';
import { Activity } from 'lucide-react';

const EVGrowthAnalysis: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col relative overflow-hidden">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
        <Activity className="w-5 h-5 text-slate-400" /> EV Adoption vs Charging Capacity
      </h3>

      <div className="flex-1 space-y-6 relative z-10">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">EV Adoption Growth</span>
            <span className="font-black text-green-600">+24%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[80%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Charging Infra Growth</span>
            <span className="font-black text-blue-600">+15%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[50%]"></div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex justify-between items-center">
          <span className="font-bold text-orange-800">Growth Gap</span>
          <span className="font-black text-orange-600 text-xl">9%</span>
        </div>
      </div>

      <p className="text-center text-xs font-bold text-slate-600 mt-6 relative z-10 bg-slate-50 p-3 rounded-xl border border-slate-200">
        "EV adoption is growing faster than charging infrastructure."
      </p>
    </div>
  );
};

export default EVGrowthAnalysis;
