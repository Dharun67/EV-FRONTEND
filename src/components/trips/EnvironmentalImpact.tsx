import React from 'react';
import { Leaf } from 'lucide-react';

const EnvironmentalImpact: React.FC = () => {
  return (
    <div className="bg-green-50 rounded-2xl border border-green-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-green-900 mb-6 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-green-600" /> Environmental Impact
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">CO₂ Saved</p>
          <p className="text-2xl font-black text-green-600">392 kg</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Equivalent Trees</p>
          <p className="text-2xl font-black text-green-600">18</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fuel Vehicles Replaced</p>
          <p className="text-2xl font-black text-green-600">42 trips</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Fuel Saved</p>
          <p className="text-2xl font-black text-green-600">214 L</p>
        </div>
      </div>
      
      <p className="text-xs font-medium text-green-800 text-center">
        * Your EV trips have helped reduce estimated emissions compared with an equivalent petrol vehicle. Values are simulated estimates.
      </p>
    </div>
  );
};

export default EnvironmentalImpact;
