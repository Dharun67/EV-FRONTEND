import React from 'react';
import { Zap } from 'lucide-react';

interface EnergyAnalyticsProps {
  data: Array<{ label: string, value: number }>;
}

const EnergyAnalytics: React.FC<EnergyAnalyticsProps> = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-500" /> Energy Delivered
        </h3>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today</span>
          <p className="text-xl font-black text-blue-600">4,826 kWh</p>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 h-48 mb-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group relative justify-end h-full">
            <div className="absolute bottom-full mb-2 bg-slate-900 text-white p-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              {item.value.toLocaleString()} kWh
            </div>
            <div 
              className={`w-full max-w-[40px] rounded-t-sm transition-all ${idx === 0 ? 'bg-blue-500' : 'bg-blue-200 group-hover:bg-blue-300'}`}
              style={{ height: `${(item.value / maxVal) * 100}%` }}
            ></div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center hidden sm:block">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">This Week</p>
          <p className="font-bold text-slate-900">31,420 kWh</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Session</p>
          <p className="font-bold text-slate-900">18.6 kWh</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyAnalytics;
