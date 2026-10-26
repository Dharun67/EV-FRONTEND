import React from 'react';
import { PredictiveMaintenanceRisk } from '../../types/maintenance';
import { AIBadge } from '../shared/AIBadge';
import { AlertOctagon } from 'lucide-react';

interface Props {
  risks: PredictiveMaintenanceRisk[];
}

export const PredictiveMaintenanceAI: React.FC<Props> = ({ risks }) => {
  const topRisk = risks[0];

  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-slate-900 shadow-lg relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold">Predictive Maintenance</h2>
          </div>
          <AIBadge type="insight" />
        </div>
        
        {topRisk && (
          <div className="bg-white/10 rounded-xl p-4 border border-white/10 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-purple-200 uppercase tracking-wider">Asset: {topRisk.assetId}</span>
                <span className="text-sm font-black text-slate-900 bg-purple-500/50 px-2 py-0.5 rounded">Risk: {topRisk.riskScore}%</span>
              </div>
              <p className="text-slate-900 font-medium mb-3">
                <span className="text-purple-300">Predicted Issue:</span> {topRisk.predictedIssue}
              </p>
            </div>
            
            <div className="bg-purple-900/50 p-3 rounded-lg border border-purple-500/30">
              <p className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">Recommended Action</p>
              <p className="text-sm text-slate-900">{topRisk.recommendedAction}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
