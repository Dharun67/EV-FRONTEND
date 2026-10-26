import React from 'react';
import { Car, BatteryCharging, Zap } from 'lucide-react';
import { Vehicle } from '../../types/route';

interface VehicleSelectorProps {
  vehicle: Vehicle;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ vehicle }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
            <Car className="h-6 w-6 text-slate-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{vehicle.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Selected Vehicle</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors">
          Change
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <BatteryCharging className="h-3 w-3 text-green-500" /> Battery
          </p>
          <p className="text-sm font-bold text-slate-900">{vehicle.batteryPercentage}%</p>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Zap className="h-3 w-3 text-blue-600" /> Range
          </p>
          <p className="text-sm font-bold text-slate-900">{vehicle.rangeKm} km</p>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Efficiency</p>
          <p className="text-sm font-bold text-slate-900">{vehicle.efficiency} km/kWh</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelector;
