import React from 'react';
import { Bell } from 'lucide-react';
import { DemandAlert } from '../../types/demand';

interface DemandAlertsProps {
  alerts: DemandAlert[];
}

const DemandAlerts: React.FC<DemandAlertsProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Bell className="w-5 h-5 text-slate-400" /> Demand Alerts
      </h3>

      <div className="flex-1 space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-slate-900 text-sm">{alert.title}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                alert.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                alert.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {alert.priority}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 leading-snug">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandAlerts;
