import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

const TopStations: React.FC = () => {
  const topStations = [
    { name: 'GridWise Central Hub', util: 92, rev: 14820, energy: 824, sessions: 72 },
    { name: 'Avinashi EV Hub', util: 88, rev: 12460, energy: 692, sessions: 58 },
    { name: 'Gandhipuram ChargePoint', util: 84, rev: 10820, energy: 614, sessions: 52 },
    { name: 'Peelamedu FastCharge', util: 81, rev: 9640, energy: 552, sessions: 48 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" /> Top Performing Stations
      </h3>
      
      <div className="space-y-4">
        {topStations.map((st, idx) => (
          <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
                {st.name}
              </h4>
              <span className="text-xs font-black bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                {st.util} <TrendingUp className="w-3 h-3" />
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Revenue</p>
                <p className="text-sm font-bold text-slate-900">₹{st.rev.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Energy</p>
                <p className="text-sm font-bold text-slate-900">{st.energy} kWh</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sessions</p>
                <p className="text-sm font-bold text-slate-900">{st.sessions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStations;
