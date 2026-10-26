import React, { useState } from 'react';
import { DemandZone } from '../../types/demand';
import { MapPin } from 'lucide-react';
import DemandZonePopup from './DemandZonePopup';
import DemandLegend from './DemandLegend';

interface DemandHeatmapProps {
  zones: DemandZone[];
}

const DemandHeatmap: React.FC<DemandHeatmapProps> = ({ zones }) => {
  const [selectedZone, setSelectedZone] = useState<DemandZone | null>(null);

  const getIntensityColor = (score: number) => {
    if (score >= 90) return 'fill-red-500 shadow-red-500/60 border-red-200';
    if (score >= 75) return 'fill-orange-500 shadow-orange-500/60 border-orange-200';
    if (score >= 60) return 'fill-yellow-500 shadow-yellow-500/60 border-yellow-200';
    if (score >= 40) return 'fill-blue-500 shadow-blue-500/60 border-blue-200';
    return 'fill-green-500 shadow-green-500/60 border-green-200';
  };

  const getIntensityRadius = (score: number) => {
    return Math.max(15, (score / 100) * 35);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 relative">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-slate-400" /> Charging Demand Heatmap
      </h3>
      
      <div className="relative w-full h-[500px] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 group">
        {/* Fake Map Background using SVG */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#e2e8f0" strokeWidth="0.1"/>
            </pattern>
            <radialGradient id="highDemand" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Main roads */}
          <path d="M 10 90 Q 50 50 90 10" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 20 10 L 80 90" fill="none" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 0 50 L 100 50" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 50 0 L 50 100" fill="none" stroke="#cbd5e1" strokeWidth="2" />

          {/* Zones */}
          {zones.map(zone => {
            const radius = getIntensityRadius(zone.demandScore);
            return (
              <g 
                key={zone.id} 
                className="cursor-pointer transition-transform hover:scale-105 origin-center"
                style={{ transformOrigin: `${zone.x}% ${zone.y}%` }}
                onClick={() => setSelectedZone(zone)}
              >
                {/* Heat aura */}
                <circle cx={zone.x} cy={zone.y} r={radius * 1.5} className={getIntensityColor(zone.demandScore).replace('fill-', 'fill-').replace('-500', '-500')} fillOpacity="0.1" />
                <circle cx={zone.x} cy={zone.y} r={radius * 0.8} className={getIntensityColor(zone.demandScore).replace('fill-', 'fill-').replace('-500', '-500')} fillOpacity="0.2" />
                {/* Core */}
                <circle cx={zone.x} cy={zone.y} r="2" className={getIntensityColor(zone.demandScore)} />
                <circle cx={zone.x} cy={zone.y} r="1" fill="white" />
              </g>
            );
          })}
        </svg>

        {/* HTML Overlay for Text Labels to avoid SVG scaling issues */}
        {zones.map(zone => (
          <div 
            key={`label-${zone.id}`}
            className="absolute hidden md:block"
            style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: 'translate(-50%, 15px)' }}
          >
            <span className="bg-white/80 backdrop-blur text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 pointer-events-none shadow-sm whitespace-nowrap">
              {zone.name}
            </span>
          </div>
        ))}

        {selectedZone && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px] z-20">
            <DemandZonePopup 
              zone={selectedZone} 
              onClose={() => setSelectedZone(null)} 
            />
          </div>
        )}

      </div>
      
      <div className="mt-4">
        <DemandLegend />
      </div>
    </div>
  );
};

export default DemandHeatmap;
