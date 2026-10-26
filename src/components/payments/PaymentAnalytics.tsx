import React from 'react';
import StatCard from '../dashboard/StatCard';
import { Zap, IndianRupee, AlertTriangle, CornerUpLeft } from 'lucide-react';

const PaymentAnalytics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Avg Charging Payment"
        value="₹421"
        icon={Zap}
        trend="neutral"
        trendUp={true}
      />
      <StatCard 
        title="Avg Monthly Spend"
        value="₹2,840"
        icon={IndianRupee}
        trend="neutral"
      />
      <StatCard 
        title="Emergency Spend"
        value="₹1,249"
        icon={AlertTriangle}
        trend="neutral"
      />
      <StatCard 
        title="Refunds Received"
        value="₹320"
        icon={CornerUpLeft}
        trend="neutral"
        trendUp={true}
      />
    </div>
  );
};

export default PaymentAnalytics;
