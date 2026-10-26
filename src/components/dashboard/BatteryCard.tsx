import React from 'react';
import type { BatteryStatus } from '../../types';
import { Battery, Zap, Info } from 'lucide-react';

interface BatteryCardProps {
  battery: BatteryStatus;
}

const BatteryCard: React.FC<BatteryCardProps> = ({ battery }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-full opacity-50 blur-xl pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-gridwise-500" />
          <h2 className="text-lg font-bold text-slate-900">EV Battery</h2>
        </div>
        <span className="px-3 py-1 bg-green-50 text-gridwise-600 text-xs font-semibold rounded-full border border-green-100 flex items-center gap-1">
          <Zap className="h-3 w-3 fill-current" /> Optimal
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10 mb-6">
        <div className="flex items-end gap-2 mb-2">
          <span className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{battery.currentPercentage}</span>
          <span className="text-2xl font-bold text-slate-400 mb-1">%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gridwise-500 to-green-400 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${battery.currentPercentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 relative z-10">
        <div>
          <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Estimated Range</p>
          <p className="text-xl font-bold text-slate-900">{battery.estimatedRangeKm} <span className="text-sm font-medium text-slate-500">km</span></p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Capacity</p>
          <p className="text-xl font-bold text-slate-900">{battery.capacityKwh} <span className="text-sm font-medium text-slate-500">kWh</span></p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-slate-50 rounded-xl flex items-start gap-2 border border-slate-100 relative z-10">
        <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-slate-600 font-medium">{battery.statusText}</p>
      </div>
    </div>
  );
};

export default BatteryCard;
