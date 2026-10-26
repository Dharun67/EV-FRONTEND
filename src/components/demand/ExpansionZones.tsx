import React from 'react';
import { Target } from 'lucide-react';

const ExpansionZones: React.FC = () => {
  const zones = [
    { name: 'Gandhipuram', score: 96, demand: 'Very High', gap: 7, rec: 'Fast Charging Hub' },
    { name: 'Avinashi Road', score: 92, demand: 'Very High', gap: 6, rec: 'DC Fast Chargers' },
    { name: 'Peelamedu', score: 87, demand: 'High', gap: 4, rec: 'Mixed AC + DC' },
    { name: 'Saravanampatti', score: 82, demand: 'High', gap: 3, rec: 'Community Charging' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-slate-400" /> Potential Expansion Zones
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((zone, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-gridwise-blue transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-900">{zone.name}</h4>
              <span className="text-[10px] font-black bg-slate-200 text-slate-700 px-2 py-0.5 rounded uppercase tracking-wider">
                Score: {zone.score}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Demand</p>
                <p className={`font-bold text-sm ${zone.demand === 'Very High' ? 'text-red-600' : 'text-orange-600'}`}>{zone.demand}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Capacity Gap</p>
                <p className="font-bold text-sm text-slate-900">{zone.gap} chargers</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-2.5 rounded-lg">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended</p>
              <p className="font-black text-blue-600 text-sm">{zone.rec}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpansionZones;
