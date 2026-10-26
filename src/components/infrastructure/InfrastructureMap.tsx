import React, { useState } from 'react';
import { Map } from 'lucide-react';
import { InfrastructureZone } from '../../types/infrastructure';
import InfrastructureLegend from './InfrastructureLegend';
import ZoneDetailsPopup from './ZoneDetailsPopup';

interface InfrastructureMapProps {
  zones: InfrastructureZone[];
}

const InfrastructureMap: React.FC<InfrastructureMapProps> = ({ zones }) => {
  const [selectedZone, setSelectedZone] = useState<InfrastructureZone | null>(null);

  const getMarkerColor = (zone: InfrastructureZone) => {
    if (zone.priority === 'Critical') return 'fill-red-500 stroke-red-200';
    if (zone.priority === 'High') return 'fill-orange-500 stroke-orange-200';
    if (zone.priority === 'Medium') return 'fill-blue-500 stroke-blue-200';
    return 'fill-green-500 stroke-green-200';
  };

  const getMarkerSize = (zone: InfrastructureZone) => {
    return Math.max(8, (zone.requiredChargers / 10)); // Scale base on required chargers
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 relative h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Map className="w-5 h-5 text-slate-400" /> Charging Infrastructure Coverage Map
      </h3>
      
      <div className="relative w-full h-[500px] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 group flex-1">
        {/* Fake Map Background using SVG */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid2" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#e2e8f0" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f8fafc" />
          <rect width="100%" height="100%" fill="url(#grid2)" />
          
          {/* Main highways */}
          <path d="M 0 50 Q 50 40 100 50" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
          <path d="M 50 0 L 45 100" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 20 0 L 80 100" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2, 1" />

          {/* Zones */}
          {zones.map(zone => {
            const size = getMarkerSize(zone);
            const colorClass = getMarkerColor(zone);
            
            // Extract colors for SVG
            const fill = colorClass.includes('red') ? '#ef4444' : 
                         colorClass.includes('orange') ? '#f97316' : 
                         colorClass.includes('blue') ? '#3b82f6' : '#22c55e';
            const stroke = colorClass.includes('red') ? '#fecaca' : 
                           colorClass.includes('orange') ? '#fed7aa' : 
                           colorClass.includes('blue') ? '#bfdbfe' : '#bbf7d0';

            return (
              <g 
                key={zone.id} 
                className="cursor-pointer transition-transform hover:scale-[1.15] origin-center"
                style={{ transformOrigin: `${zone.x}% ${zone.y}%` }}
                onClick={() => setSelectedZone(zone)}
              >
                {/* Ping animation for critical zones */}
                {zone.priority === 'Critical' && (
                  <circle cx={zone.x} cy={zone.y} r={size * 1.5} fill={fill} fillOpacity="0.3" className="animate-ping origin-center" style={{ transformOrigin: `${zone.x}px ${zone.y}px` }} />
                )}
                
                {/* Infrastructure marker */}
                <circle cx={zone.x} cy={zone.y} r={size} fill={fill} stroke={stroke} strokeWidth="1" />
                
                {/* Inner dot representing existing infrastructure vs gap */}
                <circle cx={zone.x} cy={zone.y} r={size * (zone.coverageScore / 100)} fill="white" fillOpacity="0.8" />
              </g>
            );
          })}
        </svg>

        {/* HTML Overlay for Text Labels */}
        {zones.map(zone => (
          <div 
            key={`label-${zone.id}`}
            className="absolute hidden md:block"
            style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: 'translate(-50%, 15px)' }}
          >
            <span className="bg-white/90 backdrop-blur text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 pointer-events-none shadow-sm whitespace-nowrap">
              {zone.name}
            </span>
          </div>
        ))}

        {selectedZone && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px] z-20">
            <ZoneDetailsPopup 
              zone={selectedZone} 
              onClose={() => setSelectedZone(null)} 
            />
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <InfrastructureLegend />
      </div>
    </div>
  );
};

export default InfrastructureMap;
