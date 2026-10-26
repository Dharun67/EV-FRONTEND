import React from 'react';
import { StationCandidate } from '../../types/stationRecommendation';

interface Props {
  candidates: StationCandidate[];
  onLocationClick: (candidate: StationCandidate) => void;
}

const SimulatedLocationMap: React.FC<Props> = ({ candidates, onLocationClick }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900">Opportunity Map</h2>
        <div className="flex gap-4 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Top Match</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Candidate</div>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-100 rounded-xl relative overflow-hidden min-h-[300px]">
        {/* Simulated Map Background */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Simulated Roads */}
          <path d="M 0 50 Q 150 60 300 20 T 600 100" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="8" />
          <path d="M 200 0 L 250 400" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="6" />
        </svg>

        {/* Heatmap Blobs for Demand */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl"></div>

        {/* Candidate Pins */}
        {candidates.map((c, idx) => {
          const isTop = idx === 0;
          return (
            <div 
              key={c.id}
              onClick={() => onLocationClick(c)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              <div className={`relative ${isTop ? 'w-6 h-6 animate-pulse' : 'w-4 h-4'}`}>
                <div className={`absolute inset-0 rounded-full opacity-50 ${isTop ? 'bg-purple-500 animate-ping' : 'bg-blue-500'}`}></div>
                <div className={`absolute inset-0 rounded-full border-2 border-white shadow-md ${isTop ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                {c.name} ({c.opportunityScore})
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GIS Spatial Analysis</span>
      </div>
    </div>
  );
};

export default SimulatedLocationMap;
