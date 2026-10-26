import React from 'react';
import { Sun, Sunset, Moon, Sunrise } from 'lucide-react';

const PeakDemand: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Sun className="w-5 h-5 text-slate-400" /> Peak Demand Windows
      </h3>

      <div className="flex-1 space-y-3">
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Sunrise className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm mb-0.5">Morning</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">8:00 AM – 10:00 AM</p>
            </div>
          </div>
          <span className="font-black text-slate-700 text-lg">62%</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm mb-0.5">Afternoon</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">12:00 PM – 2:00 PM</p>
            </div>
          </div>
          <span className="font-black text-slate-700 text-lg">72%</span>
        </div>

        <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Sunset className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-red-900 text-sm mb-0.5">Evening (Peak)</p>
              <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider">6:00 PM – 8:00 PM</p>
            </div>
          </div>
          <span className="font-black text-red-700 text-xl">94%</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm mb-0.5">Night</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">10:00 PM – 12:00 AM</p>
            </div>
          </div>
          <span className="font-black text-slate-700 text-lg">63%</span>
        </div>
      </div>
    </div>
  );
};

export default PeakDemand;
