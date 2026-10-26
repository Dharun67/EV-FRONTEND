import React from 'react';
import { Activity } from 'lucide-react';

interface ChargerUtilizationProps {
  data: Array<{ time: string, util: number }>;
}

const ChargerUtilization: React.FC<ChargerUtilizationProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Charger Utilization (Last 24h)
      </h3>

      <div className="h-64 relative">
        {/* Y-Axis guidelines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6">
          {[100, 75, 50, 25, 0].map(val => (
            <div key={val} className="w-full border-t border-dashed border-slate-200 flex relative">
              <span className="absolute -left-1 -top-3 text-[10px] font-bold text-slate-400 bg-white pr-2">
                {val}%
              </span>
            </div>
          ))}
        </div>

        {/* SVG Line Chart */}
        <div className="absolute inset-0 ml-8 pb-6 pt-2 h-[calc(100%-1.5rem)]">
           <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${data.length - 1} 100`}>
             <defs>
               <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                 <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
               </linearGradient>
             </defs>
             
             <path 
                d={`M 0 100 ${data.map((d, i) => `L ${i} ${100 - d.util}`).join(' ')} L ${data.length - 1} 100 Z`}
                fill="url(#lineGrad)"
             />
             
             <path
               d={`M ${data.map((d, i) => `${i} ${100 - d.util}`).join(' L ')}`}
               fill="none"
               stroke="#3b82f6"
               strokeWidth="0.15"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             {data.map((d, i) => (
               <circle key={i} cx={i} cy={100 - d.util} r="0.4" fill="#1d4ed8" className="hover:r-[0.8] cursor-pointer transition-all" />
             ))}
           </svg>
        </div>
        
        {/* X-Axis labels */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between">
          {data.map((d, i) => (
             <div key={i} className={`text-[10px] font-bold text-slate-400 transform -translate-x-1/2 ${i % 2 !== 0 ? 'hidden sm:block' : ''}`}>
               {d.time}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChargerUtilization;
