import React from 'react';
import { Layers } from 'lucide-react';
import { InfrastructureZone } from '../../types/infrastructure';

interface ZoneGapTableProps {
  zones: InfrastructureZone[];
}

const ZoneGapTable: React.FC<ZoneGapTableProps> = ({ zones }) => {
  // Sort by capacity gap descending
  const sortedZones = [...zones].sort((a, b) => b.capacityGap - a.capacityGap);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-slate-400" /> Charging Infrastructure Gap by Zone
      </h3>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Chargers</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Required Chargers</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Gap</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Utilization</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Priority</th>
            </tr>
          </thead>
          <tbody>
            {sortedZones.map((zone, idx) => (
              <tr key={zone.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    idx < 3 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-900">{zone.name}</span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-700">{zone.currentChargers}</span>
                </td>
                <td className="py-4 hidden sm:table-cell">
                  <span className="font-bold text-slate-900">{zone.requiredChargers}</span>
                </td>
                <td className="py-4">
                  <span className={`font-black ${zone.capacityGap > 5 ? 'text-red-600' : 'text-orange-600'}`}>
                    +{zone.capacityGap}
                  </span>
                </td>
                <td className="py-4 hidden md:table-cell">
                  <span className="font-bold text-slate-700">{zone.utilization}%</span>
                </td>
                <td className="py-4 text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    zone.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    zone.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    zone.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {zone.priority}
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

export default ZoneGapTable;
