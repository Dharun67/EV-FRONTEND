import React from 'react';
import { Station } from '../../types';
import { AIRecommendationResult } from '../../types/ai';
import { Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  stations: Station[];
  results: Record<string, AIRecommendationResult>;
  primaryStationId: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ stations, results, primaryStationId }) => {
  return (
    <div className="mb-8">
      <h3 className="font-bold text-slate-900 mb-4 text-lg">Compare Charging Options</h3>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Station</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Distance</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Availability</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Power</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Traffic</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ETA Impact</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">AI Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stations.map(station => {
              const res = results[station.id];
              const isPrimary = station.id === primaryStationId;
              
              return (
                <tr key={station.id} className={isPrimary ? 'bg-blue-50/50' : 'hover:bg-slate-50'}>
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    {station.name}
                    {isPrimary && <Sparkles className="h-4 w-4 text-blue-600" />}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">{station.distance} km</td>
                  <td className="p-4 text-sm font-medium text-slate-700">{station.availableConnectors}/{station.connectors}</td>
                  <td className="p-4 text-sm font-medium text-slate-700">{station.power || 22} kW</td>
                  <td className="p-4 text-sm font-medium text-slate-700">₹{station.pricePerKwh}</td>
                  <td className="p-4 text-sm font-medium text-slate-700">{res?.trafficCondition || '-'}</td>
                  <td className="p-4 text-sm font-medium text-slate-700">+{res?.etaImpactMin || 0} min</td>
                  <td className="p-4 text-sm font-black text-slate-900">{res?.overallScore || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
