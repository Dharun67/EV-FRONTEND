import React from 'react';
import { Filter, Search } from 'lucide-react';

const InfrastructureFilters: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search zone or corridor..." 
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-gridwise-blue focus:ring-1 focus:ring-gridwise-blue transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs whitespace-nowrap">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>
        
        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer">
          <option>Zone Type: All</option>
          <option>Urban</option>
          <option>Suburban</option>
          <option>Highway</option>
          <option>Residential</option>
          <option>Commercial</option>
        </select>
        
        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer">
          <option>Priority: All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer">
          <option>Infrastructure Status: All</option>
          <option>Deficit</option>
          <option>Balanced</option>
          <option>Surplus</option>
        </select>
      </div>
    </div>
  );
};

export default InfrastructureFilters;
