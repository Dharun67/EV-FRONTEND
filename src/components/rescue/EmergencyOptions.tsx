import React from 'react';
import { BatteryCharging, Wrench, CircleAlert, ShieldAlert } from 'lucide-react';

interface EmergencyOptionsProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const EmergencyOptions: React.FC<EmergencyOptionsProps> = ({ selectedOption, onSelectOption }) => {
  const options = [
    {
      id: 'Emergency Charging',
      title: 'Emergency Charging',
      desc: 'Get mobile EV charging assistance.',
      icon: BatteryCharging
    },
    {
      id: 'Vehicle Breakdown',
      title: 'Vehicle Breakdown',
      desc: 'Request roadside vehicle assistance.',
      icon: Wrench
    },
    {
      id: 'Flat Tyre',
      title: 'Flat Tyre',
      desc: 'Get roadside tyre assistance.',
      icon: CircleAlert
    },
    {
      id: 'Accident / Emergency',
      title: 'Accident / Emergency',
      desc: 'Request urgent emergency assistance.',
      icon: ShieldAlert
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-900 mb-4">How Can We Help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedOption === opt.id;
          return (
            <div 
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                isSelected 
                  ? 'border-gridwise-blue bg-blue-50/50 shadow-sm ring-1 ring-blue-100' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className={`p-3 rounded-full flex-shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`font-bold ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>{opt.title}</h4>
                <p className="text-sm font-medium text-slate-500 mt-1 leading-tight">{opt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyOptions;
