import React from 'react';
import KpiCard from '../shared/KpiCard';
import { Users, UserCheck, ShieldAlert, UserPlus, Clock } from 'lucide-react';

export const AdminKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <KpiCard label="Total Users" value="2,840" icon={Users} iconColor="text-blue-500" />
      <KpiCard label="Active Users" value="2,316" icon={UserCheck} iconColor="text-green-500" />
      <KpiCard label="CPO Managers" value="24" icon={Users} iconColor="text-purple-500" />
      <KpiCard label="Fleet Managers" value="48" icon={Users} iconColor="text-orange-500" />
      <KpiCard label="Admins" value="6" icon={ShieldAlert} iconColor="text-red-500" />
      <KpiCard label="Pending Approvals" value="12" icon={Clock} iconColor="text-slate-500" />
    </div>
  );
};
