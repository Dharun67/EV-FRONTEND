import React from 'react';

interface RescueRequestModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const RescueRequestModal: React.FC<RescueRequestModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Request Emergency Assistance?</h2>
        <p className="text-slate-500 font-medium mb-6">
          GridWise will create a simulated emergency assistance request using your current vehicle location.
        </p>
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500">Battery</span>
            <span className="text-sm font-black text-red-600">18%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500">Location</span>
            <span className="text-sm font-black text-slate-900">Coimbatore</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500">Assistance</span>
            <span className="text-sm font-black text-slate-900">Mobile EV Charging</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <span className="text-sm font-bold text-slate-500">Estimated ETA</span>
            <span className="text-sm font-black text-slate-900">18 min</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-slate-900 rounded-xl font-bold shadow-md transition-all text-lg"
          >
            Confirm Request
          </button>
          <button 
            onClick={onCancel}
            className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescueRequestModal;
