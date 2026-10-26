import React, { useState } from 'react';
import { Calculator, AlertTriangle, ShieldCheck } from 'lucide-react';

const BatteryRescueCalculator: React.FC = () => {
  const [battery, setBattery] = useState(18);
  const [range, setRange] = useState(286); // Full range
  const [distance, setDistance] = useState(5.4);

  const remainingRange = (battery / 100) * range;
  
  // Logic: if remaining range is at least double the distance to charger, it's safe. Otherwise recommend rescue.
  const isSafe = remainingRange > distance * 2;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-slate-400" /> Battery Rescue Calculator
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Battery (%)</label>
            <span className="font-bold text-slate-900">{battery}%</span>
          </div>
          <input 
            type="range" 
            min="1" max="100" 
            value={battery} 
            onChange={(e) => setBattery(Number(e.target.value))}
            className="w-full accent-gridwise-blue"
          />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Distance to Nearest Charger (km)</label>
            <span className="font-bold text-slate-900">{distance} km</span>
          </div>
          <input 
            type="range" 
            min="0.5" max="50" step="0.1"
            value={distance} 
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-gridwise-blue"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Remaining Range</p>
          <p className="font-black text-slate-900">{remainingRange.toFixed(1)} km</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Safety Margin</p>
          <p className="font-black text-slate-900">{(remainingRange - distance).toFixed(1)} km</p>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        isSafe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      }`}>
        {isSafe ? (
          <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <h4 className={`font-bold ${isSafe ? 'text-green-900' : 'text-red-900'} mb-1`}>
            {isSafe ? 'Charging station is reachable' : 'Emergency rescue recommended'}
          </h4>
          <p className={`text-sm font-medium ${isSafe ? 'text-green-700' : 'text-red-700'}`}>
            {isSafe 
              ? 'You have sufficient range to reach the charger safely.' 
              : 'Your remaining range is critically low compared to the distance. Do not risk being stranded.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatteryRescueCalculator;
