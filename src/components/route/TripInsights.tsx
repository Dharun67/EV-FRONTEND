import React from 'react';
import { Sparkles, Check } from 'lucide-react';

const TripInsights: React.FC = () => {
  const insights = [
    "Energy efficient",
    "No charging stop required",
    "Moderate traffic",
    "Safe battery reserve"
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-5 shadow-sm mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="h-24 w-24 text-purple-600" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
          <h3 className="font-bold text-slate-900">AI Trip Insights</h3>
          <span className="ml-auto bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">AI</span>
        </div>
        
        <p className="text-sm text-slate-700 font-medium mb-4 leading-relaxed">
          "Your selected route avoids heavy traffic and keeps sufficient battery reserve."
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white/60 p-2 rounded-lg border border-white/40">
              <Check className="h-3.5 w-3.5 text-purple-500" />
              {insight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripInsights;
