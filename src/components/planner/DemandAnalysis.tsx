import React from 'react';
import { BarChart2 } from 'lucide-react';

const DemandAnalysis: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-slate-400" /> Charging Demand
      </h3>

      <div className="flex-1 space-y-4">
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex justify-between items-center">
          <span className="font-medium text-red-900 text-sm">Current Demand</span>
          <span className="font-black text-red-700 uppercase tracking-wider">High</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center">
          <span className="font-medium text-slate-700 text-sm">Peak Hour</span>
          <span className="font-bold text-slate-900 text-sm">6:00 PM – 8:00 PM</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center">
          <span className="font-medium text-slate-700 text-sm">Peak Utilization</span>
          <span className="font-black text-slate-900 text-sm">82%</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center">
          <span className="font-medium text-slate-700 text-sm">Average Utilization</span>
          <span className="font-bold text-slate-900 text-sm">68%</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center">
          <span className="font-medium text-slate-700 text-sm">Lowest Demand</span>
          <span className="font-bold text-slate-900 text-sm">3:00 AM – 5:00 AM</span>
        </div>
      </div>
    </div>
  );
};

export default DemandAnalysis;
