import React from 'react';
import { CheckCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RescueSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md text-center max-w-lg mx-auto my-12 animate-in fade-in zoom-in duration-300">
      <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
        <CheckCircle className="w-10 h-10" />
      </div>
      
      <h2 className="text-3xl font-black text-slate-900 mb-2">Assistance Completed</h2>
      <p className="text-slate-500 font-medium mb-8">Your emergency rescue has been successfully resolved.</p>

      <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 grid grid-cols-2 gap-4 text-left">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Battery</p>
          <p className="text-xl font-black text-slate-900">38%</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Energy Delivered</p>
          <p className="text-xl font-black text-blue-600 flex items-center gap-1"><Zap className="w-4 h-4" /> 15 kWh</p>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Cost</p>
          <p className="text-xl font-black text-slate-900">₹499</p>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
          <p className="text-xl font-black text-slate-900">22 min</p>
        </div>
      </div>

      <div className="inline-block bg-green-100 text-green-800 font-bold px-4 py-2 rounded-full mb-8 text-sm uppercase tracking-wider border border-green-200">
        Status: Resolved
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md"
        >
          Back to Dashboard
        </button>
        <button 
          onClick={() => navigate('/dashboard')} // Mocking /trips since it's not built yet (Step 9 maybe?)
          className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
        >
          View Trip
        </button>
      </div>
    </div>
  );
};

export default RescueSuccess;
