import React from 'react';
import { AIBadge } from '../shared/AIBadge';
import { IndianRupee, Zap, CreditCard, Activity } from 'lucide-react';

export const RevenueInsights: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Session Value */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Session</p>
          <p className="text-2xl font-black text-slate-900">₹142</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Peak Session</p>
          <p className="text-xl font-bold text-emerald-600">₹384</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lowest Session</p>
          <p className="text-xl font-bold text-red-600">₹46</p>
        </div>
      </div>

      {/* Payment Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-500"/> Payment Methods</h3>
        <div className="flex h-4 rounded-full overflow-hidden mb-3">
          <div className="bg-blue-500 h-full" style={{ width: '48%' }} title="UPI: 48%"></div>
          <div className="bg-emerald-500 h-full" style={{ width: '32%' }} title="Cards: 32%"></div>
          <div className="bg-orange-500 h-full" style={{ width: '12%' }} title="Wallet: 12%"></div>
          <div className="bg-purple-500 h-full" style={{ width: '8%' }} title="Corporate: 8%"></div>
        </div>
        <div className="flex justify-between text-xs font-bold">
          <span className="text-blue-600">UPI (48%)</span>
          <span className="text-emerald-600">Cards (32%)</span>
          <span className="text-orange-600">Wallet (12%)</span>
          <span className="text-purple-600">Corporate (8%)</span>
        </div>
      </div>

      {/* Revenue Forecast Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Activity className="w-4 h-4 text-slate-500"/> Future Forecast</h3>
          <AIBadge type="simulated" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Next Month</p>
            <p className="text-lg font-bold text-slate-900">₹23.4 L</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">3 Months</p>
            <p className="text-lg font-bold text-slate-900">₹72.6 L</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">6 Months</p>
            <p className="text-lg font-bold text-slate-900">₹1.48 Cr</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">12 Months</p>
            <p className="text-lg font-bold text-slate-900">₹3.12 Cr</p>
          </div>
        </div>
      </div>

      {/* ROI */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm p-4">
        <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2"><IndianRupee className="w-4 h-4"/> Network ROI</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-emerald-800">Infra Investment</span>
            <span className="font-bold text-emerald-900">₹8.4 Cr</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-emerald-800">Annual Revenue</span>
            <span className="font-bold text-emerald-900">₹2.62 Cr</span>
          </div>
          <div className="flex justify-between text-sm border-b border-emerald-200/50 pb-2">
            <span className="font-medium text-emerald-800">Operating Cost</span>
            <span className="font-bold text-emerald-900">₹1.18 Cr</span>
          </div>
          <div className="flex justify-between text-sm pt-2">
            <span className="font-bold text-emerald-900">Estimated Profit</span>
            <span className="font-black text-emerald-700">₹1.44 Cr</span>
          </div>
        </div>
        <div className="bg-white/60 p-3 rounded-xl flex justify-between items-center border border-emerald-200/50">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Estimated ROI</span>
          <span className="text-2xl font-black text-emerald-600">17.1%</span>
        </div>
      </div>

      {/* AI Financial Insight */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-slate-900 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold">Financial Intelligence</h2>
          </div>
          <p className="text-purple-100 font-medium leading-relaxed text-sm">
            Ultra-fast chargers generate the highest revenue per session but represent a smaller share of total infrastructure. Expansion in high-demand zones could significantly improve overall network revenue.
          </p>
        </div>
      </div>

    </div>
  );
};
