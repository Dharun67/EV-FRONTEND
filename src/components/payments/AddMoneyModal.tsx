import React, { useState } from 'react';
import { X, CheckCircle, Smartphone, CreditCard, Landmark, Wallet as WalletIcon, Loader2 } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';

interface AddMoneyModalProps {
  onClose: () => void;
  onSuccess: (amount: number, methodId: string) => void;
  savedMethods: PaymentMethod[];
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ onClose, onSuccess, savedMethods }) => {
  const [step, setStep] = useState<'AMOUNT' | 'METHOD' | 'PROCESSING' | 'SUCCESS'>('AMOUNT');
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  
  const presetAmounts = [100, 250, 500, 1000, 2000, 5000];

  const handleContinue = () => {
    if (step === 'AMOUNT') {
      const finalAmount = customAmount ? parseInt(customAmount) : amount;
      if (finalAmount > 0) {
        setAmount(finalAmount);
        setStep('METHOD');
      }
    } else if (step === 'METHOD') {
      if (selectedMethod) {
        setStep('PROCESSING');
        setTimeout(() => {
          setStep('SUCCESS');
        }, 2000);
      }
    }
  };

  const handleDone = () => {
    onSuccess(amount, selectedMethod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">
            {step === 'AMOUNT' ? 'Add Money to Wallet' : step === 'METHOD' ? 'Choose Payment Method' : step === 'SUCCESS' ? 'Payment Successful' : 'Processing Payment'}
          </h2>
          {step !== 'PROCESSING' && step !== 'SUCCESS' && (
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'AMOUNT' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map(val => (
                  <button 
                    key={val}
                    onClick={() => { setAmount(val); setCustomAmount(''); }}
                    className={`py-3 rounded-xl font-bold text-sm border transition-colors ${
                      amount === val && !customAmount
                        ? 'bg-blue-600 text-white border-gridwise-blue shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input 
                    type="number" 
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-gridwise-blue focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <button 
                onClick={handleContinue}
                disabled={(!amount && !customAmount) || !!(customAmount && parseInt(customAmount) <= 0)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 rounded-xl font-bold transition-all shadow-md mt-4"
              >
                Continue
              </button>
            </div>
          )}

          {step === 'METHOD' && (
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl mb-4">
                <p className="text-xs font-bold text-orange-800">
                  ⚠️ This is a simulated frontend payment. No real transaction will occur.
                </p>
              </div>

              {savedMethods.map(method => (
                <button 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    selectedMethod === method.id 
                      ? 'border-gridwise-blue bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                      {method.type === 'UPI' && <Smartphone className="w-5 h-5 text-purple-600" />}
                      {method.type === 'Card' && <CreditCard className="w-5 h-5 text-blue-600" />}
                      {method.type === 'Net Banking' && <Landmark className="w-5 h-5 text-slate-600" />}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">{method.label}</p>
                      <p className="text-xs font-medium text-slate-500">{method.maskedDetails}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id ? 'border-gridwise-blue bg-blue-600' : 'border-slate-300'
                  }`}>
                    {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
              
              <button 
                onClick={handleContinue}
                disabled={!selectedMethod}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 rounded-xl font-bold transition-all shadow-md mt-6"
              >
                Pay ₹{amount.toLocaleString()}
              </button>
            </div>
          )}

          {step === 'PROCESSING' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Processing Payment...</h3>
              <p className="text-sm font-medium text-slate-500">Please do not close this window.</p>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4 border-green-100">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Payment Successful</h3>
              <p className="text-slate-500 font-medium mb-6">Your wallet has been credited.</p>
              
              <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8 space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">Amount</span>
                  <span className="text-sm font-black text-slate-900">₹{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">Transaction ID</span>
                  <span className="text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">GW-TXN-{Date.now().toString().slice(-8)}</span>
                </div>
              </div>

              <button 
                onClick={handleDone}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddMoneyModal;
