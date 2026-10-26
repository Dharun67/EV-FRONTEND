import React from 'react';
import { PieChart } from 'lucide-react';

const ChargerStatus: React.FC = () => {
  const data = [
    { label: 'Available', value: 172, color: '#10b981', bg: 'bg-green-500' },
    { label: 'Charging', value: 63, color: '#3b82f6', bg: 'bg-blue-500' },
    { label: 'Reserved', value: 21, color: '#8b5cf6', bg: 'bg-purple-500' },
    { label: 'Fault', value: 12, color: '#ef4444', bg: 'bg-red-500' },
    { label: 'Maintenance', value: 18, color: '#f59e0b', bg: 'bg-orange-500' },
  ];
  
  const total = 286;

  // SVG Donut calculation
  let cumulativePercent = 0;
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col h-full">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-slate-400" /> Charger Status
      </h3>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-48 h-48 relative">
          <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
            {data.map(slice => {
              const percentage = slice.value / total;
              const startX = getCoordinatesForPercent(cumulativePercent)[0];
              const startY = getCoordinatesForPercent(cumulativePercent)[1];
              cumulativePercent += percentage;
              const endX = getCoordinatesForPercent(cumulativePercent)[0];
              const endY = getCoordinatesForPercent(cumulativePercent)[1];
              
              const largeArcFlag = percentage > 0.5 ? 1 : 0;
              
              const pathData = [
                `M ${startX} ${startY}`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`
              ].join(' ');

              return (
                <path 
                  key={slice.label}
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
            <span className="text-3xl font-black text-slate-900">{total}</span>
          </div>
        </div>

        <div className="w-full space-y-2">
          {data.map(slice => (
            <div key={slice.label} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${slice.bg}`}></div>
                <span className="font-medium text-slate-600">{slice.label}</span>
              </div>
              <span className="font-bold text-slate-900">{slice.value} <span className="text-slate-400 font-normal ml-1">({Math.round((slice.value/total)*100)}%)</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChargerStatus;
