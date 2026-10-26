import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { DemandZone } from '../../types/demand';

interface LowDemandZonesProps {
  zones: DemandZone[];
}

const LowDemandZones: React.FC<LowDemandZonesProps> = ({ zones }) => {
  // Sort ascending by demand score and take bottom 3
  const lowZones = [...zones].sort((a, b) => a.demandScore - b.demandScore).slice(0, 3);

  const getRecommendation = (util: number) => {
    if (util < 30) return 'No Expansion';
    if (util < 35) return 'Monitor';
    return 'Optimize Utilization';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <ArrowDownRight className="w-5 h-5 text-blue-500" /> Low Demand Zones
      </h3>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Demand</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Utilization</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Available Chargers</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {lowZones.map(zone => (
              <tr key={zone.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <span className="font-bold text-slate-900 text-sm">{zone.name}</span>
                </td>
                <td className="py-4">
                  <span className="font-black text-blue-600">{zone.demandScore}</span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-700">{zone.utilization}%</span>
                </td>
                <td className="py-4 hidden sm:table-cell">
                  <span className="font-bold text-slate-900">{zone.availableChargers}</span>
                </td>
                <td className="py-4 text-right">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">
                    {getRecommendation(zone.utilization)}
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

export default LowDemandZones;
