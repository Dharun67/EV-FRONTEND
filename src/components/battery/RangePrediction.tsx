import React from 'react';

const RangePrediction: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6">Range Prediction</h3>
      
      <div className="flex gap-8 mb-8">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Range</p>
          <p className="text-2xl font-black text-slate-900">286 km</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Expected Range</p>
          <p className="text-2xl font-black text-slate-900">278 km</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Difference</p>
          <p className="text-2xl font-black text-amber-500">-8 km</p>
        </div>
      </div>

      <p className="text-sm font-medium text-slate-500 mb-6 italic">
        "Current traffic and driving conditions may slightly reduce the expected range."
      </p>

      {/* SVG Line Chart */}
      <div className="w-full h-48 relative border-l border-b border-slate-200 pt-4 pr-4">
        {/* Y Axis Labels */}
        <div className="absolute -left-8 top-0 text-[10px] text-slate-400 font-bold">100%</div>
        <div className="absolute -left-7 top-[25%] text-[10px] text-slate-400 font-bold">75%</div>
        <div className="absolute -left-7 top-[50%] text-[10px] text-slate-400 font-bold">50%</div>
        <div className="absolute -left-7 top-[75%] text-[10px] text-slate-400 font-bold">25%</div>
        
        {/* X Axis Labels */}
        <div className="absolute -bottom-6 left-0 text-[10px] text-slate-400 font-bold">0 km</div>
        <div className="absolute -bottom-6 left-[25%] text-[10px] text-slate-400 font-bold">75 km</div>
        <div className="absolute -bottom-6 left-[50%] text-[10px] text-slate-400 font-bold">150 km</div>
        <div className="absolute -bottom-6 left-[75%] text-[10px] text-slate-400 font-bold">225 km</div>
        <div className="absolute -bottom-6 right-0 text-[10px] text-slate-400 font-bold">286 km</div>

        {/* Grid lines */}
        <div className="absolute top-[25%] w-full border-t border-dashed border-slate-100"></div>
        <div className="absolute top-[50%] w-full border-t border-dashed border-slate-100"></div>
        <div className="absolute top-[75%] w-full border-t border-dashed border-slate-100"></div>

        <svg className="w-full h-full" preserveAspectRatio="none">
          {/* Ideal line */}
          <path d="M 0 0 L 100% 100%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5 5" />
          {/* Actual prediction line - steeper slope near the end */}
          <path d="M 0 0 Q 30% 25% 50% 50% T 100% 100%" fill="none" stroke="#3b82f6" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};

export default RangePrediction;
