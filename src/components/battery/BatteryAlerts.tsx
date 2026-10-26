import React from 'react';
import { AlertCircle, Info, CheckCircle2 } from 'lucide-react';

const BatteryAlerts: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-slate-400" /> Battery Alerts
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl border border-green-100 text-green-800">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm mb-0.5">No Critical Issues</p>
            <p className="text-xs font-medium text-green-700">Your battery system is functioning normally.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">Battery temperature is within the normal operating range.</p>
        </div>
        
        <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">Current battery level is sufficient for your planned trip.</p>
        </div>
      </div>
    </div>
  );
};

export default BatteryAlerts;
