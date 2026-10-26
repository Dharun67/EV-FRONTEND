import React from 'react';
import { MapPin, CheckCircle, Zap, Power, Activity, IndianRupee, PieChart, Info } from 'lucide-react';

const PlannerKpiCards: React.FC = () => {
  const kpis = [
    { label: 'Total Stations', value: '48', icon: MapPin, trend: '+2', trendUp: true, color: 'text-slate-500' },
    { label: 'Active Stations', value: '44', icon: CheckCircle, trend: '92%', trendUp: true, color: 'text-green-500' },
    { label: 'Total Chargers', value: '286', icon: Zap, trend: '+12', trendUp: true, color: 'text-blue-500' },
    { label: 'Available Chargers', value: '172', icon: Power, trend: '60%', trendUp: true, color: 'text-indigo-500' },
    { label: 'Active Sessions', value: '63', icon: Activity, trend: '+14%', trendUp: true, color: 'text-orange-500' },
    { label: 'Today\'s Energy', value: '4,826', suffix: ' kWh', icon: Zap, trend: '+8.2%', trendUp: true, color: 'text-yellow-500' },
    { label: 'Today\'s Revenue', value: '86,420', prefix: '₹', icon: IndianRupee, trend: '+11.4%', trendUp: true, color: 'text-green-600' },
    { label: 'Network Utilization', value: '68%', icon: PieChart, trend: 'vs previous period', trendUp: true, color: 'text-purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-gridwise-blue hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            <Info className="w-3 h-3 text-slate-300 group-hover:text-slate-400 transition-colors" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 line-clamp-1">{kpi.label}</p>
            <p className="text-xl font-black text-slate-900">
              {kpi.prefix}{kpi.value}{kpi.suffix}
            </p>
            <p className={`text-[10px] font-bold mt-1 ${kpi.trendUp ? 'text-green-600' : 'text-slate-400'}`}>
              {kpi.trendUp && kpi.trend !== 'vs previous period' && '↑ '}{kpi.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlannerKpiCards;
