import React from 'react';
import { PiggyBank } from 'lucide-react';

const SavingsCard: React.FC = () => {
  return (
    <div className="bg-green-50 rounded-2xl border border-green-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-green-900 mb-6 flex items-center gap-2">
        <PiggyBank className="w-5 h-5 text-green-600" /> You Saved With GridWise
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-green-800">Charging Discounts</span>
          <span className="font-bold text-green-900">₹640</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-green-800">Reward Credits</span>
          <span className="font-bold text-green-900">₹185</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-green-800">Promo Savings</span>
          <span className="font-bold text-green-900">₹320</span>
        </div>
      </div>

      <div className="pt-4 border-t border-green-200 flex justify-between items-center">
        <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Total Saved</span>
        <span className="text-2xl font-black text-green-700">₹1,145</span>
      </div>
    </div>
  );
};

export default SavingsCard;
