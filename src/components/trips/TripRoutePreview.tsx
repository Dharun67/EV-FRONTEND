import React from 'react';
import { Trip } from '../../types/trip';
import { X, Navigation, Route, MapPin, Map, Navigation2 } from 'lucide-react';

interface TripRoutePreviewProps {
  trip: Trip;
}

const TripRoutePreview: React.FC<TripRoutePreviewProps> = ({ trip }) => {
  return (
    <div className="bg-[#1a1f2e] rounded-2xl overflow-hidden h-48 mb-6 relative w-full flex items-center justify-center p-4">
      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', 
        backgroundSize: '20px 20px',
        opacity: 0.3 
      }}></div>

      <div className="relative z-10 w-full max-w-md flex items-center justify-between">
        {/* Origin */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mb-2 shadow-lg z-20 border-2 border-[#1a1f2e]">
            <MapPin className="w-4 h-4 text-slate-700" />
          </div>
          <span className="text-slate-900 font-bold text-sm bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
            {trip.origin}
          </span>
        </div>

        {/* Route Line */}
        <div className="flex-1 relative h-0 border-t-2 border-dashed border-gridwise-blue mx-4">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a1f2e] px-2 text-xs font-bold text-blue-600 whitespace-nowrap">
             {trip.distanceKm} km
           </div>
           {/* Moving Car Mock */}
           <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/20 animate-[ping_3s_ease-in-out_infinite]">
             <Navigation2 className="w-3 h-3 text-blue-600 transform rotate-90" />
           </div>
        </div>

        {/* Destination */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg z-20 border-2 border-white">
            <Map className="w-4 h-4 text-slate-900" />
          </div>
          <span className="text-slate-900 font-bold text-sm bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
            {trip.destination}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TripRoutePreview;
