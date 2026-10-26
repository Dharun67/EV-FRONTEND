import React from 'react';
import { History, Zap, MapPin, BatteryCharging, AlertTriangle, CloudOff, Info } from 'lucide-react';

interface OperationsActivityProps {
  activities: Array<{ time: string, text: string }>;
}

const OperationsActivity: React.FC<OperationsActivityProps> = ({ activities }) => {
  const getIcon = (text: string) => {
    if (text.includes('maintenance') || text.includes('fault')) return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    if (text.includes('revenue') || text.includes('utilization')) return <Zap className="w-4 h-4 text-green-500" />;
    if (text.includes('added') || text.includes('new')) return <BatteryCharging className="w-4 h-4 text-blue-500" />;
    if (text.includes('offline')) return <CloudOff className="w-4 h-4 text-red-500" />;
    if (text.includes('online')) return <MapPin className="w-4 h-4 text-green-500" />;
    return <Info className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <History className="w-5 h-5 text-slate-400" /> Recent Activity
      </h3>

      <div className="flex-1 space-y-4 pr-2 custom-scrollbar overflow-y-auto">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="mt-1 w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
              {getIcon(activity.text)}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 leading-snug">{activity.text}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationsActivity;
