import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const CurrentLocationCard: React.FC = () => {
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setMessage('Location updated');
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-slate-400" /> Your Current Location
      </h3>
      
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
        <p className="text-lg font-black text-slate-900 mb-1">Coimbatore, Tamil Nadu</p>
        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Coordinates</p>
            <p className="text-sm font-bold text-slate-700">11.0168° N, 76.9558° E</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Accuracy</p>
            <p className="text-sm font-bold text-slate-700">±20 m</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button 
          onClick={handleUpdate}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Navigation className={`w-4 h-4 ${updating ? 'animate-spin' : ''}`} /> 
          {updating ? 'Updating...' : 'Update Location'}
        </button>
        {message && <span className="text-xs font-bold text-green-600 animate-in fade-in">{message}</span>}
      </div>
    </div>
  );
};

export default CurrentLocationCard;
