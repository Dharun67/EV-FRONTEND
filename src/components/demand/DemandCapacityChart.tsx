import React from 'react';
import { BatteryCharging } from 'lucide-react';

const DemandCapacityChart: React.FC = () => {
  const data = [
    { label: 'Morning', demand: 62, capacity: 85, required: 50 },
    { label: 'Afternoon', demand: 72, capacity: 85, required: 65 },
    { label: 'Evening', demand: 94, capacity: 85, required: 95 },
    { label: 'Night', demand: 63, capacity: 85, required: 55 },
  ];

  const maxVal = 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <BatteryCharging className="w-5 h-5 text-slate-400" /> Demand vs Available Capacity
        </h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded bg-red-400"></div> Demand
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded bg-blue-200"></div> Capacity
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-4 h-48 mb-4 px-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group relative justify-end h-full gap-1">
            <div className="w-full flex items-end justify-center gap-1 h-full">
              {/* Demand Bar */}
              <div 
                className={`w-1/2 rounded-t-sm transition-all ${item.demand > item.capacity ? 'bg-red-500' : 'bg-red-300'}`}
                style={{ height: `${(item.demand / maxVal) * 100}%` }}
              ></div>
              {/* Capacity Bar */}
              <div 
                className="w-1/2 rounded-t-sm bg-blue-200 transition-all"
                style={{ height: `${(item.capacity / maxVal) * 100}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center hidden sm:block">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="bg-red-50 border border-red-100 p-3 rounded-xl mt-auto">
        <p className="text-xs font-bold text-red-700 text-center">Evening capacity deficit detected. Peak demand exceeds available supply.</p>
      </div>
    </div>
  );
};

export default DemandCapacityChart;
