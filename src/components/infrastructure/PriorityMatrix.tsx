import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { InfrastructureZone } from '../../types/infrastructure';

interface PriorityMatrixProps {
  zones: InfrastructureZone[];
}

const PriorityMatrix: React.FC<PriorityMatrixProps> = ({ zones }) => {
  const [selectedPoint, setSelectedPoint] = useState<InfrastructureZone | null>(null);

  // Normalize data for chart 0-100 scale
  // X: Infrastructure Gap (max ~15) -> scale to 100
  // Y: Demand (0-100) -> scale to 100
  
  const getX = (gap: number) => Math.min(100, Math.max(0, (gap / 12) * 100));
  const getY = (demand: number) => Math.min(100, Math.max(0, demand));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-slate-400" /> Expansion Priority Matrix
      </h3>

      <div className="flex-1 relative mb-6 ml-6 h-[300px]">
        {/* Quadrants */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="border-r border-b border-slate-200 bg-slate-50/50 flex items-start justify-start p-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monitor</span>
          </div>
          <div className="border-b border-slate-200 bg-orange-50/30 flex items-start justify-end p-2">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">High Priority</span>
          </div>
          <div className="border-r border-slate-200 bg-white flex items-end justify-start p-2">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Low Priority</span>
          </div>
          <div className="bg-red-50/30 flex items-end justify-end p-2">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Critical Expansion</span>
          </div>
        </div>

        {/* Axes Labels */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
          Demand Score
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Infrastructure Gap
        </div>

        {/* Points */}
        {zones.map(zone => {
          const cx = getX(zone.capacityGap);
          const cy = 100 - getY(zone.demandScore);
          
          return (
            <div 
              key={zone.id}
              className="absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform"
              style={{ 
                left: `calc(${cx}% - 8px)`, 
                top: `calc(${cy}% - 8px)`,
                backgroundColor: zone.priority === 'Critical' ? '#ef4444' : 
                                 zone.priority === 'High' ? '#f97316' : 
                                 zone.priority === 'Medium' ? '#eab308' : '#3b82f6'
              }}
              onClick={() => setSelectedPoint(zone)}
            />
          );
        })}
        
        {/* Selected Point Tooltip */}
        {selectedPoint && (
          <div 
            className="absolute bg-slate-900 text-white p-3 rounded-xl text-xs shadow-xl z-10 w-48 pointer-events-none"
            style={{ 
              left: `${Math.min(getX(selectedPoint.capacityGap), 60)}%`, 
              top: `${Math.max(100 - getY(selectedPoint.demandScore) - 10, 10)}%` 
            }}
          >
            <p className="font-bold mb-1">{selectedPoint.name}</p>
            <div className="flex justify-between text-slate-300">
              <span>Demand: {selectedPoint.demandScore}</span>
              <span>Gap: {selectedPoint.capacityGap}</span>
            </div>
            <div className="mt-1 pt-1 border-t border-slate-700 font-bold text-red-400">
              {selectedPoint.priority} Priority
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityMatrix;
