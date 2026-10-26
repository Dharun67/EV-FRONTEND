import React, { useState } from 'react';
import { AITopRecommendation } from '../../types/ai';
import { Target, Zap, TrendingUp } from 'lucide-react';
import Toast from '../shared/Toast';

interface Props {
  recommendations: AITopRecommendation[];
}

export const TopRecommendationsList: React.FC<Props> = ({ recommendations }) => {
  const [toast, setToast] = useState<string|null>(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
      <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-blue-600" /> Top Recommendations
      </h2>

      <div className="flex-1 space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={rec.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4 hover:border-slate-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center shrink-0 text-xs">
                {idx + 1}
              </div>
              <div>
                <p className="font-bold text-slate-900">{rec.action}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs font-bold ${rec.impact === 'High' ? 'text-red-500' : 'text-orange-500'}`}>Impact: {rec.impact}</span>
                  <span className="text-xs font-bold text-purple-600">Confidence: {rec.confidence}%</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setToast('Action queued for approval.')}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
            >
              Take Action
            </button>
          </div>
        ))}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export const DecisionSimulator: React.FC = () => {
  const [scenario, setScenario] = useState<number>(0);
  
  const scenarios = [
    { name: 'No Action', coverage: '68%', util: '92%', rev: '₹2.6 Cr', gap: 'High' },
    { name: 'Add 20 Chargers', coverage: '75%', util: '85%', rev: '₹3.1 Cr', gap: 'Medium' },
    { name: 'Add 40 Chargers', coverage: '88%', util: '78%', rev: '₹3.8 Cr', gap: 'Low' },
    { name: 'Optimize Existing', coverage: '70%', util: '88%', rev: '₹2.9 Cr', gap: 'Medium' },
  ];

  const current = scenarios[scenario];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-orange-500" /> What-If Simulator
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {scenarios.map((s, i) => (
          <button 
            key={i}
            onClick={() => setScenario(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              scenario === i ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex-1 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Coverage</p>
          <p className="text-xl font-bold text-slate-900">{current.coverage}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Utilization</p>
          <p className="text-xl font-bold text-slate-900">{current.util}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Projected Rev</p>
          <p className="text-xl font-bold text-emerald-600">{current.rev}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Capacity Gap</p>
          <p className={`text-xl font-bold ${current.gap === 'High' ? 'text-red-500' : current.gap === 'Medium' ? 'text-orange-500' : 'text-green-500'}`}>{current.gap}</p>
        </div>
      </div>
      <p className="text-xs text-center font-bold text-slate-400 mt-4 uppercase tracking-wider">Predictive AI Forecast</p>
    </div>
  );
};
