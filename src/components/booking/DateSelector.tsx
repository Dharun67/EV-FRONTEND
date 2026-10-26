import React from 'react';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  dates: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ dates, selectedId, onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-slate-400" /> Select Date
      </h2>
      
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
        {dates.map(date => {
          const isSelected = selectedId === date.id;
          return (
            <div 
              key={date.id}
              onClick={() => onSelect(date.id)}
              className={`flex flex-col items-center justify-center min-w-[100px] py-4 px-2 rounded-2xl cursor-pointer transition-all border-2 flex-shrink-0
                ${isSelected 
                  ? 'bg-blue-600 border-gridwise-blue shadow-md text-slate-900' 
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'}`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider mb-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                {date.label}
              </span>
              <span className="text-lg font-bold">
                {date.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
