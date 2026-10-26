import React, { useState } from 'react';
import { CommunityCharger } from '../../types/community';
import { Heart, MapPin, Star, Zap } from 'lucide-react';

interface CommunityChargerCardProps {
  charger: CommunityCharger;
  isSelected: boolean;
  onClick: () => void;
  onViewDetails: () => void;
  onReserve: (e: React.MouseEvent) => void;
}

const CommunityChargerCard: React.FC<CommunityChargerCardProps> = ({ 
  charger, isSelected, onClick, onViewDetails, onReserve 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const getStatusColor = () => {
    switch (charger.status) {
      case 'Available': return 'bg-green-50 text-green-700 border-green-100';
      case 'Busy': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Unavailable': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl border-2 p-5 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col h-full relative ${
        isSelected ? 'border-gridwise-blue ring-2 ring-blue-100 transform -translate-y-1' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 items-center">
          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">
            {charger.type}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor()}`}>
            {charger.status}
          </span>
        </div>
        
        <div className="relative">
          <button 
            onClick={toggleFavorite}
            className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors ${isFavorite ? 'text-red-500' : 'text-slate-400'}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          {showTooltip && (
            <div className="absolute top-10 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-10 animate-in fade-in duration-200">
              {isFavorite ? 'Added to favorites' : 'Removed from favorites'}
            </div>
          )}
        </div>
      </div>

      <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">{charger.name}</h3>
      <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-2">
        <MapPin className="w-3 h-3" /> {charger.distanceKm} km • {charger.location}
      </p>

      <div className="flex items-center gap-1 mb-4">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="text-sm font-bold text-slate-900">{charger.rating}</span>
        <span className="text-xs text-slate-500 ml-1">({charger.sessionsCompleted} sessions)</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5 mt-auto">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Power</p>
          <p className="text-sm font-black text-slate-900 flex items-center gap-1">
            <Zap className="w-3 h-3 text-blue-600" /> {charger.powerKw}kW
          </p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Plug</p>
          <p className="text-sm font-black text-slate-900">{charger.connector}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</p>
          <p className="text-sm font-black text-slate-900">₹{charger.pricePerKwh}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 pt-4 border-t border-slate-100">
        <div className="w-6 h-6 rounded-full bg-slate-200 flex flex-shrink-0 items-center justify-center text-[10px] font-bold text-slate-600">
          {(charger.hostName || 'U').charAt(0)}
        </div>
        <p className="text-xs font-medium text-slate-600 truncate flex-1">
          Hosted by <span className="font-bold text-slate-900">{charger.hostName || 'Unknown'}</span>
        </p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
          className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors"
        >
          View Charger
        </button>
        <button 
          onClick={onReserve}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default CommunityChargerCard;
