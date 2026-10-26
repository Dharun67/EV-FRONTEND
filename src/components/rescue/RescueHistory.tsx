import React from 'react';
import { History } from 'lucide-react';

interface RescueHistoryProps {
  records: Array<{
    id: string;
    date: string;
    type: string;
    status: string;
    cost: number;
  }>;
}

const RescueHistory: React.FC<RescueHistoryProps> = ({ records }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <History className="w-5 h-5 text-slate-400" /> Recent Rescue Assistance
      </h3>

      <div className="space-y-4 mb-6">
        {records.map(record => (
          <div key={record.id} className="flex justify-between items-center pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{record.date}</p>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{record.type}</h4>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                {record.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cost</p>
              <p className="font-black text-slate-900">₹{record.cost}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
        View Rescue History
      </button>
    </div>
  );
};

export default RescueHistory;
