import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface AIAnalysisStatusProps {
  isAnalyzing: boolean;
}

const AIAnalysisStatus: React.FC<AIAnalysisStatusProps> = ({ isAnalyzing }) => {
  const [factors, setFactors] = useState([
    { label: 'Battery State', checked: false },
    { label: 'Route Distance', checked: false },
    { label: 'Station Availability', checked: false },
    { label: 'Traffic Conditions', checked: false },
    { label: 'Charging Speed', checked: false },
    { label: 'Pricing', checked: false },
    { label: 'ETA Impact', checked: false }
  ]);

  useEffect(() => {
    if (isAnalyzing) {
      setFactors(factors.map(f => ({ ...f, checked: false })));
      // Simulate sequential analysis
      factors.forEach((factor, index) => {
        setTimeout(() => {
          setFactors(prev => {
            const next = [...prev];
            next[index].checked = true;
            return next;
          });
        }, 150 * (index + 1));
      });
    } else {
      setFactors(factors.map(f => ({ ...f, checked: true })));
    }
  }, [isAnalyzing]);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-slate-900 shadow-md mb-6 relative overflow-hidden border border-slate-700">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="h-32 w-32" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          {isAnalyzing ? (
            <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
          ) : (
            <Sparkles className="h-6 w-6 text-purple-400" />
          )}
          <h2 className="text-xl font-bold">AI Analysis</h2>
        </div>
        <p className="text-slate-300 text-sm mb-6">
          {isAnalyzing ? "Evaluating available charging options..." : "Analysis Complete"}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {factors.map((factor, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm font-medium">
              {factor.checked ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-slate-600"></div>
              )}
              <span className={factor.checked ? 'text-slate-900' : 'text-slate-400'}>{factor.label}</span>
            </div>
          ))}
        </div>

        {!isAnalyzing && (
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Last analyzed: Just now
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysisStatus;
