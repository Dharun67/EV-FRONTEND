import React from 'react';
import { Link2, ArrowRight } from 'lucide-react';
import { AIBadge } from '../shared/AIBadge';

export const CrossDomainCorrelation: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-purple-500" /> Cross-Domain Intelligence
        </h2>
        <AIBadge type="simulated" />
      </div>

      <div className="space-y-4">
        <CorrelationRow 
          factors={['Demand ↑', 'Infrastructure Gap ↑']}
          result="Expansion Priority ↑"
          color="text-red-600"
          bg="bg-red-50 border-red-200"
        />
        <CorrelationRow 
          factors={['Utilization ↑', 'Fault Rate ↑']}
          result="Maintenance Risk ↑"
          color="text-orange-600"
          bg="bg-orange-50 border-orange-200"
        />
        <CorrelationRow 
          factors={['Fleet Demand ↑', 'Peak Hours ↑']}
          result="Smart Charging Opportunity ↑"
          color="text-emerald-600"
          bg="bg-emerald-50 border-emerald-200"
        />
      </div>
    </div>
  );
};

const CorrelationRow: React.FC<{factors: string[], result: string, color: string, bg: string}> = ({ factors, result, color, bg }) => (
  <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${bg}`}>
    <div className="flex flex-wrap items-center justify-center gap-2">
      {factors.map((f, i) => (
        <React.Fragment key={i}>
          <span className="font-bold text-slate-700 bg-white px-3 py-1 rounded-lg shadow-sm text-sm">{f}</span>
          {i < factors.length - 1 && <span className="text-slate-400 font-bold">+</span>}
        </React.Fragment>
      ))}
    </div>
    <ArrowRight className={`w-5 h-5 ${color} hidden md:block`} />
    <span className={`text-lg font-black ${color} bg-white px-4 py-1.5 rounded-lg shadow-sm text-center w-full md:w-auto`}>{result}</span>
  </div>
);
