import React from 'react';
import { Compass } from 'lucide-react';
import { ChargingDesert } from '../../types/infrastructure';

interface ChargingDesertsProps {
  deserts: ChargingDesert[];
}

const ChargingDeserts: React.FC<ChargingDesertsProps> = ({ deserts }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Compass className="w-5 h-5 text-orange-500" /> Charging Desert Zones
      </h3>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Distance to Nearest Charger</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Demand</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">EV Growth</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Priority</th>
            </tr>
          </thead>
          <tbody>
            {deserts.map((d, idx) => (
              <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <span className="font-bold text-slate-900 text-sm">{d.zoneName}</span>
                </td>
                <td className="py-4">
                  <span className="font-black text-red-600">{d.distanceToNearestKm} km</span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-slate-700">{d.demandLevel}</span>
                </td>
                <td className="py-4">
                  <span className="font-bold text-green-600">+{d.growthPercentage}%</span>
                </td>
                <td className="py-4 text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    d.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    d.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    d.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {d.priority}
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

export default ChargingDeserts;
