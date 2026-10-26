import React from 'react';
import { Activity } from 'lucide-react';

const NetworkStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Network Status
      </h3>

      <div className="flex-1 flex flex-col justify-center space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-green-900">Operational</span>
          </div>
          <span className="font-black text-green-700 text-lg">44</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="font-bold text-orange-900">Degraded</span>
          </div>
          <span className="font-black text-orange-700 text-lg">3</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="font-bold text-red-900">Offline</span>
          </div>
          <span className="font-black text-red-700 text-lg">1</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="font-bold text-blue-900">Maintenance</span>
          </div>
          <span className="font-black text-blue-700 text-lg">2</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;
