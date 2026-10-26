import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Zap, ExternalLink } from 'lucide-react';
import { PlannerStation } from '../../types/planner';

interface StationPopupProps {
  station: PlannerStation;
  onClose: () => void;
}

const StationPopup: React.FC<StationPopupProps> = ({ station, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-xl w-80 p-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-lg leading-tight">{station.name}</h4>
          <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {station.location}
          </p>
        </div>
        <button onClick={onClose} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Utilization</p>
          <p className="font-black text-slate-900 text-lg">{station.utilization}%</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
          <p className={`font-black text-sm uppercase tracking-wider ${station.status === 'Operational' ? 'text-green-600' : station.status === 'Offline' ? 'text-red-600' : 'text-orange-600'}`}>
            {station.status}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Total Chargers</span>
          <span className="font-bold text-slate-900">{station.totalChargers}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Available</span>
          <span className="font-bold text-green-600">{station.availableChargers}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Active Sessions</span>
          <span className="font-bold text-blue-600">{station.activeSessions}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Revenue Today</span>
          <span className="font-bold text-slate-900">₹{station.revenueToday.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Energy Delivered</span>
          <span className="font-bold text-slate-900">{station.energyDeliveredKwh} kWh</span>
        </div>
      </div>

      <button 
        onClick={() => navigate(`/planner/stations/${station.id}`)}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
      >
        View Station <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StationPopup;
