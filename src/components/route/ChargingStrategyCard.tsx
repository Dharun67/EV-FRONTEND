import React from 'react';
import { RouteOption, Vehicle } from '../../types/route';
import { BatteryCharging, ShieldCheck, Zap, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChargingStrategyCardProps {
  route: RouteOption;
  vehicle: Vehicle;
  strategy?: any;
}

const ChargingStrategyCard: React.FC<ChargingStrategyCardProps> = ({ route, vehicle, strategy }) => {
  const navigate = useNavigate();
  const rangeRemainingKm = vehicle.estimatedRangeKm * (vehicle.currentPercentage / 100);
  const fallbackRequiresCharge = route.distanceKm > (rangeRemainingKm * 0.8); // 20% safety buffer
  const fallbackStopsRequired = Math.ceil(route.distanceKm / (vehicle.estimatedRangeKm * 0.8)) - 1;

  const requiresCharge = strategy ? strategy.requiresCharge : fallbackRequiresCharge;
  const stopsRequired = strategy ? strategy.stopsRequired : fallbackStopsRequired;

  if (requiresCharge) {
    const station = strategy?.recommendedStation;

    return (
      <div className="bg-white rounded-2xl border border-gridwise-blue/30 p-5 shadow-[0_0_15px_rgba(37,99,235,0.1)] mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-xl border border-blue-100">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">AI Charging Strategy</h3>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Optimized for shortest travel time</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">{stopsRequired} Stops Added</span>
        </div>

        <div className="space-y-3 relative z-10">
          {station ? (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs text-slate-500 font-bold mb-1">RECOMMENDED STOP</p>
                  <p className="font-bold text-slate-900">{station.name}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{station.powerKw} kW Fast Charging</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{station.chargeTimeMinutes} mins charge</p>
                  <p className="text-xs text-red-500 font-bold mt-1">Wait: {station.waitTimeMinutes} mins ({station.queueLength} in queue)</p>
                </div>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 mb-3">
                <p className="text-xs text-blue-800 font-medium">✨ {station.aiReasoning}</p>
              </div>
              <button 
                onClick={() => navigate('/booking')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-900 rounded-lg font-bold transition-all shadow-sm"
              >
                <CalendarCheck className="h-4 w-4" /> Book Slot Now
              </button>
            </div>
          ) : (
            Array.from({ length: Math.max(1, stopsRequired) }).map((_, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 font-bold mb-1">STOP {i + 1}</p>
                  <p className="font-bold text-slate-900">ChargePoint Ultra-Fast Station</p>
                  <p className="text-sm text-slate-600 mt-0.5">Charge from 15% to 80%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">25 mins</p>
                  <p className="text-xs text-slate-500 font-medium">+120km range</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm relative z-10">
          <span className="text-slate-500 font-medium">Estimated arrival battery:</span>
          <span className="font-bold text-green-600">20% (Safe)</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-50 p-2 rounded-xl border border-green-100">
          <BatteryCharging className="h-5 w-5 text-green-600" />
        </div>
        <h3 className="font-bold text-slate-900">Recommended Charging Strategy</h3>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
        <p className="font-bold text-slate-900 mb-1">No charging stop required</p>
        <p className="text-sm text-slate-500">
          Your current {vehicle.currentPercentage || 80}% battery provides enough range for this journey.
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2.5 rounded-xl border border-green-100 font-semibold text-sm">
        <ShieldCheck className="h-4 w-4" /> Route is Battery Safe
      </div>
    </div>
  );
};

export default ChargingStrategyCard;
