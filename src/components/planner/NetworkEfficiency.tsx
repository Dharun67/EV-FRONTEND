import React from 'react';
import { Target } from 'lucide-react';

const NetworkEfficiency: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-slate-400" /> Network Efficiency
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Charger Uptime</p>
          <p className="text-2xl font-black text-green-600">96.8%</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Successful Sessions</p>
          <p className="text-2xl font-black text-green-600">98.2%</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Queue Time</p>
          <p className="text-2xl font-black text-slate-900">7 min</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Charging Time</p>
          <p className="text-2xl font-black text-slate-900">28 min</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fault Rate</p>
          <p className="text-2xl font-black text-orange-600">2.4%</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Customer Satisfaction</p>
          <p className="text-2xl font-black text-purple-600">4.7 / 5</p>
        </div>
      </div>
    </div>
  );
};

export default NetworkEfficiency;
