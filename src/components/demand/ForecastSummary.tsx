import React from 'react';
import { Calendar, TrendingUp, Zap, Target } from 'lucide-react';

const ForecastSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-slate-400" /> Forecast Summary
      </h3>

      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-slate-500">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Expected Peak</span>
            </div>
            <p className="font-black text-slate-900 text-lg">Saturday</p>
            <p className="text-xs font-bold text-red-600">Demand: 94 / 100</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-slate-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Growth</span>
            </div>
            <p className="font-black text-slate-900 text-lg">+18.4%</p>
            <p className="text-xs font-bold text-green-600">vs Last Week</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-sm mb-0.5">Additional Sessions</p>
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Next 7 Days</p>
            </div>
          </div>
          <span className="font-black text-blue-700 text-xl">+1,284</span>
        </div>

        <div className="flex justify-between items-center text-xs mt-auto pt-2">
          <span className="font-bold text-slate-400">Forecast Confidence:</span>
          <span className="font-black text-slate-700">87%</span>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Predictive Forecast</p>
      </div>
    </div>
  );
};

export default ForecastSummary;
