import React from 'react';

const DrivingModeRange: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6">Estimated Range by Driving Mode</h3>
      
      <div className="space-y-5 flex-1 flex flex-col justify-center">
        <div>
          <div className="flex justify-between text-sm font-bold text-slate-900 mb-1">
            <span>Eco Mode</span>
            <span className="text-green-600">312 km</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold text-slate-900 mb-1">
            <span className="flex items-center gap-2">
              Normal Mode
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-blue-100">
                Current
              </span>
            </span>
            <span className="text-blue-600">286 km</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-[92%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-bold text-slate-900 mb-1">
            <span>Sport Mode</span>
            <span className="text-amber-500">244 km</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-[78%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingModeRange;
