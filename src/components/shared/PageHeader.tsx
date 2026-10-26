import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon: Icon, badge, actions }) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          {Icon && <Icon className="w-8 h-8 text-blue-600" />}
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          {badge}
        </div>
        <p className="text-slate-500 font-medium">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {actions}
      </div>
    </div>
  );
};

export default PageHeader;
