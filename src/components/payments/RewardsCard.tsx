import React, { useState } from 'react';
import { Award } from 'lucide-react';

interface RewardsCardProps {
  balance: number;
}

const RewardsCard: React.FC<RewardsCardProps> = ({ balance }) => {
  const [msg, setMsg] = useState('');

  const handleRedeem = () => {
    setMsg('Reward redemption is simulated.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 relative overflow-hidden">
      {msg && (
        <div className="absolute top-0 left-0 w-full bg-blue-600 text-white text-xs font-bold text-center py-2 animate-in slide-in-from-top-2 z-10">
          {msg}
        </div>
      )}

      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 pt-2">
        <Award className="w-5 h-5 text-green-500" /> GridWise Rewards
      </h3>

      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Balance</p>
          <p className="text-3xl font-black text-slate-900">{balance} <span className="text-sm font-bold text-slate-500">points</span></p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Estimated Value</p>
          <p className="text-xl font-black text-green-600">₹{balance}</p>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-slate-600">Charging Rewards</span>
          <span className="font-bold text-slate-900">120 points</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-slate-600">Community Rewards</span>
          <span className="font-bold text-slate-900">40 points</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-slate-600">Referral Rewards</span>
          <span className="font-bold text-slate-900">25 points</span>
        </div>
      </div>

      <button 
        onClick={handleRedeem}
        className="w-full py-3 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl font-bold transition-colors shadow-sm"
      >
        Redeem Rewards
      </button>
    </div>
  );
};

export default RewardsCard;
