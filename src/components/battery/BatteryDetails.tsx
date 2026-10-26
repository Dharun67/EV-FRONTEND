import React from 'react';
import { BatteryStatus } from '../../types/battery';
import { Battery, HeartPulse, MapPin, Zap, Thermometer, Clock } from 'lucide-react';

interface BatteryDetailsProps {
  status: BatteryStatus;
}

const BatteryDetails: React.FC<BatteryDetailsProps> = ({ status }) => {
  const details = [
    { label: 'Battery Level', value: `${status.percentage}%`, icon: Battery },
    { label: 'Battery Health', value: `${status.healthPercentage}%`, icon: HeartPulse },
    { label: 'Estimated Range', value: `${status.estimatedRangeKm} km`, icon: MapPin },
    { label: 'Energy Available', value: `${status.energyAvailableKwh} kWh`, icon: Zap },
    { label: 'Battery Temperature', value: `${status.temperatureCelsius}°C`, icon: Thermometer },
    { label: 'Last Updated', value: 'Just now', icon: Clock },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
      {details.map((detail, idx) => (
        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
          <detail.icon className="w-5 h-5 text-blue-600 mb-2 opacity-80" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{detail.label}</p>
          <p className="font-black text-slate-900 text-lg">{detail.value}</p>
        </div>
      ))}
    </div>
  );
};

export default BatteryDetails;
