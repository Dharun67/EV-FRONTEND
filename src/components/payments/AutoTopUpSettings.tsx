import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface AutoTopUpSettingsProps {
  prefs: any;
  onSave: (p: any) => void;
  onClose: () => void;
}

const AutoTopUpSettings: React.FC<AutoTopUpSettingsProps> = ({ prefs, onSave, onClose }) => {
  const [threshold, setThreshold] = useState(prefs.autoTopUpThreshold);
  const [amount, setAmount] = useState(prefs.autoTopUpAmount);
  const [method, setMethod] = useState(prefs.autoTopUpMethod);
  const [msg, setMsg] = useState('');

  const handleSave = () => {
    onSave({
      autoTopUp: true,
      autoTopUpThreshold: threshold,
      autoTopUpAmount: amount,
      autoTopUpMethod: method
    });
    setMsg('Auto top-up settings saved.');
    setTimeout(() => {
      setMsg('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {msg && (
          <div className="bg-green-500 text-white text-sm font-bold text-center py-2">
            <CheckCircle className="w-4 h-4 inline-block mr-2" />
            {msg}
          </div>
        )}

        <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Auto Top-up Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Trigger when balance falls below</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input 
                type="number" 
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-gridwise-blue"
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Top up amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-gridwise-blue"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Payment Method</label>
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-gridwise-blue"
            >
              <option value="pm-1">UPI (dharun@upi)</option>
              <option value="pm-2">Visa Card (•••• 4821)</option>
              <option value="pm-3">Mastercard (•••• 7294)</option>
            </select>
          </div>

          <p className="text-xs font-medium text-slate-500 italic text-center">
            No actual automatic payment occurs in this prototype.
          </p>

          <button 
            onClick={handleSave}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold shadow-md transition-all mt-4"
          >
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default AutoTopUpSettings;
