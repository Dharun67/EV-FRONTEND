import React from 'react';
import { Activity } from 'lucide-react';

const BatteryTimeline: React.FC = () => {
  const events = [
    { time: '08:00 AM', desc: 'Battery 100%', type: 'battery' },
    { time: '10:30 AM', desc: 'Trip Started', type: 'trip' },
    { time: '12:10 PM', desc: 'Battery 72%', type: 'battery' },
    { time: '02:30 PM', desc: 'Battery 58%', type: 'battery' },
    { time: '05:00 PM', desc: 'Battery 46%', type: 'battery' },
    { time: '08:00 PM', desc: 'Charging Started', type: 'charging' },
    { time: '10:30 PM', desc: 'Battery 72%', type: 'battery' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Battery Activity Today
      </h3>
      
      <div className="relative border-l-2 border-slate-100 ml-3 flex-1 flex flex-col justify-between py-2">
        {events.map((evt, idx) => (
          <div key={idx} className="mb-6 last:mb-0 relative pl-6">
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm
              ${evt.type === 'charging' ? 'bg-blue-600' : evt.type === 'trip' ? 'bg-amber-500' : 'bg-green-500'}`} 
            />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{evt.time}</p>
            <p className="font-bold text-slate-900 text-sm">{evt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatteryTimeline;
