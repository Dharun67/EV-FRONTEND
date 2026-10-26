import React from 'react';
import { Zap } from 'lucide-react';

const EnergyEfficiency: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" /> Energy Efficiency
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Average</p>
          <p className="text-2xl font-black text-blue-600">5.02 <span className="text-sm font-medium text-slate-500">km/kWh</span></p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target</p>
          <p className="text-2xl font-black text-slate-900">5.20 <span className="text-sm font-medium text-slate-500">km/kWh</span></p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Best</p>
          <p className="text-xl font-black text-green-600">5.6 <span className="text-xs font-medium text-slate-500">km/kWh</span></p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Lowest</p>
          <p className="text-xl font-black text-red-600">4.1 <span className="text-xs font-medium text-slate-500">km/kWh</span></p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Progress to Target</span>
          <span>96%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '96%' }}></div>
        </div>
      </div>
      <p className="text-xs font-medium text-slate-500 mt-2">
        You are 96% of the way to your efficiency target.
      </p>
    </div>
  );
};

export default EnergyEfficiency;
