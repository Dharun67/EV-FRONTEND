import React from 'react';

export const AssetHealthBars: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Network Component Health</h3>
      
      <div className="space-y-4">
        {[
          { label: 'Overall Health', val: 94, color: 'bg-green-500' },
          { label: 'Connector System', val: 86, color: 'bg-blue-500' },
          { label: 'Power Electronics', val: 91, color: 'bg-emerald-500' },
          { label: 'Cooling System', val: 82, color: 'bg-orange-500' },
          { label: 'Communication (Network)', val: 98, color: 'bg-indigo-500' },
          { label: 'Payment Terminals', val: 95, color: 'bg-purple-500' },
        ].map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600 uppercase tracking-wider">{item.label}</span>
              <span className="text-slate-900">{item.val}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FaultAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Fault Origin Analytics</h3>
      
      <div className="flex h-6 rounded-full overflow-hidden mb-6">
        <div className="bg-red-500 h-full" style={{ width: '38%' }} title="Connector Fault: 38%"></div>
        <div className="bg-orange-500 h-full" style={{ width: '24%' }} title="Communication: 24%"></div>
        <div className="bg-blue-500 h-full" style={{ width: '18%' }} title="Cooling: 18%"></div>
        <div className="bg-purple-500 h-full" style={{ width: '12%' }} title="Power: 12%"></div>
        <div className="bg-slate-400 h-full" style={{ width: '8%' }} title="Other: 8%"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> <span className="text-slate-600">Connector (38%)</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> <span className="text-slate-600">Comm/Network (24%)</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> <span className="text-slate-600">Cooling (18%)</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> <span className="text-slate-600">Power (12%)</span></div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Cost</p>
          <p className="text-lg font-bold text-red-600">₹4.8 L</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Downtime</p>
          <p className="text-lg font-bold text-slate-900">3.8 hrs</p>
        </div>
      </div>
    </div>
  );
};
