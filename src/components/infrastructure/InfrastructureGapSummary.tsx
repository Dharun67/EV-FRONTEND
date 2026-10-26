import React from 'react';
import { Activity } from 'lucide-react';

const InfrastructureGapSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Infrastructure Gap Overview
      </h3>

      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Capacity</p>
            <p className="font-black text-slate-900 text-2xl">286</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Required Capacity</p>
            <p className="font-black text-slate-900 text-2xl">342</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Gap</p>
            <p className="font-black text-red-600 text-2xl">56</p>
          </div>
        </div>

        {/* Visual Comparison */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-slate-600">Current vs Required</span>
            <span className="text-red-600">56 Chargers Short</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-600" style={{ width: '83%' }}></div>
            <div className="h-full bg-red-500" style={{ width: '17%' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Utilization</p>
            <p className="font-black text-slate-900 text-xl">68%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="text-[10px] font-bold text-orange-700 uppercase tracking-wider mb-1">Projected Utilization</p>
            <p className="font-black text-orange-700 text-xl">84%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureGapSummary;
