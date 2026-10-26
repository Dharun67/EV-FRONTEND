import React from 'react';
import { Navigation, CheckCircle2 } from 'lucide-react';

interface NavigationModalProps {
  destination: string;
  onClose: () => void;
}

const NavigationModal: React.FC<NavigationModalProps> = ({ destination, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative z-10 flex flex-col p-6 text-center">
        <div className="mx-auto bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <Navigation className="h-8 w-8 text-green-500" />
        </div>
        
        <h2 className="text-xl font-bold text-slate-900 mb-2">Navigation Started</h2>
        <p className="text-slate-500 mb-6 font-medium">
          Your EV-aware route to <strong className="text-slate-700">{destination}</strong> is ready.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 flex items-center justify-center gap-2">
           <CheckCircle2 className="h-5 w-5 text-green-500" />
           <span className="text-sm font-bold text-slate-700">Pre-conditioning battery...</span>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
          >
            Close
          </button>
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-colors shadow-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationModal;
