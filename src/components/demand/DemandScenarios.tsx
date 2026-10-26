import React, { useState } from 'react';
import { Layers } from 'lucide-react';

const DemandScenarios: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Normal' | 'High Growth' | 'Peak Event'>('Normal');

  const getScenarioData = () => {
    switch (activeTab) {
      case 'High Growth':
        return { demand: 91, gap: 52, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
      case 'Peak Event':
        return { demand: 97, gap: 68, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
      default:
        return { demand: 82, gap: 34, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    }
  };

  const data = getScenarioData();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Layers className="w-5 h-5 text-slate-400" /> Scenario Analysis
      </h3>

      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
        {['Normal', 'High Growth', 'Peak Event'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={`p-6 rounded-xl border transition-colors ${data.bg} ${data.border}`}>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center border-r border-slate-200/50">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Projected Demand Score</p>
            <p className={`text-4xl font-black ${data.color}`}>{data.demand}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Capacity Gap</p>
            <p className={`text-4xl font-black ${data.color}`}>{data.gap}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">Chargers Needed</p>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right mt-4">Frontend-only simulation</p>
    </div>
  );
};

export default DemandScenarios;
