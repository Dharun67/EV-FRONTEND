import React from 'react';
import StatCard from '../dashboard/StatCard';
import { IndianRupee, Clock, Zap } from 'lucide-react';

const ChargingStatistics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Avg Charging Cost"
        value="₹401"
        icon={IndianRupee}
        trend="neutral"
        trendUp={true}
      />
      <StatCard 
        title="Average Session"
        value="26 min"
        icon={Clock}
        trend="neutral"
      />
      <StatCard 
        title="Average Energy"
        value="31.8 kWh"
        icon={Zap}
        trend="neutral"
      />
      <StatCard 
        title="Average Price"
        value="₹13.2/kWh"
        icon={IndianRupee}
        trend="neutral"
        trendUp={true}
      />
    </div>
  );
};

export default ChargingStatistics;
