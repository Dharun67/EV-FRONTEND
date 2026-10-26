import React from 'react';
import { RescueUnit } from '../../types/rescue';
import { Truck } from 'lucide-react';

interface RescueUnitCardProps {
  unit: RescueUnit;
  onSelect: (id: string) => void;
}

const RescueUnitCard: React.FC<RescueUnitCardProps> = ({ unit, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-50 text-green-700 border-green-200';
      case 'Busy': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">{unit.name}</h4>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span>{unit.distanceKm} km</span>
            <span>•</span>
            <span className="font-bold text-slate-900">{unit.etaMinutes} min</span>
            <span>•</span>
            <span>{unit.serviceType}</span>
            <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(unit.status)}`}>
              {unit.status}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onSelect(unit.id)}
        disabled={unit.status === 'Busy'}
        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap ml-4 ${
          unit.status === 'Busy' 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-slate-900'
        }`}
      >
        Select
      </button>
    </div>
  );
};

export default RescueUnitCard;
