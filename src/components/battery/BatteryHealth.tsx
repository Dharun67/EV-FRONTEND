import React from 'react';

const BatteryHealth: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900">Battery Health</h3>
        <div className="text-right">
          <span className="text-2xl font-black text-slate-900">94%</span>
          <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ml-2">Excellent</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
            <span>Battery Capacity Retention</span>
            <span>94%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[94%]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
            <span>Cell Balance</span>
            <span>98%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[98%]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
            <span>Temperature Stability</span>
            <span>96%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[96%]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
            <span>Charging Efficiency</span>
            <span>93%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[93%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryHealth;
