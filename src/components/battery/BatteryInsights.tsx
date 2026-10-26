import React from 'react';
import { BatteryInsight } from '../../types/battery';
import { Sparkles, HeartPulse, BatteryCharging, Zap } from 'lucide-react';

interface BatteryInsightsProps {
  insights: BatteryInsight[];
}

const BatteryInsights: React.FC<BatteryInsightsProps> = ({ insights }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-purple-100 p-1.5 rounded-lg border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" />
        </div>
        <h3 className="font-bold text-slate-900">GridWise AI Battery Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map(insight => {
          let Icon = HeartPulse;
          if (insight.type === 'charging') Icon = BatteryCharging;
          if (insight.type === 'range') Icon = Zap;

          return (
            <div key={insight.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-900 text-sm">{insight.title}</h4>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                "{insight.description}"
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default BatteryInsights;
