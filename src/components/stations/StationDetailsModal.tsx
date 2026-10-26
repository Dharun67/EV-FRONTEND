import React, { useEffect } from 'react';
import type { Station } from '../../types';
import { X, MapPin, Star, Clock, Zap, Coffee, Wifi, Car, Navigation, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StationDetailsModalProps {
  station: Station | null;
  onClose: () => void;
}

const StationDetailsModal: React.FC<StationDetailsModalProps> = ({ station, onClose }) => {
  const navigate = useNavigate();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!station) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{station.name}</h2>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {station.location || 'Coimbatore'}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> {station.rating || '4.5'}</span>
              <span className="flex items-center gap-1 text-green-600"><Clock className="h-4 w-4" /> Open 24/7</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors shadow-sm border border-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Main Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <p className={`text-lg font-bold ${
                station.status === 'Available' ? 'text-green-600' : 
                station.status === 'Busy' ? 'text-amber-600' : 'text-red-600'
              }`}>{station.status}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Available</p>
              <p className="text-lg font-bold text-slate-900">{station.availableConnectors} / {station.connectors}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Power</p>
              <p className="text-lg font-bold text-slate-900">{station.power ? `${station.power} kW` : station.chargingType}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Price</p>
              <p className="text-lg font-bold text-slate-900">₹{station.pricePerKwh}<span className="text-xs text-slate-500 font-medium">/kWh</span></p>
            </div>
          </div>

          {/* Connectors & Charging */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Charging Information</h3>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{station.chargingType} Connectors</h4>
                  <p className="text-sm text-slate-500">CCS2 / CHAdeMO compatible</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{station.estimatedChargingTime || 30} min</p>
                <p className="text-xs text-slate-500">Estimated 10% to 80%</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">
                <Coffee className="h-4 w-4 text-slate-400" /> Cafe
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">
                <Wifi className="h-4 w-4 text-slate-400" /> Free Wi-Fi
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">
                <Car className="h-4 w-4 text-slate-400" /> Free Parking
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">
                <span className="text-slate-400 font-bold text-lg leading-none">🚾</span> Restrooms
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white flex gap-4">
          <button 
            onClick={() => navigate(`/route-planner?station=${encodeURIComponent(station.id)}`)}
            className="flex-1 bg-slate-900 hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold transition-colors shadow-md flex items-center justify-center gap-2 text-lg"
          >
            <Navigation className="h-5 w-5" /> Navigate
          </button>
          <button 
            onClick={() => navigate(`/booking?station=${encodeURIComponent(station.id)}`)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-slate-900 py-3.5 rounded-xl font-bold transition-colors shadow-md flex items-center justify-center gap-2 text-lg"
          >
            <CalendarCheck className="h-5 w-5" /> Book Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationDetailsModal;
