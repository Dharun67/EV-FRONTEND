import React from 'react';
import { DemandZone } from '../../types/demand';
import { X, MapPin, ExternalLink, TrendingUp, AlertTriangle } from 'lucide-react';

interface DemandZonePopupProps {
  zone: DemandZone;
  onClose: () => void;
}

const DemandZonePopup: React.FC<DemandZonePopupProps> = ({ zone, onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl w-80 p-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-lg leading-tight">{zone.name}</h4>
          <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> Zone Analytics
          </p>
        </div>
        <button onClick={onClose} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Demand Score</p>
          <p className={`font-black text-lg ${zone.demandScore > 85 ? 'text-red-600' : zone.demandScore > 70 ? 'text-orange-600' : 'text-slate-900'}`}>
            {zone.demandScore} / 100
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Utilization</p>
          <p className="font-black text-lg text-slate-900">
            {zone.utilization}%
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Current Sessions</span>
          <span className="font-bold text-slate-900">{zone.currentSessions}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Available Chargers</span>
          <span className={`font-bold ${zone.availableChargers === 0 ? 'text-red-600' : 'text-green-600'}`}>{zone.availableChargers}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Queue</span>
          <span className="font-bold text-slate-900">{zone.queue} vehicles</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Forecast Growth</span>
          <span className="font-bold text-green-600 flex items-center gap-1">+{zone.growthPercentage}% <TrendingUp className="w-3 h-3" /></span>
        </div>
      </div>

      {zone.capacityGap > 0 && (
        <div className="mb-4 bg-orange-50 border border-orange-100 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="font-bold text-xs text-orange-800">Recommendation</span>
          </div>
          <p className="text-xs font-medium text-orange-700">Increase charging capacity by at least {zone.capacityGap} chargers.</p>
        </div>
      )}

      <button 
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
      >
        View Zone Details <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DemandZonePopup;
