import React from 'react';
import { Transaction } from '../../types/payment';
import { X, Receipt } from 'lucide-react';

interface TransactionDetailsModalProps {
  transaction: Transaction;
  onClose: () => void;
  onViewReceipt: () => void;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ transaction, onClose, onViewReceipt }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        <div className="p-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl z-10">
          <h2 className="font-bold text-slate-900">Transaction Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Amount</p>
            <p className={`text-4xl font-black ${transaction.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
              {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
            </p>
            <p className="text-sm font-bold text-slate-500 mt-2">{transaction.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Transaction ID</span>
              <span className="text-xs font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{transaction.id}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Type</span>
              <span className="text-sm font-bold text-slate-900">{transaction.type}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Date & Time</span>
              <span className="text-sm font-bold text-slate-900">{transaction.date} • 10:45 PM</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Payment Method</span>
              <span className="text-sm font-bold text-slate-900">{transaction.paymentMethod}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Status</span>
              <span className="text-xs font-black uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                {transaction.status}
              </span>
            </div>
          </div>

          {transaction.type === 'Charging' && (
            <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cost Breakdown</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Energy (37 kWh @ ₹18)</span>
                <span className="font-medium text-slate-900">₹666</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Booking Fee</span>
                <span className="font-medium text-slate-900">₹10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Taxes</span>
                <span className="font-medium text-slate-900">₹35</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200 mt-2">
                <span className="text-slate-900">Total</span>
                <span className="text-slate-900">₹711</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-white rounded-b-3xl">
          <div className="flex gap-3">
             <button 
                onClick={onClose}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
             >
                Close
             </button>
             {transaction.type === 'Charging' && (
               <button 
                  onClick={onViewReceipt}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2"
               >
                  <Receipt className="w-4 h-4" /> View Receipt
               </button>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionDetailsModal;
