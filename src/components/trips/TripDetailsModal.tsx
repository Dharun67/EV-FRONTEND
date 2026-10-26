import React from 'react';
import { Trip } from '../../types/trip';
import { X, Navigation } from 'lucide-react';
import TripRoutePreview from './TripRoutePreview';

interface TripDetailsModalProps {
  trip: Trip;
  onClose: () => void;
  onRepeatTrip: () => void;
}

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ trip, onClose, onRepeatTrip }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-900">Trip Details</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-bold text-slate-500">{trip.date}</p>
            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${
              trip.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {trip.status}
            </span>
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight">
            {trip.origin} <span className="text-slate-300 mx-2">→</span> {trip.destination}
          </h3>

          <TripRoutePreview trip={trip} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
             <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Start Time</p>
               <p className="text-sm font-black text-slate-900">{trip.startTime}</p>
             </div>
             <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">End Time</p>
               <p className="text-sm font-black text-slate-900">{trip.endTime}</p>
             </div>
             <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
               <p className="text-sm font-black text-slate-900">{trip.distanceKm} km</p>
             </div>
             <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Duration</p>
               <p className="text-sm font-black text-slate-900">{Math.floor(trip.durationMinutes/60)}h {trip.durationMinutes%60}m</p>
             </div>
          </div>

          <h4 className="font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Energy & Performance</h4>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Starting Battery</span>
              <span className="text-sm font-bold text-slate-900">{trip.startBattery}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Ending Battery</span>
              <span className="text-sm font-bold text-slate-900">{trip.endBattery}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Energy Used</span>
              <span className="text-sm font-bold text-slate-900">{trip.energyUsedKwh} kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Efficiency</span>
              <span className="text-sm font-bold text-slate-900">{trip.efficiencyKmPerKwh} km/kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Average Speed</span>
              <span className="text-sm font-bold text-slate-900">{trip.averageSpeedKmh} km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Traffic</span>
              <span className={`text-sm font-bold ${
                trip.traffic === 'Low' ? 'text-green-600' : trip.traffic === 'High' ? 'text-red-600' : 'text-amber-500'
              }`}>{trip.traffic}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Climate Usage</span>
              <span className="text-sm font-bold text-slate-900">8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Charging During Trip</span>
              <span className="text-sm font-bold text-slate-900">None</span>
            </div>
          </div>

          <button 
            onClick={onRepeatTrip}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" /> Repeat Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsModal;
