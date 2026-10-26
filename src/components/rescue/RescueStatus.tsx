import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface RescueStatusProps {
  status: string;
}

const RescueStatus: React.FC<RescueStatusProps> = ({ status }) => {
  const steps = [
    { label: 'Request Received', key: 'REQUESTED' },
    { label: 'Rescue Assigned', key: 'ASSIGNED' },
    { label: 'On The Way', key: 'ON_THE_WAY' },
    { label: 'Arriving', key: 'ARRIVING' },
    { label: 'Completed', key: 'COMPLETED' },
  ];

  const getStepIndex = () => {
    switch (status) {
      case 'SEARCHING': return 0;
      case 'RESCUE ASSIGNED': return 1;
      case 'ON THE WAY': return 2;
      case 'ARRIVING': return 3;
      case 'COMPLETED': return 4;
      default: return -1;
    }
  };

  const currentIndex = getStepIndex();

  if (status === 'SEARCHING') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-6 text-center">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-gridwise-blue rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Finding the nearest rescue unit...</h3>
        <p className="text-slate-500 font-medium">Matching available assistance in your area.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">Rescue Unit Assigned</h3>
          <p className="text-sm font-bold text-slate-500">GRID RESCUE 01</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ETA</p>
          <p className="text-2xl font-black text-blue-600">12 min</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Distance</p>
          <p className="font-bold text-slate-900">3.4 km</p>
        </div>
        <div className="w-px h-8 bg-slate-200"></div>
        <div className="flex-1 text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service</p>
          <p className="font-bold text-slate-900">Mobile EV Charging</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-slate-900 ${
                idx <= currentIndex ? 'bg-green-500' : 'bg-slate-200 text-transparent'
              }`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
        <div className="relative -mt-5 mb-4 z-0">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2"></div>
           <div 
            className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
           ></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-slate-500 px-1">
          {steps.map((step, idx) => (
            <span key={idx} className={`w-12 text-center ${idx <= currentIndex ? 'text-slate-900' : ''}`}>
              {step.label}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" /> Rescue Status
        </h4>
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-xs font-bold text-slate-400 w-12">14:32</span>
            <span className="text-sm font-bold text-slate-900">Request received</span>
          </div>
          {currentIndex >= 1 && (
            <div className="flex gap-4">
              <span className="text-xs font-bold text-slate-400 w-12">14:33</span>
              <span className="text-sm font-bold text-slate-900">Rescue unit assigned</span>
            </div>
          )}
          {currentIndex >= 2 && (
            <div className="flex gap-4">
              <span className="text-xs font-bold text-slate-400 w-12">14:35</span>
              <span className="text-sm font-bold text-blue-600">Rescue vehicle approaching</span>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-4 font-medium italic">Last updated just now</p>
      </div>
    </div>
  );
};

export default RescueStatus;
