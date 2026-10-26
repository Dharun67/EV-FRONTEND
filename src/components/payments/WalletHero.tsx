import React from 'react';
import { WalletCards, Plus, History, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from '../../types/payment';

interface WalletHeroProps {
  wallet: Wallet;
  onAddMoney: () => void;
  onViewHistory: () => void;
}

const WalletHero: React.FC<WalletHeroProps> = ({ wallet, onAddMoney, onViewHistory }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-900 rounded-3xl p-8 shadow-md relative overflow-hidden mb-6 text-slate-900">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <WalletCards className="w-6 h-6 text-slate-300" />
            <h2 className="text-lg font-bold text-slate-300 tracking-wide uppercase">GridWise Wallet</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-400 mb-1">Balance</p>
            <p className="text-5xl font-black">₹{(wallet?.balance ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Available Balance</p>
              <p className="text-lg font-bold text-slate-900">₹{(wallet?.balance ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pending</p>
              <p className="text-lg font-bold text-slate-300">₹{(wallet?.pendingBalance ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reward Credits</p>
              <p className="text-lg font-bold text-green-400">₹{wallet?.rewardCredits ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button 
            onClick={onAddMoney}
            className="w-full md:w-48 py-4 bg-blue-600 hover:bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" /> Add Money
          </button>
          <button 
            onClick={onViewHistory}
            className="w-full md:w-48 py-4 bg-slate-800 hover:bg-slate-700 text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <History className="w-5 h-5" /> Transaction History
          </button>
          <button 
            onClick={() => navigate('/trips')}
            className="w-full md:w-48 py-4 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Map className="w-5 h-5" /> View Trip History
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletHero;
