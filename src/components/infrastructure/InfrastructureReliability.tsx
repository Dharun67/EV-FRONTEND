import React from 'react';
import { ShieldCheck } from 'lucide-react';

const InfrastructureReliability: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
        <ShieldCheck className="w-5 h-5 text-green-500" /> Infrastructure Reliability
      </h3>

      <div className="flex-1 grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Network Uptime</p>
          <p className="font-black text-slate-900 text-2xl">96.8%</p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Station Availability</p>
          <p className="font-black text-slate-900 text-2xl">94.2%</p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Charger Fault Rate</p>
          <p className="font-black text-slate-900 text-2xl">2.4%</p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Repair Time</p>
          <p className="font-black text-slate-900 text-2xl">3.8 <span className="text-sm">hrs</span></p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-100 p-4 rounded-xl mt-4 flex justify-between items-center relative z-10">
        <span className="font-bold text-green-800">Reliability Score</span>
        <span className="font-black text-green-600 text-xl">93 / 100</span>
      </div>
    </div>
  );
};

export default InfrastructureReliability;
