import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { AIRecommendationResult } from '../../types/ai';

interface TrafficETAImpactProps {
  result: AIRecommendationResult;
}

const TrafficETAImpact: React.FC<TrafficETAImpactProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="h-5 w-5 text-slate-400" /> Traffic Intelligence
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Traffic</p>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              result.trafficCondition === 'Low' ? 'bg-green-500' :
              result.trafficCondition === 'Moderate' ? 'bg-amber-500' : 'bg-red-500'
            }`}></div>
            <p className="font-bold text-slate-900">{result.trafficCondition}</p>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Expected Delay</p>
          <p className="font-bold text-slate-900 flex items-center gap-1"><Clock className="h-4 w-4 text-slate-400" /> 6 min</p>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended Station Delay</p>
          <p className="font-bold text-slate-900">{result.etaImpactMin} min</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Route Impact</p>
          <p className={`font-bold ${
            result.etaImpactMin < 6 ? 'text-green-600' :
            result.etaImpactMin < 10 ? 'text-amber-600' : 'text-red-600'
          }`}>
            {result.etaImpactMin < 6 ? 'Low' : result.etaImpactMin < 10 ? 'Moderate' : 'High'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficETAImpact;
