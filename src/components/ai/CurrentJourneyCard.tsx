import React from 'react';
import { JourneyContext } from '../../types/ai';
import { Car, MapPin, Edit3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CurrentJourneyCardProps {
  context: JourneyContext;
}

const CurrentJourneyCard: React.FC<CurrentJourneyCardProps> = ({ context }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900">Current Journey</h3>
        <button 
          onClick={() => navigate('/route-planner')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-blue-600 rounded-lg text-sm font-semibold transition-colors border border-slate-200"
        >
          <Edit3 className="h-4 w-4" /> Change Journey
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 flex items-center gap-4">
          <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 relative">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> From</p>
            <p className="font-bold text-slate-900 truncate">{context.startLocation}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-300 flex-shrink-0" />
          <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 relative">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> To</p>
            <p className="font-bold text-slate-900 truncate">{context.destination}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Distance</p>
            <p className="font-bold text-slate-900">{context.distanceKm} km</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Bat.</p>
            <p className="font-bold text-slate-900">{context.currentBatteryPercentage}%</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Arrival Bat.</p>
            <p className="font-bold text-slate-900">{context.estimatedArrivalBattery}%</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vehicle</p>
            <p className="font-bold text-slate-900 flex items-center gap-1 truncate"><Car className="h-3 w-3 text-slate-400 flex-shrink-0"/> {context.vehicleName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentJourneyCard;
