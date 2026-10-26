import React from 'react';
import { CommunityCharger } from '../../types/community';
import { MapPin, Navigation, Home, Building, Briefcase, Coffee, Users, Map as MapIcon } from 'lucide-react';

interface CommunityChargerMapProps {
  chargers: CommunityCharger[];
  selectedId: string | null;
  onSelectMarker: (id: string) => void;
}

const CommunityChargerMap: React.FC<CommunityChargerMapProps> = ({ chargers, selectedId, onSelectMarker }) => {
  // Deterministic mock positions for the map
  const getPosition = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      top: `${20 + (hash % 60)}%`,
      left: `${15 + ((hash * 7) % 70)}%`
    };
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Home': return <Home className="w-3 h-3" />;
      case 'Apartment': return <Building className="w-3 h-3" />;
      case 'Workplace': return <Briefcase className="w-3 h-3" />;
      case 'Business': 
      case 'Hotel': return <Coffee className="w-3 h-3" />;
      case 'Community': return <Users className="w-3 h-3" />;
      default: return <MapPin className="w-3 h-3" />;
    }
  };

  const selectedCharger = chargers.find(c => c.id === selectedId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[600px] sticky top-6 overflow-hidden flex flex-col">
      {/* Map visual background */}
      <div className="flex-1 relative bg-[#e5e7eb] w-full h-full">
        {/* Mock Roads */}
        <div className="absolute top-[30%] left-0 w-full h-3 bg-white transform -rotate-12"></div>
        <div className="absolute top-[60%] left-0 w-full h-4 bg-white transform rotate-3"></div>
        <div className="absolute top-0 left-[40%] w-4 h-full bg-white transform -rotate-6"></div>
        <div className="absolute top-0 left-[70%] w-3 h-full bg-white transform rotate-12"></div>
        
        {/* Mock Parks/Water */}
        <div className="absolute top-[10%] left-[60%] w-32 h-32 bg-green-200/50 rounded-full blur-xl"></div>
        <div className="absolute bottom-[20%] left-[20%] w-40 h-40 bg-blue-200/50 rounded-full blur-xl"></div>

        {/* Current Location Marker */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group">
          <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
            <Navigation className="w-4 h-4 text-slate-900 transform rotate-45" />
          </div>
          <div className="absolute top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Current Location
          </div>
        </div>

        {/* Charger Markers */}
        {chargers.map(charger => {
          const pos = getPosition(charger.id);
          const isSelected = selectedId === charger.id;
          const isAvailable = charger.status === 'Available';
          
          return (
            <div 
              key={charger.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => onSelectMarker(charger.id)}
            >
              <div className={`w-8 h-8 rounded-full border-2 shadow-md flex items-center justify-center ${
                isSelected ? 'bg-blue-600 border-white text-slate-900' : 
                isAvailable ? 'bg-green-500 border-white text-slate-900' : 
                charger.status === 'Busy' ? 'bg-amber-500 border-white text-slate-900' :
                'bg-slate-400 border-white text-slate-900'
              }`}>
                {getIcon(charger.type)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Charger Mini Panel */}
      {selectedCharger && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl border border-slate-200 p-4 shadow-lg animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-slate-900 leading-tight">{selectedCharger.name}</h4>
              <p className="text-xs font-medium text-slate-500">{selectedCharger.distanceKm} km away</p>
            </div>
            <span className="text-xs font-bold text-slate-900">₹{selectedCharger.pricePerKwh}/kWh</span>
          </div>
          
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
              selectedCharger.status === 'Available' ? 'bg-green-50 text-green-700 border-green-100' :
              selectedCharger.status === 'Busy' ? 'bg-amber-50 text-amber-700 border-amber-100' :
              'bg-red-50 text-red-700 border-red-100'
            }`}>
              {selectedCharger.status}
            </span>
            <span className="text-xs font-bold text-slate-700">{selectedCharger.powerKw} kW</span>
            <span className="text-xs font-bold text-slate-700 ml-auto flex items-center gap-1">
              <MapIcon className="w-3 h-3 text-slate-400" /> View Details
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChargerMap;
