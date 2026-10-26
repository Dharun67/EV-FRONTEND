import React from 'react';
import { Calendar } from 'lucide-react';

interface MonthlyTravelProps {
  data: any;
  chartData: any[];
}

const MonthlyTravel: React.FC<MonthlyTravelProps> = ({ data, chartData }) => {
  const maxDistance = Math.max(...chartData.map(d => d.distance));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-slate-400" /> Monthly Travel ({data.month})
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Trips</p>
          <p className="font-black text-slate-900">{data.trips}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
          <p className="font-black text-slate-900">{data.distance.toLocaleString()} km</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Energy</p>
          <p className="font-black text-slate-900">{data.energy} kWh</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Charging Cost</p>
          <p className="font-black text-slate-900">₹{data.chargingCost.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Average Efficiency</p>
          <p className="font-black text-slate-900">{data.avgEfficiency} km/kWh</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">CO₂ Saved</p>
          <p className="font-black text-green-600">{data.co2Saved} kg</p>
        </div>
      </div>

      <h4 className="font-bold text-slate-900 mb-4 text-sm">Monthly Distance</h4>
      <div className="h-40 flex items-end justify-between gap-1">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group">
            <div className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.distance}
            </div>
            <div 
              className="w-full max-w-[40px] bg-blue-600 rounded-t-sm opacity-60 group-hover:opacity-100 transition-all"
              style={{ height: `${(item.distance / maxDistance) * 100}%` }}
            ></div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center">
              {item.month.substring(0, 3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyTravel;
