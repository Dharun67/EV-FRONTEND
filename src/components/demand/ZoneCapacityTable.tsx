import React from 'react';
import { Map } from 'lucide-react';
import { CapacityRecommendation } from '../../types/demand';

interface ZoneCapacityTableProps {
  recommendations: CapacityRecommendation[];
}

const ZoneCapacityTable: React.FC<ZoneCapacityTableProps> = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Map className="w-5 h-5 text-slate-400" /> Zone Capacity Requirements
      </h3>

      <div className="flex-1 space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-3">
              <h4 className="font-bold text-slate-900 text-sm">{rec.zone}</h4>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                rec.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                rec.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {rec.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Current</p>
                <p className="font-black text-slate-900 text-lg">{rec.currentChargers}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Required</p>
                <p className="font-black text-slate-900 text-lg">{rec.requiredChargers}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-0.5">Gap</p>
                <p className="font-black text-red-600 text-lg">+{rec.gap}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZoneCapacityTable;
