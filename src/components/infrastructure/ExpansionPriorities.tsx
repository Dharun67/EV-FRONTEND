import React from 'react';
import { Target, Plus } from 'lucide-react';
import { ExpansionRecommendation } from '../../types/infrastructure';

interface ExpansionPrioritiesProps {
  recommendations: ExpansionRecommendation[];
  onAdd: (zoneId: string) => void;
}

const ExpansionPriorities: React.FC<ExpansionPrioritiesProps> = ({ recommendations, onAdd }) => {
  // Sort by opportunity score descending
  const sorted = [...recommendations].sort((a, b) => b.opportunityScore - a.opportunityScore);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-blue-600" /> Top Expansion Priorities
      </h3>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Score</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rec. Chargers</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((rec, idx) => (
              <tr key={rec.zoneId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    idx === 0 ? 'bg-red-100 text-red-700' :
                    idx === 1 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                </td>
                <td className="py-3 font-bold text-slate-900 text-sm">{rec.zoneName}</td>
                <td className="py-3 font-black text-blue-600">{rec.opportunityScore}</td>
                <td className="py-3 font-bold text-slate-900">+{rec.recommendedChargers}</td>
                <td className="py-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    rec.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {rec.priority}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button 
                    onClick={() => onAdd(rec.zoneId)}
                    className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-slate-900 text-slate-600 rounded-lg transition-colors border border-slate-200 hover:border-blue-600 shadow-sm inline-flex items-center gap-1 group"
                    title="Add to Planning Queue"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-[10px] font-bold hidden group-hover:inline-block px-1">Plan</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpansionPriorities;
