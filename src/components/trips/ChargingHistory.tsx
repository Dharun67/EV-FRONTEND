import React from 'react';
import { BatteryCharging, IndianRupee } from 'lucide-react';
import { ChargingSession } from '../../types/trip';

interface ChargingHistoryProps {
  sessions: ChargingSession[];
}

const ChargingHistory: React.FC<ChargingHistoryProps> = ({ sessions }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BatteryCharging className="w-5 h-5 text-slate-400" /> Charging Sessions
      </h3>

      <div className="space-y-4">
        {sessions.slice(0, 6).map(session => (
          <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="mb-2 sm:mb-0">
              <h4 className="font-bold text-slate-900 mb-1">{session.stationName}</h4>
              <p className="text-xs font-medium text-slate-500">{session.date} • {session.durationMinutes} min</p>
            </div>
            
            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Battery</p>
                <p className="text-sm font-bold text-slate-700">{session.startBattery}% → {session.endBattery}%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Energy</p>
                <p className="text-sm font-black text-blue-600">{session.energyKwh} kWh</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Cost</p>
                <p className="text-sm font-black text-slate-900 flex items-center justify-end"><IndianRupee className="w-3 h-3" />{session.cost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargingHistory;
