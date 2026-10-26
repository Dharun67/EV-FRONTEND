import React from 'react';

const ChargingPattern: React.FC = () => {
  const patterns = [
    { label: 'Home Charging', value: 42, color: '#3b82f6' },
    { label: 'Public Fast Charging', value: 38, color: '#f59e0b' },
    { label: 'Community Charging', value: 12, color: '#10b981' },
    { label: 'Other', value: 8, color: '#94a3b8' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full">
      <h3 className="font-bold text-slate-900 mb-6">Charging Pattern</h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
            {/* SVG implementation for a simple donut chart */}
            {/* 42% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="105.5 251.2" strokeDashoffset="0" />
            {/* 38% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="95.4 251.2" strokeDashoffset="-105.5" />
            {/* 12% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="30.1 251.2" strokeDashoffset="-200.9" />
            {/* 8% */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#94a3b8" strokeWidth="20" strokeDasharray="20.1 251.2" strokeDashoffset="-231" />
          </svg>
        </div>

        <div className="w-full space-y-3">
          {patterns.map((p, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                <span className="font-medium text-slate-700">{p.label}</span>
              </div>
              <span className="font-bold text-slate-900">{p.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChargingPattern;
