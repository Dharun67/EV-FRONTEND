import React, { useState } from 'react';
import { Phone, ShieldAlert, Wrench } from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  const [notification, setNotification] = useState('');

  const handleAction = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 relative overflow-hidden">
      {notification && (
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-xs font-bold text-center py-2 animate-in slide-in-from-top-2 z-10">
          {notification}
        </div>
      )}

      <h3 className="font-bold text-slate-900 mb-6 pt-2">Emergency Contacts</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
          <div>
            <h4 className="font-bold text-slate-900">GridWise Support</h4>
            <p className="text-xs font-medium text-slate-500">24/7 Assistance</p>
          </div>
          <button 
            onClick={() => handleAction('Calling GridWise Support...')}
            className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            aria-label="Contact Support"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
          <div>
            <h4 className="font-bold text-slate-900">Roadside Assistance</h4>
            <p className="text-xs font-medium text-slate-500">Towing & Repair</p>
          </div>
          <button 
            onClick={() => handleAction('Requesting Roadside Assistance...')}
            className="p-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            aria-label="Request Assistance"
          >
            <Wrench className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-red-100 bg-red-50">
          <div>
            <h4 className="font-bold text-red-900">Emergency Services</h4>
            <p className="text-xs font-medium text-red-700">Police / Ambulance</p>
          </div>
          <button 
            onClick={() => handleAction('Initiating Emergency Call...')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" /> Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
