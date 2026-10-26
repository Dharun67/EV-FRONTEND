import React from 'react';
import { BatteryCharging } from 'lucide-react';
import { ChargerTypeGap as ChargerTypeGapModel } from '../../types/infrastructure';

interface ChargerTypeGapProps {
  gaps: ChargerTypeGapModel[];
}

const ChargerTypeGap: React.FC<ChargerTypeGapProps> = ({ gaps }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BatteryCharging className="w-5 h-5 text-slate-400" /> Charger Type Requirements
      </h3>

      <div className="flex-1 space-y-6">
        {gaps.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-900 text-sm">{item.type}</span>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">
                Gap: {item.gap}
              </span>
            </div>
            
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>Current: {item.current}</span>
              <span>Required: {item.required}</span>
            </div>
            
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex relative">
              <div 
                className={`h-full ${item.type.includes('DC') ? 'bg-orange-500' : item.type.includes('Ultra') ? 'bg-purple-500' : 'bg-blue-500'}`} 
                style={{ width: `${(item.current / item.required) * 100}%` }}
              ></div>
              <div 
                className="h-full bg-red-400" 
                style={{ width: `${(item.gap / item.required) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargerTypeGap;
