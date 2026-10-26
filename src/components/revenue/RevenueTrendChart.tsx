import React from 'react';
import { RevenueTrend } from '../../types/revenue';
import { AIBadge } from '../shared/AIBadge';

interface Props {
  trends: RevenueTrend[];
}

export const RevenueTrendChart: React.FC<Props> = ({ trends }) => {
  const maxRevenue = Math.max(...trends.map(t => t.revenueInr));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Revenue Trend & Forecast</h2>
        <AIBadge type="simulated" />
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-2 px-2 relative min-h-[200px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs font-bold text-slate-400">
          <span>₹{(maxRevenue/100000).toFixed(0)}L</span>
          <span>₹{(maxRevenue/200000).toFixed(0)}L</span>
          <span>0</span>
        </div>

        {/* Chart Bars */}
        <div className="flex-1 flex items-end justify-between gap-2 pl-12">
          {trends.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 group">
              <div className="relative w-full flex justify-center h-full items-end">
                <div 
                  className={`w-full max-w-[40px] rounded-t-sm transition-all duration-300 ${item.isForecast ? 'bg-purple-200 border-t-2 border-purple-500 border-dashed' : 'bg-emerald-500 group-hover:bg-emerald-400'}`}
                  style={{ height: `${(item.revenueInr / maxRevenue) * 100}%` }}
                ></div>
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                  ₹{(item.revenueInr/100000).toFixed(1)} L {item.isForecast ? '(Forecast)' : ''}
                </div>
              </div>
              <span className={`text-[10px] font-bold mt-2 ${item.isForecast ? 'text-purple-500' : 'text-slate-500'}`}>{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
