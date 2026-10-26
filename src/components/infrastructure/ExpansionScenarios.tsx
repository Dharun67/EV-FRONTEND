import React, { useState } from 'react';
import { Layers } from 'lucide-react';

const ExpansionScenarios: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Current' | 'Moderate' | 'Aggressive'>('Current');

  const getScenarioData = () => {
    switch (activeTab) {
      case 'Moderate':
        return { chargers: 330, coverage: 88, util: 72, gap: 12, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
      case 'Aggressive':
        return { chargers: 380, coverage: 95, util: 61, gap: 0, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      default:
        return { chargers: 286, coverage: 78, util: 84, gap: 56, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    }
  };

  const data = getScenarioData();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Layers className="w-5 h-5 text-slate-400" /> Expansion Scenario Analysis
      </h3>

      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
        {['Current', 'Moderate', 'Aggressive'].map((tab) => (
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

      <div className={`p-6 rounded-xl border transition-colors flex-1 flex flex-col justify-center ${data.bg} ${data.border}`}>
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="text-center border-r border-slate-200/50">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Chargers</p>
            <p className={`text-4xl font-black ${data.color}`}>{data.chargers}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Coverage</p>
            <p className={`text-4xl font-black ${data.color}`}>{data.coverage}</p>
          </div>
          <div className="text-center border-r border-slate-200/50 pt-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Utilization</p>
            <p className={`text-2xl font-black ${data.color}`}>{data.util}%</p>
          </div>
          <div className="text-center pt-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Remaining Gap</p>
            <p className={`text-2xl font-black ${data.color}`}>{data.gap}</p>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right mt-4">Frontend-only simulation</p>
    </div>
  );
};

export default ExpansionScenarios;
