import React from 'react';
import { RouteOption } from '../../types/route';

interface AlternativeRouteCardProps {
  route: RouteOption;
  onSelect: (id: string) => void;
}

const AlternativeRouteCard: React.FC<AlternativeRouteCardProps> = ({ route, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-gridwise-blue hover:shadow-md transition-all cursor-pointer flex flex-col h-full" onClick={() => onSelect(route.id)}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-slate-900">{route.name}</h4>
        {route.badge && (
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-100 text-slate-600">
            {route.badge}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4 mt-2">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
          <p className="text-sm font-bold text-slate-900">{route.distanceKm} km</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Time</p>
          <p className="text-sm font-bold text-slate-900">{Math.floor(route.durationMinutes / 60)}h {route.durationMinutes % 60}m</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Energy</p>
          <p className="text-sm font-bold text-slate-900">{route.energyRequiredKwh} kWh</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Arr. Battery</p>
          <p className="text-sm font-bold text-slate-900">{route.arrivalBatteryPercentage}%</p>
        </div>
      </div>

      <button className="mt-auto w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border border-slate-200">
        Select Route
      </button>
    </div>
  );
};

export default AlternativeRouteCard;
