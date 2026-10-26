import React from 'react';

const EnergyBreakdown: React.FC = () => {
  const breakdown = [
    { label: 'Driving', value: 82, color: '#3b82f6' },
    { label: 'Climate Control', value: 9, color: '#f97316' },
    { label: 'Accessories', value: 5, color: '#8b5cf6' },
    { label: 'Battery Cond.', value: 4, color: '#10b981' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full">
      <h3 className="font-bold text-slate-900 mb-6">Energy Usage Breakdown</h3>
      
      <div className="flex flex-col items-center mb-6 relative">
        <div className="w-32 h-32 relative">
          <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
            {/* 82% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="206 251.2" strokeDashoffset="0" />
            {/* 9% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="16" strokeDasharray="22.6 251.2" strokeDashoffset="-206" />
            {/* 5% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="12.5 251.2" strokeDashoffset="-228.6" />
            {/* 4% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="10 251.2" strokeDashoffset="-241.1" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        {breakdown.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
            <span className="font-bold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyBreakdown;
