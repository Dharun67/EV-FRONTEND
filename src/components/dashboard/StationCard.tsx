import React from 'react';
import type { Station } from '../../types';
import { MapPin, Zap, CircleAlert, CheckCircle2, Star, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StationCardProps {
  station: Station;
  variant?: 'dashboard' | 'full';
  isSelected?: boolean;
  onClick?: () => void;
  onViewDetails?: () => void;
}

const StationCard: React.FC<StationCardProps> = ({ 
  station, 
  variant = 'dashboard', 
  isSelected = false,
  onClick,
  onViewDetails 
}) => {
  const navigate = useNavigate();
  const isAvailable = station.status === 'Available';
  
  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/route-planner?station=${encodeURIComponent(station.id)}`);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) onViewDetails();
  };
  
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 shadow-sm border transition-all duration-200 flex flex-col cursor-pointer ${
        isSelected 
          ? 'border-gridwise-blue shadow-md ring-1 ring-gridwise-blue/20' 
          : 'border-slate-100 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-start">
          {variant === 'full' && (
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-0.5">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">{station.name}</h3>
            {variant === 'full' && station.location ? (
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                {station.location}
              </p>
            ) : null}
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <MapPin className="h-3 w-3" /> {station.distance} km away
              {variant === 'full' && station.rating && (
                <>
                  <span className="mx-1">•</span>
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {station.rating}
                </>
              )}
            </p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
          station.status === 'Available' ? 'bg-green-50 text-green-700 border border-green-100' : 
          station.status === 'Busy' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
          'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {station.status}
        </div>
      </div>

      <div className="flex gap-3 mb-4 mt-2">
        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Availability</p>
          <div className="flex items-center gap-1.5">
            {isAvailable ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <CircleAlert className="h-4 w-4 text-amber-500" />
            )}
            <p className="text-sm font-bold text-slate-900">
              {station.availableConnectors} <span className="text-slate-500 font-medium text-xs">/ {station.connectors}</span>
            </p>
          </div>
        </div>
        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Charging</p>
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-blue-600" />
            <p className="text-sm font-bold text-slate-900 truncate" title={station.chargingType}>
              {variant === 'full' && station.power ? `${station.power} kW` : station.chargingType.split(' ')[0]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Price</p>
          <p className="text-sm font-bold text-slate-900">₹{station.pricePerKwh}<span className="text-xs text-slate-500 font-medium">/kWh</span></p>
        </div>
        
        {variant === 'full' && station.estimatedChargingTime && (
          <div>
             <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Est. Time</p>
             <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
               <Clock className="h-3 w-3 text-slate-400" /> {station.estimatedChargingTime} min
             </p>
          </div>
        )}

        {variant === 'dashboard' ? (
          <button className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-sm">
            View Station
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleViewDetails}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors duration-200"
            >
              Details
            </button>
            <button 
              onClick={handleNavigate}
              className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-sm flex items-center gap-1.5"
            >
              <Navigation className="h-4 w-4" /> Navigate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationCard;

