import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Trip } from '../../types/trip';

interface TripAnalyticsProps {
  trips: Trip[];
}

const TripAnalytics: React.FC<TripAnalyticsProps> = ({ trips }) => {
  // Get last 7 completed trips
  const recentTrips = [...trips]
    .filter(t => t.status === 'Completed')
    .slice(0, 7)
    .reverse();

  const maxDist = Math.max(...recentTrips.map(t => t.distanceKm), 1);
  const maxEnergy = Math.max(...recentTrips.map(t => t.energyUsedKwh), 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-slate-400" /> Distance & Energy Usage
        </h3>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last 7 Trips</span>
      </div>

      <div className="h-64 flex items-end justify-between gap-2">
        {recentTrips.map((trip, idx) => (
          <div key={trip.id} className="flex-1 flex flex-col items-center group relative h-full justify-end">
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 bg-slate-900 text-white p-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              Trip {idx + 1}<br/>
              {trip.distanceKm} km<br/>
              {trip.energyUsedKwh} kWh
            </div>

            <div className="w-full flex justify-center gap-1 items-end h-[85%]">
              {/* Distance Bar */}
              <div 
                className="w-[40%] bg-blue-600 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"
                style={{ height: `${(trip.distanceKm / maxDist) * 100}%` }}
              ></div>
              {/* Energy Bar */}
              <div 
                className="w-[40%] bg-purple-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"
                style={{ height: `${(trip.energyUsedKwh / maxEnergy) * 100}%` }}
              ></div>
            </div>
            
            <span className="text-[10px] font-bold text-slate-400 mt-2 rotate-45 origin-left md:rotate-0 truncate w-full text-center">
              T{idx + 1}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <span className="text-xs font-bold text-slate-600">Distance (km)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
          <span className="text-xs font-bold text-slate-600">Energy (kWh)</span>
        </div>
      </div>
    </div>
  );
};

export default TripAnalytics;
