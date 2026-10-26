import React from 'react';
import { BarChart3 } from 'lucide-react';

interface DemandRankingProps {
  data: Array<{ rank: number, name: string, score: number, utilization: number, growth: string, recommendation: string }>;
}

const DemandRanking: React.FC<DemandRankingProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-slate-400" /> Station Demand Ranking
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Station</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Demand Score</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Utilization</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Growth</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.rank} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    item.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    item.rank === 2 ? 'bg-slate-200 text-slate-700' :
                    item.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {item.rank}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-900">{item.name}</span>
                </td>
                <td className="py-4">
                  <span className="font-black text-slate-900">{item.score}</span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-700">{item.utilization}%</span>
                </td>
                <td className="py-4">
                  <span className="text-xs font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">{item.growth}</span>
                </td>
                <td className="py-4 text-right">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    item.recommendation === 'Expand Capacity' ? 'bg-blue-100 text-blue-700' :
                    item.recommendation === 'Add Connector' ? 'bg-purple-100 text-purple-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.recommendation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemandRanking;
