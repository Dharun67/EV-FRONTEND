import React from 'react';
import StatCard from '../dashboard/StatCard';
import { IndianRupee, Star, Zap, Activity } from 'lucide-react';
// Mock import removed
const mockCommunityInsights: any = {};

const CommunityInsights: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Community Charging Insights</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Avg Community Price"
          value={`₹${mockCommunityInsights.averagePrice ?? 14}/kWh`}
          icon={IndianRupee}
          trend="-2.4% vs commercial"
          trendUp={true}
        />
        <StatCard 
          title="Average Rating"
          value={`${mockCommunityInsights.averageRating ?? 4.8} ★`}
          icon={Star}
          trend="Highly trusted"
        />
        <StatCard 
          title="Available Chargers"
          value={(mockCommunityInsights.availableChargers ?? 24).toString()}
          icon={Activity}
          trend="+14 this month"
          trendUp={true}
        />
        <StatCard 
          title="Average Power"
          value={`${mockCommunityInsights.averagePower ?? 7.2} kW`}
          icon={Zap}
          trend="AC & DC Fast"
        />
      </div>
    </div>
  );
};
export default CommunityInsights;
