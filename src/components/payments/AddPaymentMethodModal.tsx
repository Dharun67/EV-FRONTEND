import React, { useState } from 'react';
import { X, Smartphone, CreditCard, Landmark, ShieldCheck } from 'lucide-react';

interface AddPaymentMethodModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ onClose, onSuccess }) => {
  const [selectedType, setSelectedType] = useState<'UPI' | 'Card' | 'NetBanking' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Add Payment Method</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl mb-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-blue-800 leading-snug">
              Use mock details only. This frontend does not process real payments or store real credentials.
            </p>
          </div>

          {!selectedType ? (
            <div className="space-y-3">
              <button onClick={() => setSelectedType('UPI')} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-gridwise-blue hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-slate-900">UPI</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-gridwise-blue"></div>
              </button>
              <button onClick={() => setSelectedType('Card')} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-gridwise-blue hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-slate-900">Debit / Credit Card</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-gridwise-blue"></div>
              </button>
              <button onClick={() => setSelectedType('NetBanking')} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-gridwise-blue hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Landmark className="w-5 h-5 text-slate-600" />
                  <span className="font-bold text-slate-900">Net Banking</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-gridwise-blue"></div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedType === 'Card' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Cardholder Name</label>
                    <input type="text" placeholder="Mock Name" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gridwise-blue" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gridwise-blue" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Expiry</label>
                      <input type="text" placeholder="MM/YY" maxLength={5} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gridwise-blue" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">CVV</label>
                      <input type="password" placeholder="***" maxLength={4} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gridwise-blue" />
                    </div>
                  </div>
                </>
              )}

              {selectedType === 'UPI' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">UPI ID</label>
                  <input type="text" placeholder="mock@upi" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gridwise-blue" />
                </div>
              )}

              {selectedType === 'NetBanking' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Select Bank</label>
                  <select required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gridwise-blue">
                    <option value="">Choose mock bank</option>
                    <option value="sbi">Mock Bank 1</option>
                    <option value="hdfc">Mock Bank 2</option>
                    <option value="icici">Mock Bank 3</option>
                  </select>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedType(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold shadow-md transition-all"
                >
                  Save Method
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;
