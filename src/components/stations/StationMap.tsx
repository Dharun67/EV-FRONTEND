import React from 'react';
import type { Station } from '../../types';
import { MapPin, Zap } from 'lucide-react';

interface StationMapProps {
  stations: Station[];
  selectedStationId: string | null;
  onSelectStation: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const StationMap: React.FC<StationMapProps> = ({ stations, selectedStationId, onSelectStation, onViewDetails }) => {
  // Mock positions for the 8 stations (in percentages)
  const mockPositions: Record<string, { top: string; left: string }> = {
    's1': { top: '30%', left: '45%' },
    's2': { top: '20%', left: '30%' },
    's3': { top: '50%', left: '60%' },
    's4': { top: '40%', left: '20%' },
    's5': { top: '65%', left: '75%' },
    's6': { top: '75%', left: '40%' },
    's7': { top: '15%', left: '80%' },
    's8': { top: '85%', left: '65%' },
  };

  const selectedStation = stations.find(s => s.id === selectedStationId);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] bg-[#E8F0F2] rounded-2xl overflow-hidden border border-slate-200 shadow-inner flex flex-col">
      {/* Mock Map Background Graphics */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      />
      {/* Fake roads */}
      <div className="absolute top-1/3 left-0 w-full h-2 bg-white/60 transform -rotate-2 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 w-3 h-full bg-white/60 transform rotate-12 pointer-events-none"></div>
      <div className="absolute top-2/3 left-0 w-full h-1 bg-white/50 transform rotate-3 pointer-events-none"></div>

      {/* Your Location Marker */}
      <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
        <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mb-1 shadow-md whitespace-nowrap">
          Your Location
        </div>
        <div className="relative">
          <div className="h-6 w-6 bg-blue-600/20 rounded-full animate-ping absolute -inset-1"></div>
          <div className="h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md relative"></div>
        </div>
      </div>

      {/* Station Markers */}
      {stations.map(station => {
        const pos = mockPositions[station.id] || { top: '50%', left: '50%' };
        const isSelected = selectedStationId === station.id;
        
        let markerColor = 'bg-green-500';
        let ringColor = 'ring-green-500/30';
        if (station.status === 'Busy') {
          markerColor = 'bg-amber-500';
          ringColor = 'ring-amber-500/30';
        } else if (station.status === 'Unavailable') {
          markerColor = 'bg-red-500';
          ringColor = 'ring-red-500/30';
        }

        return (
          <button
            key={station.id}
            onClick={() => onSelectStation(station.id)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
            style={{ top: pos.top, left: pos.left }}
            title={station.name}
          >
            <div className={`relative flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-125 z-30' : 'hover:scale-110'}`}>
              <div className={`absolute -inset-2 rounded-full ring-4 ${isSelected ? ringColor : 'ring-transparent group-hover:' + ringColor} transition-all`}></div>
              <div className={`h-8 w-8 ${markerColor} text-slate-900 rounded-full flex items-center justify-center shadow-lg ${isSelected ? 'shadow-xl' : ''}`}>
                <Zap className="h-4 w-4" fill="currentColor" />
              </div>
            </div>
          </button>
        );
      })}

      {/* Selected Station Panel */}
      {selectedStation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-200 z-40 transform transition-all translate-y-0 opacity-100">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-slate-900">{selectedStation.name}</h4>
              <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {selectedStation.distance} km away
              </p>
            </div>
            <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex flex-col items-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available</p>
              <p className="text-sm font-black text-slate-900">{selectedStation.availableConnectors}/{selectedStation.connectors}</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100 items-center">
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-semibold uppercase mb-0.5">Speed</p>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                <Zap className="h-3 w-3 text-blue-600" />
                {selectedStation.power ? `${selectedStation.power} kW` : selectedStation.chargingType}
              </p>
            </div>
            <div className="flex-1 border-l border-slate-100 pl-4">
              <p className="text-[10px] text-slate-400 font-semibold uppercase mb-0.5">Price</p>
              <p className="text-sm font-bold text-slate-900">₹{selectedStation.pricePerKwh}<span className="text-[10px] text-slate-500">/kWh</span></p>
            </div>
            <div className="flex gap-2 ml-auto">
               <button 
                 onClick={() => onViewDetails(selectedStation.id)}
                 className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
               >
                 View Station Details
               </button>
            </div>
          </div>
        </div>
      )}

      {/* OpenStreetMap Attribution */}
      <div className="absolute bottom-1 right-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-slate-500 z-40 shadow-sm pointer-events-auto">
        Geocoding data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">OpenStreetMap</a> contributors
      </div>
    </div>
  );
};

export default StationMap;
