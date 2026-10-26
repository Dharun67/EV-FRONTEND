import React from 'react';
import { AlertCircle } from 'lucide-react';
import { StationCongestion as StationCongestionType } from '../../types/demand';

interface StationCongestionProps {
  stations: StationCongestionType[];
}

const StationCongestion: React.FC<StationCongestionProps> = ({ stations }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-orange-500" /> Station Congestion
      </h3>

      <div className="flex-1 space-y-3">
        {stations.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center w-full h-full justify-center">
            <h4 className="font-bold text-slate-900 mb-1">Queue Intelligence Unavailable</h4>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] text-center">
              Requires historical arrival data which is currently insufficient.
            </p>
          </div>
        ) : (
          stations.map(station => (
          <div key={station.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-900 text-sm mb-1">{station.name}</p>
              <div className="flex gap-3 text-xs font-bold text-slate-500">
                <span>{station.utilization}% Utilized</span>
                <span className={station.queue > 4 ? 'text-orange-500' : ''}>{station.queue} waiting</span>
              </div>
            </div>
            
            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
              station.status === 'Critical' ? 'bg-red-100 text-red-700' :
              station.status === 'High' ? 'bg-orange-100 text-orange-700' :
              station.status === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {station.status}
            </span>
          </div>
        )))}
      </div>
    </div>
  );
};

export default StationCongestion;
