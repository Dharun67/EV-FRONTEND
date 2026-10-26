import React from 'react';
import { Map, Clock, Battery } from 'lucide-react';

const LongestTripCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 text-lg mb-4">Longest Journey</h3>
      <p className="font-black text-slate-900 text-xl mb-6 border-b border-slate-100 pb-4">Coimbatore → Ooty</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
          <p className="text-xl font-black text-blue-600">112 km</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Duration</p>
          <p className="text-xl font-black text-slate-900">2h 42m</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Energy</p>
          <p className="text-xl font-black text-slate-900">24.8 kWh</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Battery Used</p>
          <p className="text-xl font-black text-slate-900 flex items-center gap-1"><Battery className="w-4 h-4 text-slate-400" /> 31%</p>
        </div>
      </div>

      <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">
        View Details
      </button>
    </div>
  );
};

export default LongestTripCard;
