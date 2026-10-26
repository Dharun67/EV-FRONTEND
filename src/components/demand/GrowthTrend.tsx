import React from 'react';
import { TrendingUp } from 'lucide-react';

interface GrowthTrendProps {
  data: Array<{ month: string, value: number }>;
}

const GrowthTrend: React.FC<GrowthTrendProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" /> Charging Demand Growth
        </h3>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Growth</span>
          <p className="font-black text-green-600">+35.3%</p>
        </div>
      </div>

      <div className="flex-1 h-48 relative">
        {/* Y-Axis guidelines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6">
          {[100, 75, 50, 25, 0].map(val => (
            <div key={val} className="w-full border-t border-dashed border-slate-200 flex relative">
              <span className="absolute -left-1 -top-3 text-[10px] font-bold text-slate-400 bg-white pr-2">
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* SVG Line Chart */}
        <div className="absolute inset-0 ml-6 pb-6 pt-2 h-[calc(100%-1.5rem)]">
           <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${data.length - 1} 100`}>
             <defs>
               <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                 <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
               </linearGradient>
             </defs>
             
             <path 
                d={`M 0 100 ${data.map((d, i) => `L ${i} ${100 - d.value}`).join(' ')} L ${data.length - 1} 100 Z`}
                fill="url(#growthGrad)"
             />
             
             <path
               d={`M ${data.map((d, i) => `${i} ${100 - d.value}`).join(' L ')}`}
               fill="none"
               stroke="#10b981"
               strokeWidth="0.4"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             {data.map((d, i) => (
               <circle 
                 key={i} 
                 cx={i} 
                 cy={100 - d.value} 
                 r="0.8" 
                 fill="#059669" 
                 className="hover:r-[1.5] cursor-pointer transition-all" 
               />
             ))}
           </svg>
        </div>
        
        {/* X-Axis labels */}
        <div className="absolute bottom-0 left-6 right-0 flex justify-between">
          {data.map((d, i) => (
             <div key={i} className={`text-[10px] font-bold text-slate-400 transform -translate-x-1/2 ${i === data.length - 1 ? 'text-blue-600' : ''}`}>
               {d.month}{i === data.length - 1 ? ' (Forecast)' : ''}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthTrend;
