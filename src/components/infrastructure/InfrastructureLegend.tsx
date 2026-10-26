import React from 'react';

const InfrastructureLegend: React.FC = () => {
  const legendItems = [
    { label: 'Existing Station', color: 'bg-green-500', desc: 'Adequate coverage' },
    { label: 'High Demand', color: 'bg-orange-500', desc: 'Approaching capacity limit' },
    { label: 'Infrastructure Gap', color: 'bg-red-500', desc: 'Critical deficit' },
    { label: 'Potential Expansion', color: 'bg-blue-500', desc: 'Identified opportunity' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start mb-2 sm:mb-0">
        {legendItems.map(item => (
          <div key={item.label} className="flex items-center gap-2 group cursor-help relative">
            <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm border border-white`}></div>
            <span className="text-xs font-bold text-slate-600">{item.label}</span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-slate-900 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
        <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        </div>
        <span>INNER CIRCLE = COVERAGE %</span>
      </div>
    </div>
  );
};

export default InfrastructureLegend;
