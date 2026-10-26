import React from 'react';
import { BatteryStatus } from '../../types/battery';
import { CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BatteryHeroProps {
  status: BatteryStatus;
}

const BatteryHero: React.FC<BatteryHeroProps> = ({ status }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden h-full">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Current Battery</h2>
      
      {/* Circular Progress */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="8" 
            strokeDasharray={`${status.percentage * 2.83} 283`} 
            strokeLinecap="round" 
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="text-center">
          <span className="text-5xl font-black text-slate-900 tracking-tighter">{status.percentage}%</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Range</p>
        <p className="text-3xl font-black text-slate-900">{status.estimatedRangeKm} km</p>
      </div>

      <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-green-100">
        Status: {status.status}
      </div>

      <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Energy</p>
          <p className="font-bold text-slate-900">{status.energyAvailableKwh} kWh</p>
        </div>
        <div className="text-center border-l border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Capacity</p>
          <p className="font-bold text-slate-900">{status.capacityKwh} kWh</p>
        </div>
      </div>
      
      <div className="w-full mt-6">
        <button 
          onClick={() => navigate('/payments')}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md"
        >
          <CreditCard className="w-5 h-5" /> Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BatteryHero;
