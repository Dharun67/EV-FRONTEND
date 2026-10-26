import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { AITopScore } from '../components/ai/AITopScore';
import { InsightCardsList } from '../components/ai/InsightCardsList';
import { CrossDomainCorrelation } from '../components/ai/CrossDomainCorrelation';
import { TopRecommendationsList, DecisionSimulator } from '../components/ai/DecisionSimulator';
import Toast from '../components/shared/Toast';

import { getApi } from '../utils/api';
import { BrainCircuit, Check } from 'lucide-react';
import { AIBadge } from '../components/shared/AIBadge';

const AIInsights: React.FC = () => {
  const [toast, setToast] = useState<string|null>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [aiActivity, setAiActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchAI = async () => {
      try {
        const [insightsRes, recsRes] = await Promise.all([
          getApi<any>('stations').catch(() => []),
          getApi<any>('stations').catch(() => [])
        ]);
        
        // Map backend insights
        const mappedInsights = (insightsRes || []).map((ins: any, i: number) => ({
          id: `ins-${i}`,
          category: ins.type === 'DEMAND' ? 'Predictive' : 'Anomaly',
          title: ins.message,
          description: ins.note,
          impactScore: ins.severity === 'CRITICAL' ? 95 : 85,
          actionRequired: ins.severity === 'CRITICAL'
        }));

        setInsights(mappedInsights);
        setRecommendations(recsRes || []);
        
        // Optional: fetch AI activity if an endpoint exists, otherwise empty
        getApi<any>('stations').then(res => setAiActivity(res || [])).catch(() => setAiActivity([]));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAI();
  }, []);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-semibold text-slate-500">Processing AI Insights...</div>;
  }

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <PageHeader 
        title="AI Decision Center" 
        subtitle="Convert mobility, charging and infrastructure data into actionable decisions."
        badge={<AIBadge type="insight" />}
      />

      <div className="grid grid-cols-1 mb-8">
        <AITopScore />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-black text-slate-900 mb-4">Strategic Insights</h2>
        <InsightCardsList insights={insights} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <CrossDomainCorrelation />
        <DecisionSimulator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TopRecommendationsList recommendations={recommendations} />
        </div>
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent AI Activity</h2>
          <div className="space-y-4">
            {aiActivity.map(act => (
              <div key={act.id || act._id} className="flex gap-3 border-l-2 border-purple-200 pl-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">{act.description}</p>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{act.timestamp || new Date(act.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {aiActivity.length === 0 && (
              <div className="text-slate-500 text-sm italic">No recent AI activity recorded.</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-slate-900 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold">Executive Summary</h2>
        </div>
        <p className="text-xl font-medium text-slate-300 leading-relaxed mb-8">
          "GridWise AI recommends prioritizing infrastructure expansion in five high-demand zones while improving predictive maintenance and shifting fleet charging away from peak hours."
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setToast('Recommendations approved and queued.')}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Check className="w-5 h-5" />
            Approve All Recommendations
          </button>
          <button 
            onClick={() => setToast('Saved to Planning Queue.')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-slate-900 font-bold rounded-xl transition-colors"
          >
            Save to Planning Queue
          </button>
        </div>
      </div>
      
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AIInsights;
