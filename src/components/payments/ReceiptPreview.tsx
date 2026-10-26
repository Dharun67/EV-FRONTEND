import React, { useState } from 'react';
import { X, Download, Zap } from 'lucide-react';
import { Transaction } from '../../types/payment';

interface ReceiptPreviewProps {
  transaction: Transaction;
  onClose: () => void;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ transaction, onClose }) => {
  const [downloadMsg, setDownloadMsg] = useState('');

  const handleDownload = () => {
    setDownloadMsg('Receipt prepared');
    setTimeout(() => setDownloadMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {downloadMsg && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg z-50 text-sm">
            {downloadMsg}
          </div>
        )}

        <div className="bg-slate-900 text-white p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-black tracking-widest">GRIDWISE</h2>
          </div>
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Charging Receipt</p>
        </div>

        <div className="p-8 pb-4">
          <div className="text-center border-b-2 border-dashed border-slate-200 pb-6 mb-6">
            <p className="text-2xl font-black text-slate-900 mb-1">₹{Math.abs(transaction.amount).toLocaleString()}</p>
            <p className="text-sm font-bold text-slate-500">{transaction.description}</p>
            <p className="text-xs text-slate-400">Avinashi Road, Coimbatore</p>
          </div>

          <div className="space-y-4 text-sm mb-6 border-b-2 border-dashed border-slate-200 pb-6">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Date</span>
              <span className="text-slate-900 font-bold">{transaction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Time</span>
              <span className="text-slate-900 font-bold">10:45 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Connector</span>
              <span className="text-slate-900 font-bold">C-04</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Energy</span>
              <span className="text-slate-900 font-bold">37 kWh</span>
            </div>
          </div>

          <div className="space-y-3 text-sm mb-6 border-b-2 border-dashed border-slate-200 pb-6">
            <div className="flex justify-between">
              <span className="text-slate-500">Charging Cost</span>
              <span className="text-slate-900 font-medium">₹666</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Booking Fee</span>
              <span className="text-slate-900 font-medium">₹10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Taxes</span>
              <span className="text-slate-900 font-medium">₹35</span>
            </div>
            <div className="flex justify-between text-base pt-2">
              <span className="text-slate-900 font-black">TOTAL</span>
              <span className="text-slate-900 font-black">₹{Math.abs(transaction.amount)}</span>
            </div>
          </div>

          <div className="text-center space-y-2 mb-6">
            <p className="text-xs text-slate-500">Transaction ID</p>
            <p className="text-[10px] font-mono font-bold bg-slate-50 py-1 rounded text-slate-700">{transaction.id}</p>
            <p className="text-xs font-black text-green-600 mt-2">PAID</p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handleDownload}
            className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
