import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const InfrastructureHeader: React.FC = () => {
  const [msg, setMsg] = useState('');

  const handleRefresh = () => {
    setMsg('Analysis refreshed.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Charging Infrastructure Gap Analysis</h1>
        <p className="text-slate-500 font-medium">Identify underserved areas and prioritize charging infrastructure expansion.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {msg && (
          <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
            {msg}
          </span>
        )}

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <div className="px-3 py-1.5 font-bold text-sm text-slate-700 border-r border-slate-200">
            Region: Coimbatore
          </div>
          <select className="px-3 py-1.5 bg-transparent font-bold text-sm text-slate-700 focus:outline-none cursor-pointer border-r border-slate-200">
            <option>All Zones</option>
            <option>Urban</option>
            <option>Suburban</option>
            <option>Highway</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
          <select className="px-3 py-1.5 bg-transparent font-bold text-sm text-slate-700 focus:outline-none cursor-pointer">
            <option>30 Days</option>
            <option>90 Days</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </div>

        <button 
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-colors shadow-sm flex items-center gap-2 text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Analysis
        </button>
      </div>
    </div>
  );
};

export default InfrastructureHeader;
