import React from 'react';
import { Route } from 'lucide-react';
import { HighwayCorridor } from '../../types/infrastructure';

interface HighwayCoverageProps {
  corridors: HighwayCorridor[];
}

const HighwayCoverage: React.FC<HighwayCoverageProps> = ({ corridors }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Route className="w-5 h-5 text-slate-400" /> Highway Charging Coverage
      </h3>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Highway Corridor</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Existing Stations</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Required Stations</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Gap</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Avg Distance</th>
            </tr>
          </thead>
          <tbody>
            {corridors.map((c, idx) => (
              <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-700">{c.existingStations}</span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-900">{c.requiredStations}</span>
                </td>
                <td className="py-4">
                  <span className="font-black text-red-600">+{c.gap}</span>
                </td>
                <td className="py-4 text-right">
                  <span className="text-sm font-bold text-slate-700">{c.avgDistanceKm} km</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighwayCoverage;
