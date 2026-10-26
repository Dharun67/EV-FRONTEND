import React from 'react';

const timelineData = [
  { time: '09 AM', status: 'Available', color: 'bg-green-500' },
  { time: '10 AM', status: 'Available', color: 'bg-green-500' },
  { time: '11 AM', status: 'Busy', color: 'bg-amber-500' },
  { time: '12 PM', status: 'Unavailable', color: 'bg-slate-300' },
  { time: '01 PM', status: 'Available', color: 'bg-green-500' },
  { time: '02 PM', status: 'Available', color: 'bg-green-500' },
  { time: '03 PM', status: 'Available', color: 'bg-green-500' },
  { time: '04 PM', status: 'Busy', color: 'bg-amber-500' },
  { time: '05 PM', status: 'Available', color: 'bg-green-500' },
];

const AvailabilityTimeline: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Availability Timeline</h3>
      
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto hide-scrollbar">
        <div className="flex items-center min-w-[600px] relative">
          {/* Connecting line */}
          <div className="absolute top-4 left-0 w-full h-1 bg-slate-100 rounded-full z-0"></div>
          
          {timelineData.map((slot, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center relative z-10">
              <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm mb-2 ${slot.color}`}></div>
              <span className="text-xs font-bold text-slate-700 mb-0.5 whitespace-nowrap">{slot.time}</span>
              <span className={`text-[9px] font-black uppercase tracking-wider ${
                slot.status === 'Available' ? 'text-green-600' :
                slot.status === 'Busy' ? 'text-amber-600' : 'text-slate-400'
              }`}>
                {slot.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTimeline;
