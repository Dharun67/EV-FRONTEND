import React from 'react';
import { HeartPulse } from 'lucide-react';

const NetworkHealth: React.FC = () => {
  const metrics = [
    { label: 'Overall', val: 94 },
    { label: 'Communication', val: 97 },
    { label: 'Power Systems', val: 95 },
    { label: 'Connectors', val: 92 },
    { label: 'Cooling', val: 96 },
    { label: 'Payment Systems', val: 98 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <HeartPulse className="w-5 h-5 text-green-500" /> Network Health
      </h3>

      <div className="flex-1 space-y-4">
        {metrics.map(m => (
          <div key={m.label}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">{m.label}</span>
              <span className={m.val > 93 ? 'text-green-600' : 'text-orange-600'}>{m.val}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${m.val > 93 ? 'bg-green-500' : 'bg-orange-500'}`} 
                style={{ width: `${m.val}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkHealth;
