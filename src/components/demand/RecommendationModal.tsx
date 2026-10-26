import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface RecommendationModalProps {
  onClose: () => void;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ onClose }) => {
  const [approved, setApproved] = useState(false);

  if (approved) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in duration-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-black text-xl text-slate-900 mb-2">Recommendation added to planning queue.</h2>
          <p className="text-sm font-medium text-slate-500 mb-6">The expansion proposal for Gandhipuram has been simulated successfully.</p>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-900 rounded-xl font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200 flex flex-col overflow-hidden">
        
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="font-bold text-slate-900">Gandhipuram Expansion Recommendation</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Current Chargers</span>
              <span className="text-sm font-bold text-slate-900">18</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Projected Demand</span>
              <span className="text-sm font-black text-red-600">94 / 100</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Projected Utilization</span>
              <span className="text-sm font-bold text-slate-900">96%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Capacity Gap</span>
              <span className="text-sm font-bold text-red-600">7 chargers</span>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl my-4">
              <p className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-2">Recommended Addition</p>
              <p className="font-black text-blue-600 text-lg">7 DC Fast Chargers</p>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Estimated Additional Daily Sessions</span>
              <span className="text-sm font-bold text-green-600">+86</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Estimated Revenue Potential</span>
              <span className="text-sm font-bold text-green-600">₹12,600/day</span>
            </div>
            
            <div className="flex items-start gap-2 mt-4 bg-orange-50 p-3 rounded-lg border border-orange-100">
              <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-bold text-orange-800 block mb-1">Risk</span>
                <span className="text-xs font-medium text-orange-700">High congestion without expansion.</span>
              </div>
            </div>

            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-4">ALL VALUES SIMULATED</p>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex gap-3">
             <button 
                onClick={onClose}
                className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition-colors"
             >
                Close
             </button>
             <button 
                onClick={() => setApproved(true)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold shadow-sm transition-all"
             >
                Approve for Planning
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecommendationModal;
