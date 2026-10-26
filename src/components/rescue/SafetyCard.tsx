import React from 'react';
import { ShieldCheck } from 'lucide-react';

const SafetyCard: React.FC = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm mb-6">
      <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-green-600" /> While You Wait
      </h3>
      
      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
          <p className="text-sm font-medium text-green-800 leading-snug">Move the vehicle to a safe location if possible.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
          <p className="text-sm font-medium text-green-800 leading-snug">Turn on hazard lights.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
          <p className="text-sm font-medium text-green-800 leading-snug">Stay visible to other road users.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
          <p className="text-sm font-medium text-green-800 leading-snug">Avoid charging in unsafe conditions.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
          <p className="text-sm font-medium text-green-800 leading-snug">Remain inside the vehicle when roadside conditions are dangerous.</p>
        </li>
      </ul>
    </div>
  );
};

export default SafetyCard;
