import React from 'react';
import { JourneyContext } from '../../types/ai';
import { Zap, IndianRupee, Clock } from 'lucide-react';

interface SmartChargingStrategyProps {
  context: JourneyContext;
}

const SmartChargingStrategy: React.FC<SmartChargingStrategyProps> = ({ context }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4">Smart Charging Strategy</h3>
      
      <div className="bg-blue-600/5 border border-gridwise-blue/20 rounded-xl p-4 mb-6">
        <p className="font-bold text-blue-600 mb-1">Charge only enough to comfortably complete your journey.</p>
        <p className="text-sm text-slate-600">
          Because your route is only {context.distanceKm} km and your current battery is sufficient, a full charge is unnecessary.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Battery</p>
          <p className="font-black text-slate-900 text-lg">{context.currentBatteryPercentage}%</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Recommended Charge</p>
          <p className="font-black text-blue-600 text-lg">+10%</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Battery</p>
          <p className="font-black text-slate-900 text-lg">82%</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 mb-6">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <Zap className="h-4 w-4 text-green-500" />
          <span className="text-sm font-bold text-slate-700">Added Range: +40 km</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <IndianRupee className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-bold text-slate-700">Cost: ₹98</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <Clock className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-bold text-slate-700">Time: 8 min</span>
        </div>
      </div>

      <button className="w-full py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors shadow-sm">
        Optimize Charge
      </button>
    </div>
  );
};

export default SmartChargingStrategy;
