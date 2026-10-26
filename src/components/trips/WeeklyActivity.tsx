import React from 'react';
import { Activity } from 'lucide-react';

interface WeeklyActivityProps {
  data: any[];
}

const WeeklyActivity: React.FC<WeeklyActivityProps> = ({ data }) => {
  const maxTrips = Math.max(...data.map(d => d.trips));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Weekly Driving Activity
      </h3>

      <div className="h-48 flex items-end justify-between gap-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group">
            <div className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.trips} trips
            </div>
            <div 
              className="w-full bg-indigo-200 rounded-t-sm group-hover:bg-indigo-400 transition-colors"
              style={{ height: `${(item.trips / maxTrips) * 100}%` }}
            ></div>
            <span className="text-[10px] font-bold text-slate-400 mt-2">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivity;
