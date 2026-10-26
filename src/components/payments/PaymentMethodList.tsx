import React from 'react';
import { PaymentMethod } from '../../types/payment';
import { Smartphone, CreditCard, Landmark, Plus, Trash2, Edit2 } from 'lucide-react';

interface PaymentMethodListProps {
  methods: PaymentMethod[];
  onSetPrimary: (id: string) => void;
  onAddMethod: () => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ methods, onSetPrimary, onAddMethod }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 text-lg">Payment Methods</h3>
        <button 
          onClick={onAddMethod}
          className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Method
        </button>
      </div>

      <div className="space-y-4">
        {methods.map(method => (
          <div key={method.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white hover:border-slate-300 transition-colors">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                {method.type === 'UPI' && <Smartphone className="w-6 h-6 text-purple-600" />}
                {method.type === 'Card' && <CreditCard className="w-6 h-6 text-blue-600" />}
                {method.type === 'Net Banking' && <Landmark className="w-6 h-6 text-slate-600" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  {method.label}
                  {method.isPrimary && (
                    <span className="bg-blue-600/10 text-blue-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                      PRIMARY
                    </span>
                  )}
                </h4>
                <p className="text-xs font-medium text-slate-500 mt-1">{method.maskedDetails}</p>
                {method.type === 'Card' && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Expires: 09/29</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-0 border-t border-slate-100 sm:border-0 w-full sm:w-auto justify-between sm:justify-end">
              {!method.isPrimary && (
                <button 
                  onClick={() => onSetPrimary(method.id)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Set as Primary
                </button>
              )}
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodList;
