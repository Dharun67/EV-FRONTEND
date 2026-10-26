import React from 'react';
import { TrendingUp } from 'lucide-react';
import { ExpansionRecommendation } from '../../types/infrastructure';

interface ROIPriorityProps {
  recommendations: ExpansionRecommendation[];
}

const ROIPriority: React.FC<ROIPriorityProps> = ({ recommendations }) => {
  // Sort by ROI (revenue / investment)
  const sorted = [...recommendations].sort((a, b) => {
    const roiA = a.estimatedAnnualRevenue / a.estimatedInvestment;
    const roiB = b.estimatedAnnualRevenue / b.estimatedInvestment;
    return roiB - roiA;
  }).slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-500" /> Expansion ROI Ranking
      </h3>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[400px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Investment</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Expected Revenue</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Est. ROI</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Priority</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(rec => {
              const roi = Math.round((rec.estimatedAnnualRevenue / rec.estimatedInvestment) * 100);
              return (
                <tr key={rec.zoneId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4">
                    <span className="font-bold text-slate-900 text-sm">{rec.zoneName}</span>
                  </td>
                  <td className="py-4 font-bold text-slate-700">₹{rec.estimatedInvestment} Cr</td>
                  <td className="py-4 font-bold text-slate-700 hidden sm:table-cell">₹{rec.estimatedAnnualRevenue * 100} L/year</td>
                  <td className="py-4 font-black text-green-600">{roi}%</td>
                  <td className="py-4 text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                      rec.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {rec.priority}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ROIPriority;
