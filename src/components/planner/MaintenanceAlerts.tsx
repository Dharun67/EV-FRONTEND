import React from 'react';
import { MaintenanceAlert } from '../../types/planner';
import { Wrench } from 'lucide-react';

interface MaintenanceAlertsProps {
  alerts: MaintenanceAlert[];
}

const MaintenanceAlerts: React.FC<MaintenanceAlertsProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-red-500" /> Maintenance Alerts
        </h3>
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
          12 Pending
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {alerts.map(alert => (
          <div key={alert.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">{alert.chargerId}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                alert.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                alert.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {alert.priority}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 leading-snug">{alert.issue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceAlerts;
