import React from 'react';
import { RouteOption } from '../../types/route';
import { Activity } from 'lucide-react';

interface TrafficCardProps {
  route: RouteOption;
}

const TrafficCard: React.FC<TrafficCardProps> = ({ route }) => {
  const getTrafficColor = (condition: string) => {
    switch(condition) {
      case 'Light': return 'bg-green-500';
      case 'Moderate': return 'bg-amber-500';
      case 'Heavy': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-400" />
          Traffic Conditions
        </h3>
        <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
          route.traffic === 'Light' ? 'bg-green-50 text-green-700' :
          route.traffic === 'Moderate' ? 'bg-amber-50 text-amber-700' :
          'bg-red-50 text-red-700'
        }`}>
          Overall: {route.traffic}
        </span>
      </div>

      <div className="space-y-3">
        {route.trafficSegments.map(segment => (
          <div key={segment.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-sm font-semibold text-slate-700">{segment.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{segment.condition}</span>
              <div className={`h-2.5 w-2.5 rounded-full shadow-sm ${getTrafficColor(segment.condition)}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficCard;
