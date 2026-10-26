import React from 'react';
import { Thermometer } from 'lucide-react';

const BatteryTemperature: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-slate-400" /> Battery Temperature
        </h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center mb-6">
        <div className="text-4xl font-black text-slate-900 mb-1">31°C</div>
        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100">
          Normal
        </div>
      </div>

      <div className="w-full relative h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
        {/* Color zones */}
        <div className="absolute top-0 left-0 h-full w-[20%] bg-blue-400 opacity-20"></div>
        <div className="absolute top-0 left-[20%] h-full w-[50%] bg-green-500 opacity-20"></div>
        <div className="absolute top-0 left-[70%] h-full w-[20%] bg-amber-500 opacity-20"></div>
        <div className="absolute top-0 left-[90%] h-full w-[10%] bg-red-500 opacity-20"></div>
        
        {/* Indicator marker - 31C maps to ~45% conceptually on a scale from 10C to 50C */}
        <div className="absolute top-0 left-[45%] w-1.5 h-full bg-slate-900 shadow-sm z-10"></div>
      </div>

      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">
        <span>Cold</span>
        <span>Normal</span>
        <span>Warm</span>
        <span>High</span>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 mt-auto">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Minimum Today</p>
          <p className="font-bold text-slate-900">24°C</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Maximum Today</p>
          <p className="font-bold text-slate-900">36°C</p>
        </div>
      </div>
    </div>
  );
};

export default BatteryTemperature;
