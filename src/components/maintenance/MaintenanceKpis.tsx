import React from 'react';
import KpiCard from '../shared/KpiCard';
import { Settings, CheckCircle2, AlertTriangle, AlertOctagon, Activity } from 'lucide-react';

const MaintenanceKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <KpiCard label="Total Chargers" value="286" icon={Settings} iconColor="text-slate-500" />
      <KpiCard label="Healthy" value="248" icon={CheckCircle2} iconColor="text-green-500" />
      <KpiCard label="Maintenance" value="18" icon={AlertTriangle} iconColor="text-orange-500" />
      <KpiCard label="Fault" value="12" icon={AlertOctagon} iconColor="text-red-500" />
      <KpiCard label="Critical" value="4" icon={AlertOctagon} iconColor="text-red-700" />
      <KpiCard label="Network Uptime" value="96.8%" icon={Activity} iconColor="text-blue-500" />
    </div>
  );
};

export default MaintenanceKpis;
