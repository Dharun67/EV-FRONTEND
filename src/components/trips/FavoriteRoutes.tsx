import React from 'react';
import { Navigation, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FavoriteRoutesProps {
  routes: Array<{
    id: string;
    route: string;
    trips: number;
    avgDist: number;
    avgEff: number;
    from: string;
    to: string;
  }>;
}

const FavoriteRoutes: React.FC<FavoriteRoutesProps> = ({ routes }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Route className="w-5 h-5 text-slate-400" /> Frequently Driven Routes
      </h3>

      <div className="space-y-4">
        {routes.map(route => (
          <div key={route.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">{route.route}</h4>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                <span>Trips: <span className="font-bold text-slate-900">{route.trips}</span></span>
                <span>Avg Distance: <span className="font-bold text-slate-900">{route.avgDist} km</span></span>
                <span>Avg Efficiency: <span className="font-bold text-slate-900">{route.avgEff} km/kWh</span></span>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/route-planner?from=${route.from}&to=${route.to}`)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-900 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <Navigation className="w-4 h-4" /> Plan Route
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRoutes;
