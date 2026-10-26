import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  colorClass: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon: Icon, path, colorClass }) => {
  return (
    <Link 
      to={path}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-200 group flex flex-col h-full"
    >
      <div className={`p-3 rounded-xl inline-flex w-fit mb-4 ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 flex-1">{description}</p>
      
      <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-600 transition-colors">
        {title.split(' ')[0]} <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default QuickActionCard;
