import React from 'react';
import { AlertOctagon, MapPin } from 'lucide-react';

const ChargingDesertAnalysis: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col relative overflow-hidden">
      
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
        <AlertOctagon className="w-5 h-5 text-red-500" /> Charging Desert Analysis
      </h3>

      <div className="flex-1 space-y-4 relative z-10">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-2">Longest distance without a suitable charger</p>
          <div className="flex items-end gap-2 mb-1">
            <span className="font-black text-4xl text-red-700 leading-none">28</span>
            <span className="font-bold text-red-600 pb-1">km</span>
          </div>
          <p className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-2">
            <MapPin className="w-3 h-3 text-slate-400" /> Mettupalayam Road
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target</p>
            <p className="font-black text-slate-900">&lt; 15 km</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gap</p>
            <p className="font-black text-red-600">13 km</p>
          </div>
        </div>

        {/* Visual Route */}
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="flex-1 border-t-2 border-dashed border-red-300 mx-2 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-red-200">
                 EMPTY CORRIDOR
               </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-500">
            <span>Station A</span>
            <span className="text-red-600">28 km</span>
            <span>Station B</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-6 right-6">
        <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-sm">
          HIGH PRIORITY
        </span>
      </div>
    </div>
  );
};

export default ChargingDesertAnalysis;
