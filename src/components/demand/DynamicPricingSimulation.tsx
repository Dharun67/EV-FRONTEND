import React from 'react';
import { IndianRupee } from 'lucide-react';

const DynamicPricingSimulation: React.FC = () => {
  const levels = [
    { label: 'Low Demand', price: 12 },
    { label: 'Moderate', price: 14 },
    { label: 'High', price: 17 },
    { label: 'Very High', price: 20 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <IndianRupee className="w-5 h-5 text-green-600" /> Demand-Based Pricing Simulation
      </h3>

      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {levels.map(level => (
            <div key={level.label} className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{level.label}</span>
              <span className="font-black text-slate-900">₹{level.price}/kWh</span>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex justify-between items-center mt-4">
          <div>
            <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-0.5">Potential Revenue Increase</p>
            <p className="font-black text-green-700 text-xl">+11.8%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Current Average</p>
            <p className="font-bold text-slate-900">₹16.40/kWh</p>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right mt-4">This is only a simulation</p>
    </div>
  );
};

export default DynamicPricingSimulation;
