import React from 'react';
import { IndianRupee } from 'lucide-react';

const InvestmentSimulation: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
        <IndianRupee className="w-5 h-5 text-green-500" /> Expansion Investment Simulation
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Chargers</p>
          <p className="font-black text-slate-900 text-2xl">56</p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Demand</p>
          <p className="font-black text-slate-900 text-2xl">2.8 GWh</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-100 p-5 rounded-xl mb-4 relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold text-green-800 uppercase tracking-wider mb-1">Est. Infrastructure Cost</p>
            <p className="font-black text-green-700 text-3xl">₹8.4 Cr</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-green-800 uppercase tracking-wider mb-1">Est. Annual Revenue</p>
            <p className="font-black text-green-600 text-xl">₹5.6 Cr</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-2 relative z-10">
        <p className="text-sm font-bold text-slate-700">Estimated Payback Period</p>
        <p className="font-black text-slate-900 text-lg">3.2 Years</p>
      </div>

      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-auto pt-4 relative z-10">
        Prototype estimation only
      </p>
    </div>
  );
};

export default InvestmentSimulation;
