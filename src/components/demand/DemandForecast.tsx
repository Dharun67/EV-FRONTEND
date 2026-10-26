import React from 'react';
import { LineChart } from 'lucide-react';
import { DemandForecast as ForecastType } from '../../types/demand';

interface DemandForecastProps {
  data: ForecastType[];
}

const DemandForecast: React.FC<DemandForecastProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-slate-400" /> 7-Day Demand Forecast
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-slate-300"></div> Actual
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div> Forecast
          </div>
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
             
             {/* Actual Line */}
             <path
               d={`M ${data.filter(d => d.actual !== undefined).map((d, i) => `${i} ${100 - d.actual!}`).join(' L ')}`}
               fill="none"
               stroke="#94a3b8"
               strokeWidth="0.3"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             {/* Forecast Line */}
             <path
               d={`M ${data.map((d, i) => `${i} ${100 - d.forecast}`).join(' L ')}`}
               fill="none"
               stroke="#3b82f6"
               strokeWidth="0.4"
               strokeDasharray="1, 1"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             {/* Points */}
             {data.map((d, i) => (
               <React.Fragment key={i}>
                 {d.actual !== undefined && (
                   <circle cx={i} cy={100 - d.actual} r="0.6" fill="#64748b" className="hover:r-[1.2] cursor-pointer transition-all" />
                 )}
                 <circle cx={i} cy={100 - d.forecast} r="0.8" fill="#2563eb" className="hover:r-[1.5] cursor-pointer transition-all" />
               </React.Fragment>
             ))}
           </svg>
        </div>
        
        {/* X-Axis labels */}
        <div className="absolute bottom-0 left-6 right-0 flex justify-between">
          {data.map((d, i) => (
             <div key={i} className={`text-[10px] font-bold text-slate-400 transform -translate-x-1/2`}>
               {d.date}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemandForecast;
