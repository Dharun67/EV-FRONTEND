import React, { useState } from 'react';
import { Phone, MessageSquare, Star, Truck } from 'lucide-react';

const RescueVehicleCard: React.FC = () => {
  const [notification, setNotification] = useState('');

  const handleCall = () => {
    setNotification('Calling rescue driver...');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleMessage = () => {
    setNotification('Opening secure message channel...');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 relative overflow-hidden">
      {notification && (
        <div className="absolute top-0 left-0 w-full bg-blue-600 text-white text-xs font-bold text-center py-2 animate-in slide-in-from-top-2 z-10">
          {notification}
        </div>
      )}

      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 pt-2">
        <Truck className="w-5 h-5 text-slate-400" /> Rescue Vehicle
      </h3>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-xl font-bold text-slate-600">
          AK
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-lg">Arun Kumar</h4>
          <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
            <Star className="w-4 h-4 fill-current" /> 4.9 <span className="text-slate-500 font-medium ml-1">GridWise Rescuer</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</span>
          <span className="font-bold text-slate-900">Mobile EV Rescue Van</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registration</span>
          <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">TN-38-ER-2048</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ETA</span>
          <span className="font-black text-blue-600 text-lg">12 min</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleCall}
          className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Phone className="w-4 h-4" /> Call Driver
        </button>
        <button 
          onClick={handleMessage}
          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare className="w-4 h-4" /> Message
        </button>
      </div>
    </div>
  );
};

export default RescueVehicleCard;
