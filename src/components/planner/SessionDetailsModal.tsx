import React, { useState } from 'react';
import { ChargingSession } from '../../types/planner';
import { X, AlertTriangle } from 'lucide-react';

interface SessionDetailsModalProps {
  session: ChargingSession;
  onClose: () => void;
}

const SessionDetailsModal: React.FC<SessionDetailsModalProps> = ({ session, onClose }) => {
  const [msg, setMsg] = useState('');

  const handleStop = () => {
    setMsg('Session termination requested.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200 flex flex-col overflow-hidden">
        
        {msg && (
          <div className="bg-orange-500 text-slate-900 text-sm font-bold text-center py-2 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" /> {msg}
          </div>
        )}

        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="font-bold text-slate-900">Session Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700">{session.id}</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Station</span>
              <span className="text-sm font-bold text-slate-900">{session.stationName}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Charger</span>
              <span className="text-sm font-bold text-slate-900">{session.chargerId}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Vehicle</span>
              <span className="text-sm font-bold text-slate-900">{session.vehicle}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Start Time</span>
              <span className="text-sm font-bold text-slate-900">{session.startTime}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Duration</span>
              <span className="text-sm font-bold text-slate-900">{session.durationMinutes} minutes</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Energy Delivered</span>
              <span className="text-sm font-black text-blue-600">{session.energyDeliveredKwh} kWh</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Battery State</span>
              <span className="text-sm font-bold text-slate-900">{session.currentBattery}% → {session.targetBattery}%</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex gap-3">
             <button 
                onClick={onClose}
                className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition-colors"
             >
                Close
             </button>
             <button 
                onClick={handleStop}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-slate-900 rounded-xl font-bold shadow-sm transition-all"
             >
                Stop Session
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SessionDetailsModal;
