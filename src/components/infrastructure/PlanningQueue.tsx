import React from 'react';
import { CalendarDays, Trash2 } from 'lucide-react';
import { PlanningQueueItem } from '../../types/infrastructure';

interface PlanningQueueProps {
  queue: PlanningQueueItem[];
  onRemove: (zoneId: string) => void;
  onPlanSelected: () => void;
}

const PlanningQueue: React.FC<PlanningQueueProps> = ({ queue, onRemove, onPlanSelected }) => {
  if (queue.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col justify-center items-center text-center">
        <CalendarDays className="w-8 h-8 text-slate-300 mb-3" />
        <h3 className="font-bold text-slate-900 mb-1">Planning Queue Empty</h3>
        <p className="text-xs font-medium text-slate-500">Add expansion zones from the Priorities list to begin planning.</p>
      </div>
    );
  }

  const totalChargers = queue.reduce((sum, item) => sum + item.recommendedChargers, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-600" /> Selected for Expansion
        </h3>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-black">
          {queue.length} Zones
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
        {queue.map(item => (
          <div key={item.zoneId} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl group">
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">{item.zoneName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">+{item.recommendedChargers} Chargers</span>
                <span className={`text-[9px] font-black uppercase tracking-wider ${
                    item.priority === 'Critical' ? 'text-red-600' :
                    item.priority === 'High' ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {item.priority}
                </span>
              </div>
            </div>
            <button 
              onClick={() => onRemove(item.zoneId)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="font-bold text-slate-500">Total New Chargers</span>
          <span className="font-black text-slate-900 text-lg">{totalChargers}</span>
        </div>
        <button 
          onClick={onPlanSelected}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold shadow-sm transition-colors"
        >
          Generate Planning Proposal
        </button>
      </div>
    </div>
  );
};

export default PlanningQueue;
