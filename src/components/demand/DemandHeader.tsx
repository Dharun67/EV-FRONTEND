import React, { useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';

const DemandHeader: React.FC = () => {
  const [msg, setMsg] = useState('');

  const handleRefresh = () => {
    setMsg('Demand data refreshed.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">EV Charging Demand Intelligence</h1>
        <p className="text-slate-500 font-medium">Understand current demand, forecast future usage and identify high-growth charging zones.</p>
        <p className="text-xs font-bold text-slate-400 mt-2">Last updated: Just now</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {msg && (
          <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
            {msg}
          </span>
        )}

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <select className="px-3 py-1.5 bg-transparent font-bold text-sm text-slate-700 focus:outline-none cursor-pointer border-r border-slate-200">
            <option>Today</option>
            <option>7 Days</option>
            <option>30 Days</option>
            <option>90 Days</option>
          </select>
          <select className="px-3 py-1.5 bg-transparent font-bold text-sm text-slate-700 focus:outline-none cursor-pointer">
            <option>Forecast: 24 Hours</option>
            <option>Forecast: 7 Days</option>
            <option>Forecast: 30 Days</option>
          </select>
        </div>

        <button 
          onClick={handleRefresh}
          className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors shadow-sm"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DemandHeader;
