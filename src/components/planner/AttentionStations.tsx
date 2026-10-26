import React from 'react';
import { AlertTriangle, AlertCircle, Wrench, Search } from 'lucide-react';

const AttentionStations: React.FC = () => {
  const stations = [
    { name: 'Mettupalayam EV Point', util: 32, issue: 'Low demand', status: 'Review', icon: Search, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Sulur Charging Hub', util: 41, issue: 'Connector fault', status: 'Maintenance', icon: Wrench, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Kalapatti Community Station', util: 38, issue: 'Low utilization', status: 'Monitor', icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-orange-500" /> Stations Requiring Attention
      </h3>

      <div className="space-y-3">
        {stations.map((st, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${st.bg} flex items-center justify-center`}>
                <st.icon className={`w-4 h-4 ${st.color}`} />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm mb-0.5">{st.name}</p>
                <div className="flex gap-2 items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Util: {st.util}%</span>
                  <span>•</span>
                  <span>{st.issue}</span>
                </div>
              </div>
            </div>
            
            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
              st.status === 'Review' ? 'bg-orange-100 text-orange-700' :
              st.status === 'Maintenance' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {st.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttentionStations;
