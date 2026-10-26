import React from 'react';
// Mock import removed
const mockDurations: any[] = [];
import { Timer } from 'lucide-react';

interface DurationSelectorProps {
  selectedDuration: number;
  onSelect: (val: number) => void;
  powerKw: number;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ selectedDuration, onSelect, powerKw }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Timer className="w-5 h-5 text-slate-400" /> Charging Duration
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {mockDurations.map(dur => {
          const isSelected = selectedDuration === dur;
          return (
            <button
              key={dur}
              onClick={() => onSelect(dur)}
              className={`py-2.5 px-5 rounded-xl text-sm font-bold border transition-all shadow-sm
                ${isSelected 
                  ? 'bg-slate-900 border-slate-900 text-slate-900' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
            >
              {dur} min
            </button>
          )
        })}
      </div>

      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between max-w-sm">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Estimated Energy</p>
          <p className="font-bold text-slate-900 text-lg">{selectedDuration} min <span className="text-slate-400 mx-1 font-normal">≈</span> {Math.round((powerKw * selectedDuration) / 60)} kWh</p>
        </div>
      </div>
    </div>
  );
};

export default DurationSelector;
