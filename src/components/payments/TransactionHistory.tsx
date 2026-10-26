import React from 'react';
import { Transaction } from '../../types/payment';
import { Search, Zap, Plus, AlertTriangle, CornerUpLeft, Calendar, ArrowRight } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onSelect: (t: Transaction) => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, onSelect }) => {
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'Charging': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'Wallet Top-up': return <Plus className="w-4 h-4 text-green-500" />;
      case 'Emergency Rescue': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'Refund': return <CornerUpLeft className="w-4 h-4 text-purple-500" />;
      case 'Booking': return <Calendar className="w-4 h-4 text-indigo-500" />;
      default: return <ArrowRight className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'Refunded': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">No transactions found.</p>
        </div>
      ) : (
        transactions.map(txn => (
          <div 
            key={txn.id}
            onClick={() => onSelect(txn)}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-gridwise-blue hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                {getIcon(txn.type)}
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-0.5">{txn.description}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>{txn.date}</span>
                  <span>•</span>
                  <span>{txn.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t border-slate-100 sm:border-0 pt-3 sm:pt-0">
              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor(txn.status)}`}>
                {txn.status}
              </span>
              <div className="text-right min-w-[80px]">
                <p className={`font-black text-lg ${txn.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                  {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{txn.paymentMethod}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionHistory;
