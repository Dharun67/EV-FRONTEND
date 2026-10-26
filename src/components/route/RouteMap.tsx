import React from 'react';
import { RouteOption } from '../../types/route';
import { MapPin, Zap, Car } from 'lucide-react';
// Mock import removed
const stationsData: any[] = [];

interface RouteMapProps {
  route: RouteOption;
  startLocation: string;
  destination: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ route, startLocation, destination }) => {
  // Convert path points to SVG path string
  const pathPoints = route?.pathPoints || [];
  const pathData = pathPoints.reduce((acc, point, index) => {
    const x = `${point.x}%`;
    const y = `${point.y}%`;
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${acc} L ${point.x} ${point.y}`;
  }, '');

  const startPoint = pathPoints[0] || { x: 50, y: 50 };
  const endPoint = pathPoints[pathPoints.length - 1] || { x: 50, y: 50 };

  // Pick a couple of mock stations near the route
  const mapStations = stationsData.slice(0, 4);

  return (
    <div className="relative w-full h-full min-h-[350px] md:min-h-[500px] bg-[#E8F0F2] rounded-2xl overflow-hidden border border-slate-200 shadow-inner flex flex-col">
      {/* Grid Pattern for map background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      />
      
      {/* Decorative Roads */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
         <path d="M 0 30 Q 25 20, 50 40 T 100 20" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="12" />
         <path d="M 20 0 Q 30 50, 20 100" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="8" />
         <path d="M 100 70 Q 50 80, 0 60" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="10" />
      </svg>

      {/* Small Road Labels */}
      <div className="absolute top-[25%] left-[60%] text-[9px] font-bold text-slate-400 uppercase tracking-wider transform rotate-12">NH83</div>
      <div className="absolute top-[65%] left-[20%] text-[9px] font-bold text-slate-400 uppercase tracking-wider transform -rotate-12">Avinashi Rd</div>

      {/* SVG Route Line */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Background glow for route */}
        <path 
          d={pathData} 
          fill="none" 
          stroke="rgba(59, 130, 246, 0.2)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          vectorEffect="non-scaling-stroke"
        />
        {/* Main route line */}
        <path 
          d={pathData} 
          fill="none" 
          stroke="#3b82f6" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          vectorEffect="non-scaling-stroke"
          strokeDasharray="10 5"
          className="animate-pulse"
        />
      </svg>

      {/* Charging Station Markers */}
      {mapStations.map((station, idx) => {
        const x = 35 + (idx * 15);
        const y = 30 + (idx * 12);
        
        let markerColor = 'bg-green-500';
        if (station.status === 'Busy') markerColor = 'bg-amber-500';
        if (station.status === 'Unavailable') markerColor = 'bg-red-500';

        return (
          <div key={station.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className={`h-6 w-6 ${markerColor} text-slate-900 rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
              <Zap className="h-3 w-3" fill="currentColor" />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white px-2 py-1 rounded shadow-md text-[10px] font-bold text-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {station.name} <span className="text-slate-400 font-medium">({station.distance}km)</span>
            </div>
          </div>
        );
      })}

      {/* Vehicle Marker */}
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${startPoint.x}%`, top: `${startPoint.y}%` }}>
         <div className="h-10 w-10 bg-slate-900 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
            <Car className="h-4 w-4 text-slate-900" />
         </div>
      </div>

      {/* Start Marker Text */}
      <div className="absolute transform -translate-x-1/2 -translate-y-[120%] bg-white px-2 py-1 rounded-lg shadow-md border border-slate-200 z-10" style={{ left: `${startPoint.x}%`, top: `${startPoint.y}%` }}>
        <p className="text-[10px] font-bold text-slate-700 whitespace-nowrap">{startLocation}</p>
      </div>

      {/* Destination Marker */}
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${endPoint.x}%`, top: `${endPoint.y}%` }}>
         <div className="h-8 w-8 bg-red-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
            <MapPin className="h-4 w-4 text-slate-900" />
         </div>
      </div>
      
      {/* Destination Marker Text */}
      <div className="absolute transform -translate-x-1/2 -translate-y-[130%] bg-white px-2 py-1 rounded-lg shadow-md border border-slate-200 z-10" style={{ left: `${endPoint.x}%`, top: `${endPoint.y}%` }}>
        <p className="text-[10px] font-bold text-slate-700 whitespace-nowrap">{destination}</p>
      </div>

      {/* OpenStreetMap Attribution */}
      <div className="absolute bottom-1 right-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-slate-500 z-40 shadow-sm pointer-events-auto">
        Geocoding data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">OpenStreetMap</a> contributors
      </div>
    </div>
  );
};

export default RouteMap;
