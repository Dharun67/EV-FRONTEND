import React from 'react';
import { Car, RefreshCw } from 'lucide-react';

const VehicleInformation: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Car className="w-5 h-5 text-slate-400" /> Vehicle Information
      </h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Vehicle</span>
          <span className="text-sm font-bold text-slate-900">Tesla Model 3</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Battery Capacity</span>
          <span className="text-sm font-bold text-slate-900">75 kWh</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Current Battery</span>
          <span className="text-sm font-bold text-slate-900">72%</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Estimated Range</span>
          <span className="text-sm font-bold text-slate-900">286 km</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Efficiency</span>
          <span className="text-sm font-bold text-slate-900">5.0 km/kWh</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Current Mode</span>
          <span className="text-sm font-bold text-slate-900">Normal</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">Last Sync</span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
            Just now <RefreshCw className="w-3 h-3 text-slate-400" />
          </span>
        </div>
      </div>
      
      <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">
        Change Vehicle
      </button>
    </div>
  );
};

export default VehicleInformation;
