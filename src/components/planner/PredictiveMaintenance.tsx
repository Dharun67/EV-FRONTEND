import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const PredictiveMaintenance: React.FC = () => {
  const [msg, setMsg] = useState('');

  const handleCreateTask = () => {
    setMsg('Maintenance task created.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-md mb-6 relative overflow-hidden text-slate-900">
      {msg && (
        <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-xs font-bold text-center py-2 animate-in slide-in-from-top-2 z-20 flex items-center justify-center gap-2">
          <CheckCircle className="w-3 h-3" /> {msg}
        </div>
      )}

      {/* Decorative */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-600 rounded-full opacity-20 blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-purple-400" /> Predictive Maintenance
          </h3>
          <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-purple-700/50 shadow-sm hidden sm:block">
            AI INSIGHT
          </span>
        </div>
        
        <p className="text-slate-300 font-medium leading-relaxed mb-4 text-sm sm:text-base">
          "CCS-104 shows increased temperature and usage patterns. Schedule inspection within the next 48 hours."
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Risk</p>
            <p className="font-black text-orange-400">72%</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Priority</p>
            <p className="font-black text-red-400">High</p>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-bold text-slate-200">Recommended Action: Inspect connector cooling system.</p>
          </div>
          <button 
            onClick={handleCreateTask}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-600 text-white rounded-lg font-bold text-xs shadow-sm transition-colors flex-shrink-0"
          >
            Create Maintenance Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictiveMaintenance;
