import React from 'react';
import { ChargingSession } from '../../types/battery';
import { BatteryCharging, Clock, Zap } from 'lucide-react';

interface ChargingHistoryProps {
  sessions: ChargingSession[];
}

const ChargingHistory: React.FC<ChargingHistoryProps> = ({ sessions }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">Recent Charging Sessions</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date & Station</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Charge Level</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Energy</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cost</th>
              <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sessions.map(session => (
              <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-900 mb-0.5">{session.stationName}</p>
                  <p className="text-xs font-medium text-slate-500">{session.date}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">{session.startPercentage}%</span>
                    <BatteryCharging className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-green-600">{session.endPercentage}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-slate-400" /> {session.energyKwh} kWh
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-bold text-slate-900">₹{session.cost}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {session.durationMinutes} min
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChargingHistory;
