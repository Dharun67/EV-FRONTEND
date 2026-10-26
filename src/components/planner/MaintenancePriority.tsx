import React from 'react';
import { AlertOctagon } from 'lucide-react';

const MaintenancePriority: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <AlertOctagon className="w-5 h-5 text-slate-400" /> Maintenance Priority
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-1">Critical</span>
          <span className="text-3xl font-black text-red-700">2</span>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
          <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block mb-1">High</span>
          <span className="text-3xl font-black text-orange-700">4</span>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-center">
          <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider block mb-1">Medium</span>
          <span className="text-3xl font-black text-yellow-700">5</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Low</span>
          <span className="text-3xl font-black text-slate-700">7</span>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePriority;
