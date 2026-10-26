import React from 'react';
import StatCard from '../dashboard/StatCard';
import { BatteryCharging, Zap, IndianRupee, Clock } from 'lucide-react';

const ChargingStatistics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Charging Sessions"
        value="12"
        icon={BatteryCharging}
        trend="+2 this week"
        trendUp={true}
      />
      <StatCard 
        title="Energy Charged"
        value="286 kWh"
        icon={Zap}
        trend="Monthly total"
      />
      <StatCard 
        title="Total Charging Cost"
        value="₹5,240"
        icon={IndianRupee}
        trend="-12% vs last month"
        trendUp={true} // lower cost is good
      />
      <StatCard 
        title="Average Session"
        value="24 min"
        icon={Clock}
        trend="Fast charging"
      />
    </div>
  );
};

export default ChargingStatistics;
