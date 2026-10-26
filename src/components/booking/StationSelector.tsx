import React from 'react';
import { BookingStation } from '../../types/booking';
import { Sparkles, MapPin, Zap, Star } from 'lucide-react';

interface StationSelectorProps {
  stations: BookingStation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const StationSelector: React.FC<StationSelectorProps> = ({ stations, selectedId, onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Choose a Charging Station</h2>
      <div className="space-y-4">
        {stations.map(station => {
          const isSelected = selectedId === station.id;
          const isRecommended = station.isRecommended;

          return (
            <div 
              key={station.id}
              onClick={() => onSelect(station.id)}
              className={`relative bg-white rounded-2xl p-5 cursor-pointer transition-all border-2
                ${isSelected ? 'border-gridwise-blue shadow-md transform -translate-y-0.5' : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'}`}
            >
              {isRecommended && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
                  <Sparkles className="w-3 h-3" /> AI RECOMMENDED
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 text-lg leading-tight pr-4">{station.name}</h3>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                  ${isSelected ? 'bg-blue-600 border-gridwise-blue' : 'border-slate-300'}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              
              <p className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {station.distance} km away • {station.location}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Availability</p>
                  <p className="text-sm font-black text-slate-900">{station.availableConnectors} / {station.totalConnectors}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Power</p>
                  <p className="text-sm font-black text-slate-900 flex items-center gap-1"><Zap className="w-3 h-3 text-blue-600"/> {station.power} kW</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</p>
                  <p className="text-sm font-black text-slate-900">₹{station.pricePerKwh}<span className="text-xs text-slate-500 font-medium">/kWh</span></p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Rating</p>
                  <p className="text-sm font-black text-slate-900 flex items-center gap-1">{station.rating} <Star className="w-3 h-3 text-amber-400 fill-amber-400"/></p>
                </div>
              </div>
              
              {isRecommended && isSelected && (
                <div className="mt-4 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-2 rounded-lg border border-blue-100 inline-block">
                  Recommended for your trip
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StationSelector;
