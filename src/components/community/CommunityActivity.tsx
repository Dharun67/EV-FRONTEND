import React from 'react';
import { Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

interface CommunityActivityProps {
  activities: ActivityItem[];
}

const CommunityActivity: React.FC<CommunityActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Recent Community Activity
      </h3>
      
      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-slate-700">{act.text}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityActivity;
