import React from 'react';
import { Activity, BarChart3, Users, Zap, TrendingUp, HardDrive } from 'lucide-react';

const DemandKpiCards: React.FC = () => {
  const kpis = [
    { label: 'Current Demand', value: 'High', icon: Activity, trend: 'Peak approaching', trendUp: true, color: 'text-orange-500' },
    { label: 'Demand Score', value: '82', suffix: ' / 100', icon: BarChart3, trend: '+4 from yesterday', trendUp: true, color: 'text-purple-500' },
    { label: 'Peak Utilization', value: '91%', icon: Zap, trend: '6:00 PM - 8:00 PM', trendUp: true, color: 'text-red-500' },
    { label: 'High-Demand Zones', value: '8', icon: Users, trend: '+2 new zones', trendUp: true, color: 'text-blue-500' },
    { label: 'Forecast Growth', value: '+18.4%', icon: TrendingUp, trend: 'Next 7 days', trendUp: true, color: 'text-green-500' },
    { label: 'Capacity Gap', value: '34', suffix: ' Chargers', icon: HardDrive, trend: 'Requires expansion', trendUp: false, color: 'text-slate-500' },
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
              {kpi.value}{kpi.suffix}
            </p>
            <p className={`text-[10px] font-bold mt-1 text-slate-500`}>
              {kpi.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DemandKpiCards;
