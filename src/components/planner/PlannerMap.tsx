import React, { useState } from 'react';
import { PlannerStation } from '../../types/planner';
import { MapPin } from 'lucide-react';
import StationPopup from './StationPopup';

interface PlannerMapProps {
  stations: PlannerStation[];
}

const PlannerMap: React.FC<PlannerMapProps> = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState<PlannerStation | null>(null);

  const getMarkerColor = (status: string, utilization: number) => {
    if (status === 'Offline') return 'bg-red-500 shadow-red-500/50 text-slate-900';
    if (status === 'Maintenance') return 'bg-blue-500 shadow-blue-500/50 text-slate-900';
    if (status === 'Degraded') return 'bg-orange-500 shadow-orange-500/50 text-slate-900';
    if (utilization > 85) return 'bg-orange-400 shadow-orange-400/50 text-slate-900'; // High Demand
    return 'bg-green-500 shadow-green-500/50 text-slate-900';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 relative">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-slate-400" /> Charging Network Map
      </h3>
      
      <div className="relative w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
        {/* Fake Map Background using SVG pattern */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Fake roads */}
          <path d="M 0 200 Q 200 200 400 100 T 800 300" fill="none" stroke="#cbd5e1" strokeWidth="8" />
          <path d="M 300 0 L 300 400" fill="none" stroke="#cbd5e1" strokeWidth="6" />
        </svg>

        {/* Markers */}
        {stations.map(station => (
          <button
            key={station.id}
            onClick={() => setSelectedStation(station)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg border-2 border-white hover:scale-150 transition-transform z-10 ${getMarkerColor(station.status, station.utilization)}`}
            style={{ left: `${station.lng}%`, top: `${station.lat}%` }}
          >
             {/* Pulse for high utilization or degraded */}
             {(station.utilization > 85 || station.status === 'Degraded') && (
               <span className="absolute inset-0 rounded-full bg-inherit opacity-75 animate-ping -z-10"></span>
             )}
          </button>
        ))}

        {selectedStation && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px] z-20">
            <StationPopup 
              station={selectedStation} 
              onClose={() => setSelectedStation(null)} 
            />
          </div>
        )}

      </div>
      
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-green-500"></div> Operational</div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-orange-400"></div> High Demand</div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Degraded</div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Maintenance</div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-red-500"></div> Offline</div>
      </div>
    </div>
  );
};

export default PlannerMap;
