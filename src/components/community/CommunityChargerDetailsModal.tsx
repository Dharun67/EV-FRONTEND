import React from 'react';
import { CommunityCharger, CommunityHost } from '../../types/community';
import { X, Navigation, Calendar, Star, MapPin, Zap, Shield, Car, Wifi, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommunityChargerDetailsModalProps {
  charger: CommunityCharger;
  host: CommunityHost;
  onClose: () => void;
}

const CommunityChargerDetailsModal: React.FC<CommunityChargerDetailsModalProps> = ({ charger, host, onClose }) => {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/booking?station=${encodeURIComponent(charger.id)}`);
  };

  const handleNavigate = () => {
    navigate(`/route-planner?station=${encodeURIComponent(charger.id)}`);
  };

  const getAmenityIcon = (amenity: string) => {
    const a = amenity.toLowerCase();
    if (a.includes('park')) return <Car className="w-4 h-4" />;
    if (a.includes('wifi') || a.includes('wi-fi')) return <Wifi className="w-4 h-4" />;
    if (a.includes('security') || a.includes('camera')) return <Camera className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-900">Charger Details</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex gap-2 items-center mb-2">
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                  {charger.type}
                </span>
                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${
                  charger.status === 'Available' ? 'bg-green-50 text-green-700 border-green-100' :
                  charger.status === 'Busy' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-red-50 text-red-700 border-red-100'
                }`}>
                  {charger.status}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{charger.name}</h3>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" /> {charger.distanceKm} km • {charger.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Price</p>
              <p className="text-2xl font-black text-slate-900">₹{charger.pricePerKwh}<span className="text-sm font-medium text-slate-500">/kWh</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Power</p>
              <p className="text-sm font-black text-slate-900 flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-600" /> {charger.powerKw} kW
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Connector</p>
              <p className="text-sm font-black text-slate-900">{charger.connector}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Rating</p>
              <p className="text-sm font-black text-slate-900 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {charger.rating}
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Sessions</p>
              <p className="text-sm font-black text-slate-900">{charger.sessionsCompleted}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-slate-900 mb-4">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {charger.amenities.map((amenity, idx) => (
                <div key={idx} className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2">
                  {getAmenityIcon(amenity)} {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-slate-900 mb-4">Charger Host</h4>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-600 flex-shrink-0">
                {host.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-900">{host.name}</h5>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {host.rating} ★ Rating
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Successful Sessions</p>
                <p className="font-bold text-slate-900">{host.sessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8 flex items-start gap-3 text-green-800">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm mb-0.5">Trusted Community Charging</p>
              <p className="text-xs font-medium text-green-700">
                GridWise community chargers are presented with host, rating and availability information to help drivers make informed decisions.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleNavigate}
              className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-5 h-5" /> Navigate
            </button>
            <button 
              onClick={handleReserve}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" /> Reserve
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommunityChargerDetailsModal;
