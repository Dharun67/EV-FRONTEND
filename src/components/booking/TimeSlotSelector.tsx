import React from 'react';
import { TimeSlot } from '../../types/booking';
import { Clock } from 'lucide-react';

interface TimeSlotSelectorProps {
  slots: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ slots, selectedId, onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-slate-400" /> Available Time Slots
      </h2>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {slots.map((slot: any) => {
          const isSelected = selectedId === slot.id;
          const isBusy = slot.status === 'busy';
          const isUnavailable = slot.status === 'unavailable';
          
          return (
            <button
              key={slot.id}
              disabled={isUnavailable}
              onClick={() => onSelect(slot.id)}
              className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all flex flex-col items-center gap-1
                ${isSelected ? 'bg-blue-600 border-gridwise-blue text-slate-900 shadow-md' : 
                  isUnavailable ? 'bg-slate-100 border-slate-100 text-slate-400 cursor-not-allowed opacity-60' :
                  isBusy ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' :
                  'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-sm'
                }
              `}
            >
              <span>{slot.time}</span>
              <span className={`text-[9px] uppercase tracking-wider ${
                isSelected ? 'text-blue-100' :
                isUnavailable ? 'text-slate-400' :
                isBusy ? 'text-amber-600' :
                'text-green-600'
              }`}>
                {slot.status}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
