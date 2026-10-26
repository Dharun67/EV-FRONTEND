import React from 'react';
import { Award, Battery } from 'lucide-react';

const BestTripCard: React.FC = () => {
  return (
    <div className="bg-green-50 rounded-2xl border border-green-200 p-6 shadow-sm mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <Award className="w-32 h-32 text-green-500 transform translate-x-4 -translate-y-4" />
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="font-bold text-green-900 text-lg">Most Efficient Trip</h3>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-green-200">
          BEST EFFICIENCY
        </span>
      </div>

      <p className="font-black text-slate-900 text-xl mb-6 relative z-10">Coimbatore → Avinashi</p>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Efficiency</p>
          <p className="text-xl font-black text-green-600">5.6 <span className="text-sm font-medium text-green-700">km/kWh</span></p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
          <p className="text-xl font-black text-slate-900">42.8 km</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Energy</p>
          <p className="text-xl font-black text-slate-900">7.6 kWh</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Battery Used</p>
          <p className="text-xl font-black text-slate-900 flex items-center gap-1"><Battery className="w-4 h-4 text-slate-400" /> 13%</p>
        </div>
      </div>
    </div>
  );
};

export default BestTripCard;
