import React from 'react';
import { HardDrive } from 'lucide-react';

interface CapacityRecommendationsProps {
  data: Array<{ name: string, current: number, peak: number, recommend: string, priority: string }>;
}

const CapacityRecommendations: React.FC<CapacityRecommendationsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <HardDrive className="w-5 h-5 text-blue-600" /> Capacity Recommendations
      </h3>

      <div className="flex-1 space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-blue-900">{item.name}</h4>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                item.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {item.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              <div>
                <p className="text-[10px] font-bold text-blue-800/70 uppercase tracking-wider mb-0.5">Current</p>
                <p className="font-bold text-blue-900">{item.current} Chargers</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-800/70 uppercase tracking-wider mb-0.5">Peak Util</p>
                <p className="font-bold text-blue-900">{item.peak}%</p>
              </div>
              <div className="col-span-2 sm:col-span-1 border-t border-blue-200 sm:border-0 pt-2 sm:pt-0">
                <p className="text-[10px] font-bold text-blue-800/70 uppercase tracking-wider mb-0.5">Recommend</p>
                <p className="font-black text-blue-600">{item.recommend}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapacityRecommendations;
