import React from 'react';
import { Cloud, MapPin } from 'lucide-react';
import { DemandFactor } from '../../types/demand';

interface DemandFactorsProps {
  factors: DemandFactor[];
}

const DemandFactors: React.FC<DemandFactorsProps> = ({ factors }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Cloud className="w-5 h-5 text-slate-400" /> Demand Influencing Factors
      </h3>

      <div className="flex-1 space-y-4">
        {factors.map((factor, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-700 text-sm">{factor.name}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${
              factor.status === 'High' ? 'bg-orange-100 text-orange-700' :
              factor.status === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-slate-100 text-slate-600'
            }`}>
              {factor.status}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-4">
        These are simulated demand inputs for demonstration.
      </p>
    </div>
  );
};

export default DemandFactors;
