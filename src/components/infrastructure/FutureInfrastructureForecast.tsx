import React from 'react';
import { TrendingUp } from 'lucide-react';

const FutureInfrastructureForecast: React.FC = () => {
  const data = [
    { label: 'Current', val: 286 },
    { label: '6 Mo', val: 318 },
    { label: '12 Mo', val: 342 },
    { label: '18 Mo', val: 388 },
  ];

  const maxVal = 400;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> 12-Month Infrastructure Forecast
        </h3>
      </div>

      <div className="flex-1 h-48 relative">
        {/* Y-Axis guidelines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6">
          {[400, 300, 200, 100, 0].map(val => (
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
               <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                 <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
               </linearGradient>
             </defs>
             
             <path 
                d={`M 0 100 ${data.map((d, i) => `L ${i} ${100 - (d.val / maxVal * 100)}`).join(' ')} L ${data.length - 1} 100 Z`}
                fill="url(#forecastGrad)"
             />
             
             <path
               d={`M ${data.map((d, i) => `${i} ${100 - (d.val / maxVal * 100)}`).join(' L ')}`}
               fill="none"
               stroke="#3b82f6"
               strokeWidth="0.5"
               strokeDasharray="1,1"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             {data.map((d, i) => (
               <g key={i}>
                 <circle cx={i} cy={100 - (d.val / maxVal * 100)} r="0.8" fill="#2563eb" className="hover:r-[1.5] cursor-pointer transition-all" />
                 <text x={i} y={100 - (d.val / maxVal * 100) - 5} fontSize="4" fill="#1e293b" fontWeight="bold" textAnchor="middle">{d.val}</text>
               </g>
             ))}
           </svg>
        </div>
        
        {/* X-Axis labels */}
        <div className="absolute bottom-0 left-6 right-0 flex justify-between">
          {data.map((d, i) => (
             <div key={i} className={`text-[10px] font-bold text-slate-400 transform -translate-x-1/2 ${i === 2 ? 'text-blue-600' : ''}`}>
               {d.label}
             </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl mt-4">
        <p className="text-xs font-bold text-blue-800 text-center">56 additional chargers required within 12 months to meet demand.</p>
      </div>
    </div>
  );
};

export default FutureInfrastructureForecast;
