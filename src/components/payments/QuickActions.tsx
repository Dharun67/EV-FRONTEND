import React from 'react';
import { Plus, CreditCard, History, Award, Settings } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    { id: 'add-money', label: 'Add Money', icon: Plus, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    { id: 'methods', label: 'Payment Methods', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { id: 'history', label: 'Transaction History', icon: History, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
    { id: 'rewards', label: 'View Rewards', icon: Award, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
    { id: 'settings', label: 'Payment Settings', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {actions.map(action => (
          <button 
            key={action.id}
            onClick={() => onAction(action.id)}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-gridwise-blue hover:shadow-sm transition-all text-center group bg-white"
          >
            <div className={`w-12 h-12 rounded-full ${action.bg} ${action.border} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <span className="text-xs font-bold text-slate-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
