import React from 'react';
import { Map, AlertTriangle, Zap, Target, ArrowDownRight, TrendingUp } from 'lucide-react';

const InfrastructureKpiCards: React.FC = () => {
  const kpis = [
    { label: 'Total Charging Zones', value: '24', icon: Map, trend: '+2 this year', color: 'text-slate-500' },
    { label: 'Underserved Zones', value: '8', icon: AlertTriangle, trend: 'Requires attention', color: 'text-orange-500' },
    { label: 'Current Chargers', value: '286', icon: Zap, trend: '+14% YoY', color: 'text-blue-500' },
    { label: 'Required Chargers', value: '342', icon: Target, trend: 'Based on demand', color: 'text-purple-500' },
    { label: 'Infrastructure Gap', value: '56', suffix: ' Chargers', icon: ArrowDownRight, trend: 'Current deficit', color: 'text-red-500' },
    { label: 'Priority Expansion Zones', value: '5', icon: TrendingUp, trend: 'High ROI potential', color: 'text-green-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-gridwise-blue hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 line-clamp-1">{kpi.label}</p>
            <p className="text-xl font-black text-slate-900">
              {kpi.value}
              {kpi.suffix && <span className="text-sm font-bold text-slate-500">{kpi.suffix}</span>}
            </p>
            <p className="text-[10px] font-bold mt-1 text-slate-500">
              {kpi.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfrastructureKpiCards;
