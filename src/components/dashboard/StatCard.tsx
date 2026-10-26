import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  subtitle,
  colorClass = "text-blue-600 bg-blue-50"
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`p-2 rounded-xl ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900 tracking-tight">{value}</div>
        {subtitle && (
          <p className="text-xs font-medium text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
