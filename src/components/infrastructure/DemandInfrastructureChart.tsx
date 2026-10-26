import React from 'react';
import { BarChart3 } from 'lucide-react';
import { InfrastructureZone } from '../../types/infrastructure';

interface DemandInfrastructureChartProps {
  zones: InfrastructureZone[];
}

const DemandInfrastructureChart: React.FC<DemandInfrastructureChartProps> = ({ zones }) => {
  const chartZones = zones.slice(0, 6); // Take top 6 for chart
  const maxVal = 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-slate-400" /> Demand vs Infrastructure
        </h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded bg-orange-400"></div> Demand
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded bg-blue-400"></div> Infrastructure
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-4 h-48 mb-4 px-2">
        {chartZones.map((zone, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group relative justify-end h-full gap-1">
            <div className="w-full flex items-end justify-center gap-1 h-full">
              {/* Demand Bar */}
              <div 
                className="w-1/2 rounded-t-sm bg-orange-400 transition-all"
                style={{ height: `${(zone.demandScore / maxVal) * 100}%` }}
              ></div>
              {/* Infrastructure Bar */}
              <div 
                className={`w-1/2 rounded-t-sm transition-all ${zone.demandScore > zone.coverageScore ? 'bg-red-400' : 'bg-blue-400'}`}
                style={{ height: `${(zone.coverageScore / maxVal) * 100}%` }}
              ></div>
            </div>
            
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
              Gap: {zone.demandScore - zone.coverageScore} points
            </div>

            <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center hidden sm:block" title={zone.name}>
              {zone.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
      
      <div className="bg-red-50 border border-red-100 p-3 rounded-xl mt-auto">
        <p className="text-xs font-bold text-red-700 text-center">Highlighted red columns indicate demand significantly exceeding infrastructure.</p>
      </div>
    </div>
  );
};

export default DemandInfrastructureChart;
