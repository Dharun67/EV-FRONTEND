import React from 'react';
import { BarChart3 } from 'lucide-react';

interface MonthlySpendingProps {
  data: Array<{ month: string, spend: number }>;
}

const MonthlySpending: React.FC<MonthlySpendingProps> = ({ data }) => {
  const maxSpend = Math.max(...data.map(d => d.spend));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-slate-400" /> Monthly Spending
      </h3>

      <div className="h-48 flex items-end justify-between gap-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group relative justify-end h-full">
            
            <div className="absolute bottom-full mb-2 bg-slate-900 text-white p-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              ₹{item.spend.toLocaleString()}
            </div>

            <div 
              className="w-full max-w-[40px] bg-blue-600 rounded-t-sm opacity-60 group-hover:opacity-100 transition-all"
              style={{ height: `${(item.spend / maxSpend) * 100}%` }}
            ></div>
            <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center">
              {item.month.substring(0, 3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySpending;
