import React from 'react';
import { BarChart2 } from 'lucide-react';

const CoverageByZone: React.FC = () => {
  const data = [
    { label: 'Urban', score: 92, color: 'bg-green-500' },
    { label: 'Commercial', score: 88, color: 'bg-green-400' },
    { label: 'Residential', score: 76, color: 'bg-blue-500' },
    { label: 'Suburban', score: 71, color: 'bg-orange-400' },
    { label: 'Highway', score: 64, color: 'bg-red-500', note: 'Needs attention' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-slate-400" /> Coverage by Zone Type
      </h3>

      <div className="flex-1 space-y-5">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700 flex items-center gap-2">
                {item.label}
                {item.note && <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded uppercase">{item.note}</span>}
              </span>
              <span className="text-slate-900">{item.score}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.score}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverageByZone;
