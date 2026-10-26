import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { InfrastructureZone } from '../../types/infrastructure';

interface InfrastructureReadinessProps {
  zones: InfrastructureZone[];
}

const InfrastructureReadiness: React.FC<InfrastructureReadinessProps> = ({ zones }) => {
  const readinessZones = zones.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-green-500" /> Infrastructure Readiness
      </h3>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Demand</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Capacity</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Coverage</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Reliability</th>
              <th className="pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {readinessZones.map((z, idx) => {
              // Simulate reliability and readiness based on existing data
              const reliability = Math.min(100, Math.floor(z.coverageScore + 15));
              const readiness = Math.floor((z.coverageScore + reliability) / 2);
              
              return (
                <tr key={z.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4">
                    <span className="font-bold text-slate-900 text-sm">{z.name}</span>
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-700">{z.demandScore}</span>
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-700">{Math.floor((z.currentChargers / z.requiredChargers) * 100)}</span>
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-700">{z.coverageScore}</span>
                  </td>
                  <td className="py-4">
                    <span className="font-bold text-slate-700">{reliability}</span>
                  </td>
                  <td className="py-4 text-right">
                    <span className={`font-black ${
                      readiness >= 80 ? 'text-green-600' :
                      readiness >= 60 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {readiness}
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

export default InfrastructureReadiness;
