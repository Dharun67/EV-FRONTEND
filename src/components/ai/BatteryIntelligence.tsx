import React from 'react';
import { JourneyContext } from '../../types/ai';
import { BatteryCharging, ShieldCheck } from 'lucide-react';

interface BatteryIntelligenceProps {
  context: JourneyContext;
}

const BatteryIntelligence: React.FC<BatteryIntelligenceProps> = ({ context }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <BatteryCharging className="h-5 w-5 text-slate-400" /> Battery Intelligence
      </h3>

      <div className="relative h-12 w-full bg-slate-100 rounded-full overflow-hidden mb-6 border border-slate-200">
        {/* Total Battery capacity */}
        <div className="absolute inset-y-0 left-0 bg-green-500 opacity-20" style={{ width: '82%' }}></div>
        {/* Current Battery */}
        <div className="absolute inset-y-0 left-0 bg-green-500" style={{ width: `${context.currentBatteryPercentage}%` }}></div>
        {/* Recommended Charge */}
        <div className="absolute inset-y-0 left-[72%] bg-blue-600" style={{ width: '10%' }}></div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-slate-600 font-medium">Current</span>
          </div>
          <span className="font-bold text-slate-900">{context.currentBatteryPercentage}%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-slate-600 font-medium">Recommended Departure</span>
          </div>
          <span className="font-bold text-slate-900">82%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-slate-600 font-medium">Arrival</span>
          </div>
          <span className="font-bold text-slate-900">{context.estimatedArrivalBattery}%</span>
        </div>
        <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-slate-600 font-bold">Reserve</span>
          </div>
          <span className="font-bold text-green-600">{context.estimatedArrivalBattery}%</span>
        </div>
      </div>
    </div>
  );
};

export default BatteryIntelligence;
