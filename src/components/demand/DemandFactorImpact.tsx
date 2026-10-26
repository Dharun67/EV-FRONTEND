import React from 'react';
import { Activity } from 'lucide-react';
import { DemandFactor } from '../../types/demand';

interface DemandFactorImpactProps {
  factors: DemandFactor[];
}

const DemandFactorImpact: React.FC<DemandFactorImpactProps> = ({ factors }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Factor Impact
      </h3>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {factors.map((factor, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center flex flex-col justify-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{factor.name} Impact</p>
            <p className={`font-black text-lg ${factor.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {factor.impact}
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl mt-4 text-center">
        <p className="text-xs font-bold text-blue-800">Combined simulated impact: <span className="font-black">+23%</span></p>
      </div>
    </div>
  );
};

export default DemandFactorImpact;
