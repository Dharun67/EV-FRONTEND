import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import AutoTopUpSettings from './AutoTopUpSettings';

interface PaymentPreferencesProps {
  prefs: any;
  onUpdate: (newPrefs: any) => void;
}

const PaymentPreferences: React.FC<PaymentPreferencesProps> = ({ prefs, onUpdate }) => {
  const [showAutoTopUpModal, setShowAutoTopUpModal] = useState(false);

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </button>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Settings className="w-5 h-5 text-slate-400" /> Payment Preferences
      </h3>

      {showAutoTopUpModal && (
        <AutoTopUpSettings 
          prefs={prefs} 
          onSave={(p) => { onUpdate({ ...prefs, ...p }); setShowAutoTopUpModal(false); }} 
          onClose={() => setShowAutoTopUpModal(false)} 
        />
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Auto Top-up</h4>
            <p className="text-xs font-medium text-slate-500">Automatically add funds when balance is low</p>
          </div>
          <div className="flex items-center gap-4">
            {prefs.autoTopUp && (
              <button onClick={() => setShowAutoTopUpModal(true)} className="text-xs font-bold text-blue-600 hover:underline">
                Settings
              </button>
            )}
            <Toggle active={prefs.autoTopUp} onClick={() => {
              if (!prefs.autoTopUp) setShowAutoTopUpModal(true);
              else onUpdate({ ...prefs, autoTopUp: false });
            }} />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Low Balance Alerts</h4>
            <p className="text-xs font-medium text-slate-500">Get notified when balance falls below ₹500</p>
          </div>
          <Toggle active={prefs.lowBalanceAlerts} onClick={() => onUpdate({ ...prefs, lowBalanceAlerts: !prefs.lowBalanceAlerts })} />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Payment Notifications</h4>
            <p className="text-xs font-medium text-slate-500">Receive alerts for all transactions</p>
          </div>
          <Toggle active={prefs.paymentNotifications} onClick={() => onUpdate({ ...prefs, paymentNotifications: !prefs.paymentNotifications })} />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Receipt Notifications</h4>
            <p className="text-xs font-medium text-slate-500">Email receipts after charging</p>
          </div>
          <Toggle active={prefs.receiptNotifications} onClick={() => onUpdate({ ...prefs, receiptNotifications: !prefs.receiptNotifications })} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPreferences;
