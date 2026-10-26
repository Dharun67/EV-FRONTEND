import React from 'react';
import { Activity } from 'lucide-react';
import { HourlyDemand } from '../../types/demand';

interface HourlyDemandChartProps {
  data: HourlyDemand[];
}

const HourlyDemandChart: React.FC<HourlyDemandChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-400" /> Demand by Hour
        </h3>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Peak</span>
          <p className="font-black text-red-600">7 PM (94/100)</p>
        </div>
      </div>

      <div className="flex-1 h-64 relative">
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
               <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                 <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
               </linearGradient>
             </defs>
             
             <path 
                d={`M 0 100 ${data.map((d, i) => `L ${i} ${100 - d.demand}`).join(' ')} L ${data.length - 1} 100 Z`}
                fill="url(#demandGrad)"
             />
             
             <path
               d={`M ${data.map((d, i) => `${i} ${100 - d.demand}`).join(' L ')}`}
               fill="none"
               stroke="#8b5cf6"
               strokeWidth="0.2"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             {/* Highlight Peak */}
             {data.map((d, i) => (
               <circle 
                 key={i} 
                 cx={i} 
                 cy={100 - d.demand} 
                 r={d.demand > 90 ? "0.6" : "0.3"} 
                 fill={d.demand > 90 ? "#ef4444" : "#7c3aed"} 
                 className="hover:r-[0.8] cursor-pointer transition-all" 
               />
             ))}
           </svg>
        </div>
        
        {/* X-Axis labels */}
        <div className="absolute bottom-0 left-6 right-0 flex justify-between">
          {data.map((d, i) => (
             <div key={i} className={`text-[10px] font-bold text-slate-400 transform -translate-x-1/2 ${i % 3 !== 0 ? 'hidden sm:block' : ''}`}>
               {d.hour}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyDemandChart;
