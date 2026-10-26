import React from 'react';
import { PieChart } from 'lucide-react';

interface SpendingBreakdownProps {
  data: Array<{ category: string, percentage: number, color: string }>;
}

const SpendingBreakdown: React.FC<SpendingBreakdownProps> = ({ data }) => {
  // SVG Donut calculation
  let cumulativePercent = 0;
  
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-slate-400" /> Spending Breakdown
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        
        {/* SVG Donut */}
        <div className="w-40 h-40 relative flex-shrink-0">
          <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
            {data.map(slice => {
              const startX = getCoordinatesForPercent(cumulativePercent)[0];
              const startY = getCoordinatesForPercent(cumulativePercent)[1];
              cumulativePercent += slice.percentage / 100;
              const endX = getCoordinatesForPercent(cumulativePercent)[0];
              const endY = getCoordinatesForPercent(cumulativePercent)[1];
              
              const largeArcFlag = slice.percentage > 50 ? 1 : 0;
              
              const pathData = [
                `M ${startX} ${startY}`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`
              ].join(' ');

              return (
                <path 
                  key={slice.category}
                  d={pathData} 
                  fill="none" 
                  stroke={slice.color} 
                  strokeWidth="0.4"
                  className="hover:stroke-width-[0.5] transition-all cursor-pointer"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col bg-white rounded-full m-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
            <span className="text-xl font-black text-slate-900">100%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          {data.map(slice => (
            <div key={slice.category} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }}></div>
                <span className="text-sm font-medium text-slate-700">{slice.category}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{slice.percentage}%</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SpendingBreakdown;
