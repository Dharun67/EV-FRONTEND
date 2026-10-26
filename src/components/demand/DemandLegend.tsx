import React from 'react';

const DemandLegend: React.FC = () => {
  const levels = [
    { label: 'Very High', color: 'bg-red-500', shadow: 'shadow-red-500/50' },
    { label: 'High', color: 'bg-orange-500', shadow: 'shadow-orange-500/50' },
    { label: 'Moderate', color: 'bg-yellow-500', shadow: 'shadow-yellow-500/50' },
    { label: 'Low', color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
    { label: 'Very Low', color: 'bg-green-500', shadow: 'shadow-green-500/50' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start mb-2 sm:mb-0">
        {levels.map(level => (
          <div key={level.label} className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <div className={`w-3 h-3 rounded-full ${level.color} shadow-sm ${level.shadow}`}></div> {level.label}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        Demand score is a simulated intelligence metric
      </p>
    </div>
  );
};

export default DemandLegend;
