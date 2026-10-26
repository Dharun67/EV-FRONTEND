import React from 'react';
import { AIInsightCard } from '../../types/ai';
import { Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import { AIBadge } from '../shared/AIBadge';

interface Props {
  insights: AIInsightCard[];
}

export const InsightCardsList: React.FC<Props> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map(item => (
        <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-purple-300 hover:shadow-md transition-all flex flex-col h-full group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase tracking-wider">{item.category} Insight</span>
            <AIBadge type="confidence" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{item.insight}</h3>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Evidence</p>
                <p className="text-sm font-medium text-slate-600">{item.evidence}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  Impact
                  {item.impact === 'High' && <AlertTriangle className="w-3 h-3 text-red-500" />}
                </p>
                <p className={`text-sm font-bold ${item.impact === 'High' ? 'text-red-600' : 'text-orange-600'}`}>{item.impact}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 mt-4 group-hover:bg-purple-100 transition-colors">
            <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Recommendation
            </p>
            <p className="text-sm font-bold text-purple-900">{item.recommendation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
