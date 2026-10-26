import React from 'react';
import { Trip } from '../../types/trip';
import { ArrowRight, Clock, MapPin, Zap } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onViewDetails: () => void;
  onRepeatTrip: () => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onViewDetails, onRepeatTrip }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      {trip.status === 'Cancelled' && (
        <div className="absolute top-4 right-[-30px] bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider py-1 px-10 transform rotate-45 border border-red-200">
          Cancelled
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4 pr-6">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{trip.date}</p>
          <div className="flex items-center gap-2 text-lg font-black text-slate-900">
            <span>{trip.origin}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span>{trip.destination}</span>
          </div>
        </div>
        {trip.status === 'Completed' && (
          <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider hidden sm:block">
            Completed
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Distance</p>
            <p className="text-sm font-black text-slate-900">{trip.distanceKm} km</p>
          </div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
            <p className="text-sm font-black text-slate-900">{Math.floor(trip.durationMinutes / 60)}h {trip.durationMinutes % 60}m</p>
          </div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Energy</p>
            <p className="text-sm font-black text-slate-900">{trip.energyUsedKwh} kWh</p>
          </div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
          <div className="w-4 h-4 flex-shrink-0 rounded-full border-2 border-gridwise-blue"></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Efficiency</p>
            <p className="text-sm font-black text-slate-900">{trip.efficiencyKmPerKwh} km/kWh</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          Battery: {trip.startBattery}% → {trip.endBattery}%
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onViewDetails}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors"
          >
            View Details
          </button>
          <button 
            onClick={onRepeatTrip}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-lg text-sm font-bold transition-colors hidden sm:block shadow-sm"
          >
            Repeat Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
