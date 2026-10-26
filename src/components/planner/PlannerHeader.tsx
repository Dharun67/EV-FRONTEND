import React, { useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';

const PlannerHeader: React.FC = () => {
  const [msg, setMsg] = useState('');

  const handleExport = () => {
    setMsg('Report prepared successfully.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Charging Network Overview</h1>
        <p className="text-slate-500 font-medium">Monitor charging infrastructure, utilization and operational performance.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {msg && (
          <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
            {msg}
          </span>
        )}
        
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gridwise-blue cursor-pointer">
          <option>Today</option>
          <option>7 Days</option>
          <option>30 Days</option>
          <option>90 Days</option>
        </select>

        <button className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors shadow-sm">
          <RefreshCw className="w-5 h-5" />
        </button>

        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-900 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>
    </div>
  );
};

export default PlannerHeader;
