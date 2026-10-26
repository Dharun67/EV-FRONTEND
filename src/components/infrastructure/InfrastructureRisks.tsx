import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { InfrastructureRisk } from '../../types/infrastructure';

interface InfrastructureRisksProps {
  risks: InfrastructureRisk[];
}

const InfrastructureRisks: React.FC<InfrastructureRisksProps> = ({ risks }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <AlertOctagon className="w-5 h-5 text-red-500" /> Infrastructure Risks
      </h3>

      <div className="flex-1 space-y-4">
        {risks.map(risk => (
          <div key={risk.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-slate-900 text-sm">{risk.type}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                risk.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                risk.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {risk.priority}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-600 leading-snug">{risk.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfrastructureRisks;
