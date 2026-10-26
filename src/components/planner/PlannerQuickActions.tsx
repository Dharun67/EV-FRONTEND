import React from 'react';
import { Plus, Wrench, BarChart2, Zap, LayoutDashboard, FileText } from 'lucide-react';

const PlannerQuickActions: React.FC = () => {
  const actions = [
    { label: 'Add Station', icon: Plus, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Manage Chargers', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Maintenance', icon: Wrench, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'View Sessions', icon: LayoutDashboard, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Demand Analysis', icon: BarChart2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Generate Report', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-gridwise-blue hover:shadow-sm transition-all text-center group bg-white"
          >
            <div className={`w-10 h-10 rounded-full ${action.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlannerQuickActions;
