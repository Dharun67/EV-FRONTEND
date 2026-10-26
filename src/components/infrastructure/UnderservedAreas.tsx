import React from 'react';
import { AlertCircle } from 'lucide-react';
import { InfrastructureZone } from '../../types/infrastructure';

interface UnderservedAreasProps {
  zones: InfrastructureZone[];
}

const UnderservedAreas: React.FC<UnderservedAreasProps> = ({ zones }) => {
  // Find critical/high priority zones with low coverage
  const underserved = zones.filter(z => z.priority === 'Critical' || z.priority === 'High').slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-500" /> Underserved Areas
      </h3>

      <div className="flex-1 space-y-4">
        {underserved.map((zone, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-3">
              <h4 className="font-bold text-slate-900 text-sm">{zone.name}</h4>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                zone.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {zone.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Coverage</p>
                <p className="font-black text-slate-900">{zone.coverageScore}%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Demand</p>
                <p className={`font-black ${zone.demandScore > 90 ? 'text-red-600' : 'text-orange-600'}`}>
                  {zone.demandScore > 90 ? 'Very High' : 'High'}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Infrastructure Gap</p>
                <p className="font-black text-red-600">{zone.capacityGap} chargers</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnderservedAreas;
