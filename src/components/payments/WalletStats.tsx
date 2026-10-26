import React from 'react';
import StatCard from '../dashboard/StatCard';
import { Wallet, IndianRupee, CreditCard, Award } from 'lucide-react';

interface WalletStatsProps {
  balance: number;
}

const WalletStats: React.FC<WalletStatsProps> = ({ balance }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Current Balance"
        value={`₹${balance.toLocaleString()}`}
        icon={Wallet}
        trend="neutral"
      />
      <StatCard 
        title="This Month"
        value="₹2,840"
        icon={IndianRupee}
        trend="neutral"
        trendUp={true}
      />
      <StatCard 
        title="Total Spent"
        value="₹18,460"
        icon={CreditCard}
        trend="neutral"
      />
      <StatCard 
        title="Reward Credits"
        value="₹185"
        icon={Award}
        trend="neutral"
      />
    </div>
  );
};

export default WalletStats;
