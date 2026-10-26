import React from 'react';
import KpiCard from '../shared/KpiCard';
import { Truck, Activity, BatteryCharging, CheckCircle2, Zap, IndianRupee } from 'lucide-react';

const FleetKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
      <KpiCard label="Total Vehicles" value="420" icon={Truck} iconColor="text-slate-500" />
      <KpiCard label="Active Vehicles" value="286" icon={Activity} iconColor="text-blue-500" />
      <KpiCard label="Charging" value="94" icon={BatteryCharging} iconColor="text-orange-500" />
      <KpiCard label="Available" value="132" icon={CheckCircle2} iconColor="text-green-500" />
      <KpiCard label="Avg Battery" value="68%" icon={Zap} iconColor="text-purple-500" />
      <KpiCard label="Today's Energy" value="8,420" suffix=" kWh" icon={Zap} iconColor="text-emerald-500" />
      <KpiCard label="Fleet Cost" value="₹1.42 L" icon={IndianRupee} iconColor="text-red-500" />
    </div>
  );
};

export default FleetKpis;
