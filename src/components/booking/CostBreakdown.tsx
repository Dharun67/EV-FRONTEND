import React from 'react';

interface CostBreakdownProps {
  energyCost: number;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ energyCost }) => {
  const bookingFee = 10;
  const taxes = 35;
  const total = energyCost + bookingFee + taxes;

  return (
    <div className="bg-slate-50 rounded-xl p-4 mt-6">
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm font-medium text-slate-600">
          <span>Charging Cost</span>
          <span>₹{energyCost}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-slate-600">
          <span>Booking Fee</span>
          <span>₹{bookingFee}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-slate-600">
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>
      </div>
      
      <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
        <span className="font-bold text-slate-900">Estimated Total</span>
        <span className="text-xl font-black text-slate-900">₹{total}</span>
      </div>
    </div>
  );
};

export default CostBreakdown;
