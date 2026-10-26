import React from 'react';
import { Settings, UserPlus, FileText } from 'lucide-react';

export const RoleManagement: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-purple-500"/> Role Configuration</h3>
      <div className="flex-1 space-y-3">
        <RoleRow name="Admin" users={6} />
        <RoleRow name="CPO Manager" users={24} />
        <RoleRow name="Fleet Manager" users={48} />
        <RoleRow name="Planner" users={12} />
        <RoleRow name="Support" users={18} />
      </div>
      <button className="w-full mt-4 py-2 border border-dashed border-slate-300 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex justify-center items-center gap-2">
        <UserPlus className="w-4 h-4"/> Create Custom Role
      </button>
    </div>
  );
};

const RoleRow: React.FC<{name: string, users: number}> = ({name, users}) => (
  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
    <span className="font-bold text-slate-700 text-sm">{name}</span>
    <span className="text-xs font-bold bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">{users} Users</span>
  </div>
);

export const SystemActivity: React.FC = () => {
  const activities = [
    { text: 'Sarah Jenkins (Admin) updated role for Marcus Chen', time: '12 mins ago', type: 'User' },
    { text: 'System backup completed successfully', time: '1 hour ago', type: 'System' },
    { text: 'AI Engine model retrained and deployed', time: '4 hours ago', type: 'System' },
    { text: 'New CPO account created (FastCharge Co)', time: '5 hours ago', type: 'User' },
    { text: 'Multiple failed login attempts from IP 192.168.1.42', time: '8 hours ago', type: 'Security' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-500"/> Audit Log</h3>
      <div className="flex-1 space-y-4">
        {activities.map((act, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${act.type === 'Security' ? 'bg-red-500' : act.type === 'System' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
            <div>
              <p className="text-sm font-medium text-slate-700 leading-snug">{act.text}</p>
              <p className="text-xs font-bold text-slate-400 mt-1">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="text-xs font-bold text-blue-600 hover:text-blue-800 text-center w-full mt-4">View Full Audit Log</button>
    </div>
  );
};
