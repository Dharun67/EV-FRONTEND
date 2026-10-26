import React from 'react';
import { Sparkles } from 'lucide-react';

const TripInsight: React.FC = () => {
  return (
    <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6 shadow-sm mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-purple-900 flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-purple-600" /> GridWise AI Trip Insight
        </h3>
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-purple-200 hidden sm:block">
          AI INSIGHT
        </span>
      </div>
      <p className="text-purple-800 font-medium leading-relaxed">
        Your recent trips show improving energy efficiency. Short urban trips are averaging <span className="font-bold text-purple-900">5.2 km/kWh</span>, while longer highway trips average <span className="font-bold text-purple-900">4.8 km/kWh</span>.
      </p>
    </div>
  );
};

export default TripInsight;
