import React from 'react';
import { Key } from 'lucide-react';

export const PermissionMatrix: React.FC = () => {
  const roles = ['Admin', 'CPO Manager', 'Fleet Manager', 'Planner', 'Driver', 'Support'];
  const modules = ['Dashboard', 'Stations', 'Demand', 'Infrastructure', 'Revenue', 'Maintenance', 'Fleet', 'AI', 'Admin'];

  const getPermission = (role: string, mod: string) => {
    if (role === 'Admin') return 'Manage';
    if (mod === 'Dashboard' || mod === 'Stations') return 'View';
    
    if (role === 'CPO Manager') {
      if (['Demand', 'Revenue', 'Maintenance'].includes(mod)) return 'Manage';
      if (['Infrastructure', 'AI'].includes(mod)) return 'Edit';
      if (mod === 'Fleet') return 'View';
    }
    
    if (role === 'Planner') {
      if (['Infrastructure', 'AI', 'Demand'].includes(mod)) return 'Manage';
      if (['Revenue', 'Maintenance'].includes(mod)) return 'View';
    }

    if (role === 'Fleet Manager') {
      if (mod === 'Fleet') return 'Manage';
    }

    if (role === 'Support') {
      if (['Maintenance'].includes(mod)) return 'Edit';
      if (['Revenue', 'Demand', 'Fleet'].includes(mod)) return 'View';
    }
    
    return '-';
  };

  const getColor = (perm: string) => {
    if (perm === 'Manage') return 'bg-purple-100 text-purple-700';
    if (perm === 'Edit') return 'bg-blue-100 text-blue-700';
    if (perm === 'View') return 'bg-slate-100 text-slate-600';
    return 'text-slate-300';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Key className="w-4 h-4 text-orange-500"/> Permission Matrix</h3>
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Module</th>
            {roles.map(r => <th key={r} className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{r}</th>)}
          </tr>
        </thead>
        <tbody>
          {modules.map(mod => (
            <tr key={mod} className="border-b border-slate-100 hover:bg-slate-50/50">
              <td className="p-3 text-sm font-bold text-slate-700">{mod}</td>
              {roles.map(role => {
                const p = getPermission(role, mod);
                return (
                  <td key={role} className="p-3 text-center">
                    {p !== '-' ? (
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${getColor(p)}`}>{p}</span>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
