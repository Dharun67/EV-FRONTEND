import React from 'react';
import { Zap, Navigation, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NearestChargersProps {
  chargers: Array<{
    id: string;
    name: string;
    distance: number;
    power: number;
    price: number;
    available: boolean;
  }>;
}

const NearestChargers: React.FC<NearestChargersProps> = ({ chargers }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4">Nearest Charging Stations</h3>
      
      <div className="space-y-4">
        {chargers.map((station) => (
          <div key={station.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-colors">
            <div>
              <h4 className="font-bold text-slate-900 mb-1">{station.name}</h4>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {station.distance} km</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-blue-600" /> {station.power} kW</span>
                <span>•</span>
                <span>₹{station.price}/kWh</span>
                <span className="px-2 py-0.5 rounded border border-green-200 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider ml-1">
                  Available
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/stations')}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-sm transition-colors"
              >
                View
              </button>
              <button 
                onClick={() => navigate(`/route-planner?station=${station.id}`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                <Navigation className="w-4 h-4" /> Navigate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearestChargers;
