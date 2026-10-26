import React from 'react';
import { ChargingSession } from '../../types/planner';
import { BatteryCharging, ExternalLink } from 'lucide-react';

interface LiveSessionsProps {
  sessions: ChargingSession[];
  onSelect: (session: ChargingSession) => void;
}

const LiveSessions: React.FC<LiveSessionsProps> = ({ sessions, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BatteryCharging className="w-5 h-5 text-blue-600" /> Live Charging Sessions
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Session ID</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Station / Charger</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Energy</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Duration</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(session => {
              const progress = ((session.currentBattery - 20) / (session.targetBattery - 20)) * 100; // Mock calculation
              
              return (
                <tr key={session.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="py-4">
                    <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">{session.id}</span>
                  </td>
                  <td className="py-4">
                    <p className="font-bold text-slate-900 text-sm leading-tight">{session.stationName}</p>
                    <p className="text-xs font-medium text-slate-500">{session.chargerId}</p>
                  </td>
                  <td className="py-4">
                    <p className="font-bold text-slate-900 text-sm">{session.vehicle}</p>
                  </td>
                  <td className="py-4 hidden md:table-cell">
                    <p className="font-bold text-slate-900 text-sm">{session.energyDeliveredKwh} kWh</p>
                  </td>
                  <td className="py-4 hidden lg:table-cell">
                    <p className="font-bold text-slate-900 text-sm">{session.durationMinutes} min</p>
                    <p className="text-xs text-slate-500">Started {session.startTime}</p>
                  </td>
                  <td className="py-4 min-w-[120px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700">{session.currentBattery}%</span>
                      <span className="text-[10px] font-bold text-slate-400">Target: {session.targetBattery}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full relative">
                        <div className="absolute top-0 bottom-0 right-0 w-full bg-white/20 animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => onSelect(session)}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:border-gridwise-blue hover:text-blue-600 rounded-lg text-sm font-bold text-slate-600 transition-colors flex items-center gap-1 ml-auto"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveSessions;
