import React from 'react';
import type { TripSummary } from '../../types';
import { Route, Zap, BatteryCharging, Leaf } from 'lucide-react';

interface TripSummaryCardProps {
  summary: TripSummary;
}

const TripSummaryCard: React.FC<TripSummaryCardProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Today's Trip Summary</h2>
      
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 flex-1">
        
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Route className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Distance Travelled</p>
            <p className="text-lg font-bold text-slate-900">{summary.distanceTravelledKm} <span className="text-xs font-medium text-slate-500">km</span></p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="p-2 bg-purple-50 text-gridwise-purple rounded-lg">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Energy Consumed</p>
            <p className="text-lg font-bold text-slate-900">{summary.energyConsumedKwh} <span className="text-xs font-medium text-slate-500">kWh</span></p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="p-2 bg-green-50 text-gridwise-600 rounded-lg">
            <BatteryCharging className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Charging Sessions</p>
            <p className="text-lg font-bold text-slate-900">{summary.chargingSessions}</p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="p-2 bg-orange-50 text-gridwise-orange rounded-lg">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Avg. Efficiency</p>
            <p className="text-lg font-bold text-slate-900">{summary.averageEfficiency} <span className="text-xs font-medium text-slate-500">km/kWh</span></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripSummaryCard;
