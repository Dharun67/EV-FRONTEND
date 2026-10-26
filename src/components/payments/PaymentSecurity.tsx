import React from 'react';
import { Shield, ShieldAlert, Lock, EyeOff, Activity } from 'lucide-react';

const PaymentSecurity: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-slate-400" /> Payment Security
      </h3>

      <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl mb-6 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-blue-800 leading-snug">
          GridWise does not display or store complete payment credentials in this frontend prototype.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
          <Lock className="w-6 h-6 text-slate-600 mb-2" />
          <p className="text-xs font-bold text-slate-900">Encrypted Details</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
          <EyeOff className="w-6 h-6 text-slate-600 mb-2" />
          <p className="text-xs font-bold text-slate-900">Masked Info</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
          <Shield className="w-6 h-6 text-slate-600 mb-2" />
          <p className="text-xs font-bold text-slate-900">Secure Processing</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
          <Activity className="w-6 h-6 text-slate-600 mb-2" />
          <p className="text-xs font-bold text-slate-900">Monitoring</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSecurity;
