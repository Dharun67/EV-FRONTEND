import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { DemandZone } from '../../types/demand';

interface ZoneRankingProps {
  zones: DemandZone[];
}

const ZoneRanking: React.FC<ZoneRankingProps> = ({ zones }) => {
  // Sort by demand score descending and take top 5
  const topZones = [...zones].sort((a, b) => b.demandScore - a.demandScore).slice(0, 5);

  const getRecommendation = (gap: number) => {
    if (gap >= 5) return { text: 'Expand Capacity', color: 'bg-red-100 text-red-700' };
    if (gap >= 3) return { text: 'Add Chargers', color: 'bg-orange-100 text-orange-700' };
    if (gap >= 1) return { text: 'Add Connector', color: 'bg-purple-100 text-purple-700' };
    return { text: 'Monitor', color: 'bg-blue-100 text-blue-700' };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 overflow-hidden flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" /> Highest Demand Zones
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Demand Score</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Utilization</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Queue</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Growth</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {topZones.map((zone, idx) => {
              const rec = getRecommendation(zone.capacityGap);
              return (
                <tr key={zone.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                      idx === 1 ? 'bg-slate-200 text-slate-700' :
                      idx === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-900">{zone.name}</span>
                  </td>
                  <td className="py-4">
                    <span className={`font-black ${zone.demandScore >= 90 ? 'text-red-600' : 'text-orange-600'}`}>
                      {zone.demandScore}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-700">{zone.utilization}%</span>
                  </td>
                  <td className="py-4 hidden sm:table-cell">
                    <span className="font-bold text-slate-700">{zone.queue}</span>
                  </td>
                  <td className="py-4 hidden md:table-cell">
                    <span className="text-xs font-black text-green-600 flex items-center gap-1">
                      +{zone.growthPercentage}% <TrendingUp className="w-3 h-3" />
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${rec.color}`}>
                      {rec.text}
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

export default ZoneRanking;
