import React from 'react';
import { IndianRupee } from 'lucide-react';

interface RevenueAnalyticsProps {
  data: Array<{ label: string, value: number }>;
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-green-600" /> Revenue Performance
        </h3>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today</span>
          <p className="text-xl font-black text-green-600">₹86,420</p>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 h-48 mb-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group relative justify-end h-full">
            <div className="absolute bottom-full mb-2 bg-slate-900 text-white p-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              ₹{item.value.toLocaleString()}
            </div>
            <div 
              className={`w-full max-w-[40px] rounded-t-sm transition-all ${idx === 0 ? 'bg-green-500' : 'bg-green-200 group-hover:bg-green-300'}`}
              style={{ height: `${(item.value / maxVal) * 100}%` }}
            ></div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center hidden sm:block">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">This Week</p>
          <p className="font-bold text-slate-900">₹5.42 L</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Session</p>
          <p className="font-bold text-slate-900">₹142</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
