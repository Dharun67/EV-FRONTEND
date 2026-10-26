import React from 'react';
import { BatteryCharging, Clock, IndianRupee } from 'lucide-react';

interface MobileChargingCardProps {
  onRequest: () => void;
}

const MobileChargingCard: React.FC<MobileChargingCardProps> = ({ onRequest }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <BatteryCharging className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Mobile EV Charging</h3>
      </div>
      <p className="text-slate-500 font-medium mb-6">
        A rescue vehicle can bring temporary charging power to your location.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <Clock className="w-5 h-5 text-slate-400 mx-auto mb-2" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Arrival</p>
          <p className="text-lg font-black text-slate-900">18 min</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <div className="text-slate-400 mx-auto mb-2 font-black">6.2</div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Distance (km)</p>
          <p className="text-lg font-black text-slate-900">6.2 km</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <div className="text-slate-400 mx-auto mb-2 font-black">+20%</div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Charge</p>
          <p className="text-lg font-black text-slate-900">60 kW</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <IndianRupee className="w-5 h-5 text-slate-400 mx-auto mb-2" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Cost</p>
          <p className="text-lg font-black text-slate-900">₹499</p>
        </div>
      </div>

      <button 
        onClick={onRequest}
        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-slate-900 rounded-xl font-bold shadow-md transition-all"
      >
        Request Mobile Charging
      </button>
    </div>
  );
};

export default MobileChargingCard;
