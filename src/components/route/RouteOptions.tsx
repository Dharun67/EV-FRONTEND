import React from 'react';
import { RouteOption } from '../../types/route';
import { Zap, Clock, BatteryCharging } from 'lucide-react';

interface RouteOptionsProps {
  selectedOptionId: string;
  onSelectOption: (id: string) => void;
}

const RouteOptions: React.FC<RouteOptionsProps> = ({ selectedOptionId, onSelectOption }) => {
  const options = [
    {
      id: 'opt3',
      name: 'Fastest Route',
      desc: 'Shortest travel time',
      icon: Clock,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      id: 'opt2',
      name: 'Energy Efficient',
      desc: 'Lowest energy consumption',
      icon: Zap,
      color: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-100'
    },
    {
      id: 'opt1',
      name: 'Charging Optimized',
      desc: 'Best charging availability',
      icon: BatteryCharging,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    }
  ];

  return (
    <div className="flex flex-col gap-3 mb-6">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Route Preference</h3>
      {options.map(opt => {
        const isSelected = selectedOptionId === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelectOption(opt.id)}
            className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
              isSelected 
                ? `border-slate-900 bg-slate-900 shadow-md transform scale-[1.02]` 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/10' : opt.bg} border ${isSelected ? 'border-white/10' : opt.border}`}>
              <opt.icon className={`h-6 w-6 ${isSelected ? 'text-slate-900' : opt.color}`} />
            </div>
            <div>
              <h4 className={`font-bold ${isSelected ? 'text-slate-900' : 'text-slate-900'}`}>{opt.name}</h4>
              <p className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{opt.desc}</p>
            </div>
            {isSelected && (
              <div className="ml-auto h-5 w-5 rounded-full bg-white flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-900"></div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default RouteOptions;
