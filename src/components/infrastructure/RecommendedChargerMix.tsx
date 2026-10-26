import React from 'react';
import { Settings2 } from 'lucide-react';
import { ExpansionRecommendation } from '../../types/infrastructure';

interface RecommendedChargerMixProps {
  recommendations: ExpansionRecommendation[];
}

const RecommendedChargerMix: React.FC<RecommendedChargerMixProps> = ({ recommendations }) => {
  // Calculate totals
  const totals = recommendations.reduce((acc, rec) => ({
    dcFast: acc.dcFast + rec.dcFast,
    ac: acc.ac + rec.ac,
    ultraFast: acc.ultraFast + rec.ultraFast,
    total: acc.total + rec.recommendedChargers
  }), { dcFast: 0, ac: 0, ultraFast: 0, total: 0 });

  // Get top 3 zones
  const topZones = [...recommendations].sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-slate-400" /> Recommended Charger Mix
      </h3>

      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="col-span-1 text-center bg-slate-50 p-2 rounded-lg border border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">DC Fast</p>
            <p className="font-black text-orange-600 text-lg">{totals.dcFast}</p>
          </div>
          <div className="col-span-1 text-center bg-slate-50 p-2 rounded-lg border border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">AC</p>
            <p className="font-black text-blue-600 text-lg">{totals.ac}</p>
          </div>
          <div className="col-span-1 text-center bg-slate-50 p-2 rounded-lg border border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ultra</p>
            <p className="font-black text-purple-600 text-lg">{totals.ultraFast}</p>
          </div>
          <div className="col-span-1 text-center bg-blue-600 p-2 rounded-lg border border-blue-700 text-slate-900">
            <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-1">Total</p>
            <p className="font-black text-lg">{totals.total}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Expansion Zones</p>
          
          {topZones.map(zone => (
            <div key={zone.zoneId} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0 last:pb-0">
              <span className="font-bold text-sm text-slate-900">{zone.zoneName}</span>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">{zone.dcFast} DC</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">{zone.ac} AC</span>
                {zone.ultraFast > 0 && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">{zone.ultraFast} Ultra</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedChargerMix;
