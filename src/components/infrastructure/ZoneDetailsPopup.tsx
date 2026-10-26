import React from 'react';
import { X, MapPin, Target, Zap, AlertTriangle } from 'lucide-react';
import { InfrastructureZone } from '../../types/infrastructure';

interface ZoneDetailsPopupProps {
  zone: InfrastructureZone;
  onClose: () => void;
}

const ZoneDetailsPopup: React.FC<ZoneDetailsPopupProps> = ({ zone, onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl w-80 p-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-lg leading-tight">{zone.name}</h4>
          <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> Zone Details
          </p>
        </div>
        <button onClick={onClose} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Target className="w-3 h-3" /> Coverage Score
          </p>
          <p className={`font-black text-lg ${zone.coverageScore < 70 ? 'text-red-600' : 'text-slate-900'}`}>
            {zone.coverageScore} / 100
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3" /> EV Demand
          </p>
          <p className="font-black text-lg text-slate-900">
            {zone.demandScore}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm items-center border-b border-slate-50 pb-2">
          <span className="text-slate-500">Current Chargers</span>
          <span className="font-bold text-slate-900">{zone.currentChargers}</span>
        </div>
        <div className="flex justify-between text-sm items-center border-b border-slate-50 pb-2">
          <span className="text-slate-500">Required Chargers</span>
          <span className="font-bold text-slate-900">{zone.requiredChargers}</span>
        </div>
        <div className="flex justify-between text-sm items-center border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-bold">Capacity Gap</span>
          <span className={`font-black ${zone.capacityGap > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {zone.capacityGap > 0 ? `-${zone.capacityGap}` : '0'}
          </span>
        </div>
        <div className="flex justify-between text-sm items-center border-b border-slate-50 pb-2">
          <span className="text-slate-500">Average Utilization</span>
          <span className="font-bold text-slate-900">{zone.utilization}%</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-slate-500">Priority</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
            zone.priority === 'Critical' ? 'bg-red-100 text-red-700' :
            zone.priority === 'High' ? 'bg-orange-100 text-orange-700' :
            zone.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {zone.priority}
          </span>
        </div>
      </div>

      {zone.priority === 'Critical' && (
        <div className="mb-4 bg-red-50 border border-red-100 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs font-bold text-red-800 leading-tight">Critical infrastructure deficit. Immediate expansion recommended.</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default ZoneDetailsPopup;
