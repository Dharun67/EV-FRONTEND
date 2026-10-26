import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendColor?: 'text-green-500' | 'text-red-500' | 'text-orange-500' | 'text-blue-500' | 'text-slate-500';
  iconColor?: string;
  suffix?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  label, value, icon: Icon, trend, trendColor = 'text-slate-500', iconColor = 'text-slate-500', suffix 
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-gridwise-blue hover:shadow-md transition-all h-full">
      <div className="flex justify-between items-start mb-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 line-clamp-1">{label}</p>
        <p className="text-xl font-black text-slate-900">
          {value}
          {suffix && <span className="text-sm font-bold text-slate-500">{suffix}</span>}
        </p>
        {trend && (
          <p className={`text-[10px] font-bold mt-1 ${trendColor}`}>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
