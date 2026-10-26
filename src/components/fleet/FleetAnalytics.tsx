import React from 'react';
import { FleetAlert } from '../../types/fleet';
import { AlertCircle, Zap, ShieldAlert } from 'lucide-react';
import { AIBadge } from '../shared/AIBadge';

export const FleetAnalytics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center items-center text-center">
        <h3 className="text-sm font-bold text-slate-900 mb-2">Fleet Utilization</h3>
        <p className="text-4xl font-black text-blue-600 mb-2">82%</p>
        <div className="flex gap-4 text-xs font-medium text-slate-500">
          <span>Vehicle Availability: <span className="font-bold text-slate-900">76%</span></span>
          <span>Charging Availability: <span className="font-bold text-slate-900">91%</span></span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center items-center text-center">
        <h3 className="text-sm font-bold text-slate-900 mb-2">Fleet Charging Demand</h3>
        <p className="text-xl font-black text-orange-500 mb-1">Peak: 6 PM – 9 PM</p>
        <div className="flex flex-col text-xs font-medium text-slate-500 gap-1 mt-2">
          <span>Avg Session: <span className="font-bold text-slate-900">31 kWh</span></span>
          <span>Avg Duration: <span className="font-bold text-slate-900">42 min</span></span>
          <span>Avg Cost: <span className="font-bold text-slate-900">₹248</span></span>
        </div>
      </div>
    </div>
  );
};

interface AlertsProps {
  alerts: FleetAlert[];
}

export const FleetAlertsWidget: React.FC<AlertsProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="w-5 h-5 text-red-500" />
        <h2 className="text-lg font-bold text-slate-900">Fleet Alerts</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
        {alerts.map(alert => (
          <div key={alert.id} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors">
            <div className={`mt-0.5 w-2 h-2 rounded-full ${alert.priority === 'High' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`} />
            <div>
              <p className="text-sm font-bold text-slate-900">{alert.type} <span className="text-slate-400 font-medium ml-1">({alert.vehicleId})</span></p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{alert.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AIFleetInsight: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-slate-900 shadow-lg relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold">Fleet Charging Intelligence</h2>
          <AIBadge type="insight" />
        </div>
        
        <p className="text-purple-100 font-medium leading-relaxed">
          Fleet charging demand is heavily concentrated between <span className="font-bold text-slate-900">6 PM and 9 PM</span>. Consider scheduling non-critical fleet charging during lower-demand overnight periods to reduce peak load and charging costs.
        </p>

        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-xs font-bold text-purple-300">Expected Savings: ~12%</span>
          <AIBadge type="simulated" />
        </div>
      </div>
    </div>
  );
};
