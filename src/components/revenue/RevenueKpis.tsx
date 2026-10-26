import React from 'react';
import KpiCard from '../shared/KpiCard';
import { IndianRupee, Zap, TrendingUp, CreditCard } from 'lucide-react';

const RevenueKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <KpiCard label="Today's Revenue" value="₹86,420" icon={IndianRupee} iconColor="text-emerald-500" trend="+4.2% vs yesterday" trendColor="text-green-500" />
      <KpiCard label="Monthly Revenue" value="₹21.8 L" icon={IndianRupee} iconColor="text-emerald-500" trend="+12.8% vs last month" trendColor="text-green-500" />
      <KpiCard label="Annual Revenue" value="₹2.62 Cr" icon={IndianRupee} iconColor="text-emerald-500" trend="On track" trendColor="text-slate-500" />
      <KpiCard label="Energy Sold" value="128,640" suffix=" kWh" icon={Zap} iconColor="text-orange-500" />
      <KpiCard label="Avg Revenue/Session" value="₹142" icon={CreditCard} iconColor="text-blue-500" />
      <KpiCard label="Revenue Growth" value="+12.8%" icon={TrendingUp} iconColor="text-purple-500" />
    </div>
  );
};

export default RevenueKpis;
