import React from 'react';
import { Zap } from 'lucide-react';
import { PowerCapacity } from '../../types/infrastructure';

interface PowerCapacityGapProps {
  capacity: PowerCapacity;
}

const PowerCapacityGap: React.FC<PowerCapacityGapProps> = ({ capacity }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-500" /> Power Capacity Analysis
      </h3>

      <div className="flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Capacity</p>
            <p className="font-black text-slate-900 text-2xl">{capacity.currentMW} MW</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Required Capacity</p>
            <p className="font-black text-slate-900 text-2xl">{capacity.requiredMW} MW</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex justify-between items-center mb-6">
          <span className="font-bold text-red-800">Capacity Gap</span>
          <span className="font-black text-red-600 text-xl">{capacity.gapMW} MW</span>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Projected 12-Month Requirement</p>
          <div className="flex items-end gap-2 mb-2">
            <span className="font-black text-3xl text-slate-900 leading-none">{capacity.future12MoMW}</span>
            <span className="font-bold text-slate-500 pb-1">MW</span>
          </div>
          
          <div className="h-6 bg-slate-100 rounded-lg overflow-hidden flex relative mt-3">
             <div className="h-full bg-blue-600 flex items-center px-2 text-[10px] font-bold text-slate-900" style={{ width: `${(capacity.currentMW / capacity.future12MoMW) * 100}%` }}>Current</div>
             <div className="h-full bg-orange-400 flex items-center px-2 text-[10px] font-bold text-slate-900" style={{ width: `${(capacity.gapMW / capacity.future12MoMW) * 100}%` }}>Gap</div>
             <div className="h-full bg-slate-300 flex items-center px-2 text-[10px] font-bold text-slate-600" style={{ width: `${((capacity.future12MoMW - capacity.requiredMW) / capacity.future12MoMW) * 100}%` }}>Future</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerCapacityGap;
