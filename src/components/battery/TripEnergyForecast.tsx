import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TripEnergyForecast: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6">Next Trip Energy Forecast</h3>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Destination</p>
              <p className="font-bold text-slate-900">Pollachi</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
            <p className="font-bold text-slate-900">67.8 km</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Battery</p>
            <p className="font-black text-slate-900 text-lg">72%</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Energy Required</p>
            <p className="font-black text-slate-900 text-lg">14.2 <span className="text-xs font-bold text-slate-500">kWh</span></p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Arrival Battery</p>
            <p className="font-black text-slate-900 text-lg">58%</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Battery Reserve</p>
            <p className="font-black text-slate-900 text-lg">58%</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border border-green-100">
          SAFE TO TRAVEL
        </div>
        <button 
          onClick={() => navigate('/route-planner')}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Route <Navigation className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TripEnergyForecast;
