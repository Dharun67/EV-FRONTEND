import React from 'react';
import { X, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { PlanningQueueItem } from '../../types/infrastructure';

interface PlanningQueueModalProps {
  queue: PlanningQueueItem[];
  onClose: () => void;
  onClear: () => void;
}

const PlanningQueueModal: React.FC<PlanningQueueModalProps> = ({ queue, onClose, onClear }) => {
  const totalChargers = queue.reduce((sum, item) => sum + item.recommendedChargers, 0);
  const estimatedCost = (totalChargers * 0.15).toFixed(2); // Rough estimate 15L per charger

  const handleSubmit = () => {
    onClear();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="bg-slate-50 border-b border-slate-200 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Expansion Proposal Generated</h3>
              <p className="text-xs font-medium text-slate-500">Draft ready for CPO approval</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Zones</p>
              <p className="font-black text-slate-900 text-2xl">{queue.length}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">New Chargers</p>
              <p className="font-black text-slate-900 text-2xl">{totalChargers}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Est. Capital</p>
              <p className="font-black text-slate-900 text-2xl">₹{estimatedCost} <span className="text-sm">Cr</span></p>
            </div>
          </div>

          <h4 className="font-bold text-slate-900 mb-3 text-sm">Included in Proposal:</h4>
          <div className="space-y-2 mb-8 max-h-48 overflow-y-auto custom-scrollbar">
            {queue.map(item => (
              <div key={item.zoneId} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-700 text-sm">{item.zoneName}</span>
                <div className="flex gap-4 text-xs font-bold">
                  <span className="text-slate-500">{item.recommendedChargers} Chargers</span>
                  <span className={item.priority === 'Critical' ? 'text-red-600' : 'text-orange-600'}>{item.priority}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2"
            >
              Submit for Approval <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlanningQueueModal;
