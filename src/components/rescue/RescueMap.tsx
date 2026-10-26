import React from 'react';
import { RescueUnit } from '../../types/rescue';
import { Navigation, Truck, Zap } from 'lucide-react';

interface RescueMapProps {
  rescueUnits: RescueUnit[];
  status: string;
}

const RescueMap: React.FC<RescueMapProps> = ({ rescueUnits, status }) => {
  return (
    <div className="bg-[#1a1f2e] rounded-2xl overflow-hidden h-[400px] mb-6 relative">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[30%] left-0 w-full h-2 bg-slate-400 transform -rotate-12"></div>
        <div className="absolute top-[60%] left-0 w-full h-3 bg-slate-400 transform rotate-6"></div>
        <div className="absolute top-0 left-[40%] w-2 h-full bg-slate-400 transform -rotate-6"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', 
        backgroundSize: '20px 20px',
        opacity: 0.3 
      }}></div>

      {/* Current Location (Vehicle) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        {status === 'NORMAL' || status === 'REQUEST ASSISTANCE' ? (
          <>
            <div className="w-12 h-12 bg-red-500/20 rounded-full animate-ping absolute"></div>
            <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative z-10">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="mt-2 bg-slate-900/80 text-slate-900 text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              Your Vehicle
            </div>
          </>
        ) : (
          <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg relative z-10"></div>
        )}
      </div>

      {/* Rescue Units */}
      {status === 'NORMAL' || status === 'REQUEST ASSISTANCE' ? (
        rescueUnits.map((unit, idx) => {
          const top = `${20 + (idx * 15)}%`;
          const left = `${15 + (idx * 25)}%`;
          return (
            <div key={unit.id} className="absolute z-10 flex flex-col items-center" style={{ top, left }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-slate-900 ${
                unit.status === 'Available' ? 'bg-green-500 text-white' : 'bg-slate-500 text-slate-900'
              }`}>
                <Truck className="w-4 h-4" />
              </div>
              <div className="mt-1 bg-slate-900/80 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
                {unit.name}
              </div>
            </div>
          )
        })
      ) : (
        // Route from Rescue to Vehicle (Mock Path)
        <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] border-l-4 border-b-4 border-dashed border-green-400 z-10">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-900 z-20 text-slate-900 animate-pulse">
            <Truck className="w-4 h-4" />
          </div>
          <div className="absolute -top-8 -left-10 bg-slate-900/80 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
            GRID RESCUE 01
          </div>
        </div>
      )}

      {/* Charging Station Markers */}
      <div className="absolute top-[80%] left-[70%] z-10">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border border-white">
          <Zap className="w-3 h-3 text-slate-900" />
        </div>
      </div>
    </div>
  );
};

export default RescueMap;
