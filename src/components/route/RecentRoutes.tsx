import React from 'react';
import { RecentRoute } from '../../types/route';
import { History, ArrowRight } from 'lucide-react';

interface RecentRoutesProps {
  routes: RecentRoute[];
  onUseRoute: (start: string, dest: string) => void;
}

const RecentRoutes: React.FC<RecentRoutesProps> = ({ routes, onUseRoute }) => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
        <History className="h-4 w-4 text-slate-400" /> Recent Routes
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routes.map(route => (
          <div key={route.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="truncate max-w-[80px]">{route.startLocation}</span>
                <ArrowRight className="h-3 w-3 text-slate-400 flex-shrink-0" />
                <span className="truncate max-w-[80px]">{route.destination}</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
                <p className="text-sm font-semibold text-slate-700">{route.distanceKm} km</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium mb-2">{route.timeAgo}</p>
                <button 
                  onClick={() => onUseRoute(route.startLocation, route.destination)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-blue-600 text-xs font-bold rounded-lg transition-colors"
                >
                  Use Route
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRoutes;
