import React, { useState, useEffect } from 'react';
import { Wallet, IndianRupee, ArrowUpRight, ArrowDownLeft, CreditCard, History, Plus, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1';

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const balRes = await axios.get(`${API_URL}/wallet/balance`);
        const txnRes = await axios.get(`${API_URL}/wallet/transactions`);
        if (balRes.data.success) {
          setBalance(balRes.data.data.balance);
        }
        if (txnRes.data.success) {
          setTransactions(txnRes.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="max-w-4xl mx-auto min-h-[calc(100vh-64px)] pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="w-8 h-8 text-green-600" /> 
            Wallet & Payments
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage your EV charging balance and history.</p>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl p-8 border border-green-200/30 relative overflow-hidden bg-green-500/5 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-gridwise-energy/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Available Balance</p>
            <h2 className="text-6xl font-black text-slate-900 flex items-center">
              <IndianRupee className="w-10 h-10 mr-1" />{balance.toFixed(2)}
            </h2>
            <div className="mt-4 flex items-center gap-2 bg-gridwise-ai/10 px-3 py-1.5 rounded-lg w-fit border border-blue-200/30">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-600">Auto-Pay Enabled</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-[#00c968] transition-colors shadow-[0_0_20px_rgba(0,230,118,0.3)]">
              <Plus className="w-5 h-5" /> Add Money
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-slate-200 text-slate-900 font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition-colors">
              <CreditCard className="w-5 h-5 text-slate-500" /> Payment Methods
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-slate-500" />
        <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><Zap className="w-8 h-8 animate-pulse text-green-600" /></div>
      ) : (
        <div className="space-y-4">
          {transactions.length === 0 ? (
             <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-8 text-center border border-slate-200 rounded-2xl">
               <p className="text-slate-500 font-medium">No recent transactions found.</p>
             </div>
          ) : (
            transactions.map((txn, idx) => (
              <div key={idx} className="bg-white shadow-sm border border-slate-200 rounded-xl p-5 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-green-200/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${txn.amount < 0 ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-200/30'}`}>
                    {txn.amount < 0 ? <ArrowUpRight className="w-6 h-6 text-red-500" /> : <ArrowDownLeft className="w-6 h-6 text-green-600" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">{txn.description}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">{new Date(txn.date).toLocaleString()} • {txn.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg ${txn.amount < 0 ? 'text-slate-900' : 'text-green-600'}`}>
                    {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toFixed(2)}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">{txn.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Payments;
