import React from 'react';
import { AdminSystemHealth } from '../../types/admin';
import { Activity, ShieldCheck, Server } from 'lucide-react';

interface Props {
  health: AdminSystemHealth;
}

export const SystemHealth: React.FC<Props> = ({ health }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500"/> System Health</h3>
      
      <div className="flex-1 space-y-3">
        <HealthRow label="Frontend" status={health.frontend} />
        <HealthRow label="API Services" status={health.api} simulated />
        <HealthRow label="Database" status={health.database} simulated />
        <HealthRow label="AI Engine" status={health.aiEngine} simulated />
        <HealthRow label="Payment Gateway" status={health.payment} simulated />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Uptime</span>
        <span className="text-2xl font-black text-green-500">{health.overallScore}%</span>
      </div>
    </div>
  );
};

const HealthRow: React.FC<{label: string, status: string, simulated?: boolean}> = ({label, status, simulated}) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-medium text-slate-700 flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${status === 'Operational' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
      {label} {simulated && <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-1 rounded ml-1">SIM</span>}
    </span>
    <span className={`font-bold ${status === 'Operational' ? 'text-green-600' : 'text-purple-600'}`}>{status}</span>
  </div>
);

export const SecurityMetrics: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-4 h-full text-slate-900 flex flex-col">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400"/> Security & Access</h3>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Sessions</p>
          <p className="text-xl font-bold text-emerald-400">184</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Failed Logins</p>
          <p className="text-xl font-bold text-red-400">8</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Suspended</p>
          <p className="text-xl font-bold text-orange-400">6</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Reviews</p>
          <p className="text-xl font-bold text-blue-400">12</p>
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-500 text-center mt-4 uppercase tracking-wider border-t border-slate-800 pt-3">Prototype Security Metrics</p>
    </div>
  );
};
