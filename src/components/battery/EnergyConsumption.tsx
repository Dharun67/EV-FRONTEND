import React from 'react';

const EnergyConsumption: React.FC = () => {
  const chartData = [
    { day: 'Mon', value: 19.2 },
    { day: 'Tue', value: 20.1 },
    { day: 'Wed', value: 18.8 },
    { day: 'Thu', value: 21.2 },
    { day: 'Fri', value: 19.6 },
    { day: 'Sat', value: 20.4 },
    { day: 'Sun', value: 20.8 },
  ];

  const maxVal = 25;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6">Energy Consumption</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Efficiency</p>
          <p className="text-lg font-black text-slate-900">5.0 km/kWh</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Today's Efficiency</p>
          <p className="text-lg font-black text-slate-900">4.8 km/kWh</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Consumption</p>
          <p className="text-lg font-black text-slate-900">20.1 <span className="text-xs font-bold text-slate-500">kWh/100km</span></p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Today's Consumption</p>
          <p className="text-lg font-black text-slate-900">20.8 <span className="text-xs font-bold text-slate-500">kWh/100km</span></p>
        </div>
      </div>

      <div className="h-40 flex items-end justify-between gap-2 md:gap-4 mt-8 relative">
        <div className="absolute top-0 w-full border-t border-dashed border-slate-200"></div>
        <div className="absolute top-[50%] w-full border-t border-dashed border-slate-100"></div>
        
        {chartData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center h-full group relative z-10">
            {/* Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded transition-opacity whitespace-nowrap z-20">
              {d.value} kWh
            </div>
            {/* Bar */}
            <div 
              className="w-full max-w-[40px] bg-blue-600/20 group-hover:bg-blue-600 rounded-t-sm transition-colors duration-300"
              style={{ height: `${(d.value / maxVal) * 100}%` }}
            >
              <div className="w-full bg-blue-600 rounded-t-sm h-1"></div>
            </div>
            <span className="mt-2 text-[10px] font-bold text-slate-400">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyConsumption;
