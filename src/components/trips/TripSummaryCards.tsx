import React from 'react';
import StatCard from '../dashboard/StatCard';
import { Route, Zap, BatteryCharging, IndianRupee, Leaf, Navigation } from 'lucide-react';

interface TripSummaryCardsProps {
  summary: any;
}

const TripSummaryCards: React.FC<TripSummaryCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <StatCard 
        title="Total Trips"
        value={(summary?.totalTrips ?? 0).toString()}
        icon={Navigation}
        trend="neutral"
        trendUp={true}
      />
      <StatCard 
        title="Total Distance"
        value={`${(summary?.totalDistance ?? 0).toLocaleString()} km`}
        icon={Route}
        trend="neutral"
      />
      <StatCard 
        title="Energy Consumed"
        value={`${summary?.energyConsumed ?? 0} kWh`}
        icon={Zap}
        trend="neutral"
      />
      <StatCard 
        title="Charging Sessions"
        value={(summary?.chargingSessions ?? 0).toString()}
        icon={BatteryCharging}
        trend="neutral"
        trendUp={true}
      />
      <StatCard 
        title="Total Charging Cost"
        value={`₹${(summary?.totalCost ?? 0).toLocaleString()}`}
        icon={IndianRupee}
        trend="neutral"
      />
      <StatCard 
        title="CO₂ Saved"
        value={`${summary?.co2Saved ?? 0} kg`}
        icon={Leaf}
        trend="neutral"
        trendUp={true}
      />
    </div>
  );
};

export default TripSummaryCards;
