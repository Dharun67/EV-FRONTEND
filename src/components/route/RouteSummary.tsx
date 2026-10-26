import React from 'react';
import { RouteOption } from '../../types/route';
import { Navigation, Edit3, ArrowDown, MapPin, Zap, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RouteSummaryProps {
  route: RouteOption;
  startLocation: string;
  destination: string;
  onStartNavigation: () => void;
  onEditRoute: () => void;
}

const RouteSummary: React.FC<RouteSummaryProps> = ({ 
  route, 
  startLocation, 
  destination,
  onStartNavigation,
  onEditRoute
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Route Summary</h3>
        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
          (route as any).isRecommended ? 'bg-amber-100 text-amber-800 border border-amber-200' :
          route.badge === 'Fastest' ? 'bg-blue-50 text-blue-700' :
          route.badge === 'Lowest Energy' ? 'bg-green-50 text-green-700' :
          'bg-purple-50 text-purple-700'
        }`}>
          {(route as any).isRecommended ? '✨ AI Recommended' : route.badge}
        </span>
      </div>

      {(route as any).aiReasoning && (
        <div className="mb-6 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
          <p className="text-sm font-semibold text-indigo-800">
            ✨ {(route as any).aiReasoning}
          </p>
        </div>
      )}

      <div className="relative pl-6 pb-6 border-l-2 border-dashed border-slate-200 ml-3 space-y-6">
        {/* Start */}
        <div className="relative">
          <div className="absolute -left-[31px] top-0 h-4 w-4 bg-slate-900 rounded-full border-4 border-white shadow-sm"></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start</p>
          <p className="font-bold text-slate-900">{startLocation}</p>
        </div>

        {/* Charging Option if any */}
        {route.chargingStops > 0 ? (
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 h-4 w-4 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Zap className="h-3 w-3" /> Charging Stop
            </p>
            <p className="font-bold text-slate-900">GridWise Central Hub</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 h-4 w-4 bg-slate-300 rounded-full border-4 border-white shadow-sm"></div>
            <p className="text-xs font-medium text-slate-400 italic">No charging stops required</p>
          </div>
        )}

        {/* Destination */}
        <div className="relative">
          <div className="absolute -left-[31px] top-0 h-4 w-4 bg-red-500 rounded-full border-4 border-white shadow-sm"></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Destination</p>
          <p className="font-bold text-slate-900">{destination}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
        <button 
          onClick={() => navigate('/booking')}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md hover:shadow-lg text-lg"
        >
          <CalendarCheck className="h-5 w-5" /> Book Charging Slot / Join Queue
        </button>
        <button 
          onClick={onEditRoute}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
        >
          <Edit3 className="h-4 w-4" /> Edit Route
        </button>
      </div>
    </div>
  );
};

export default RouteSummary;
