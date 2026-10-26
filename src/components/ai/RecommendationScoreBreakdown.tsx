import React from 'react';
import { AIRecommendationResult } from '../../types/ai';

interface RecommendationScoreBreakdownProps {
  result: AIRecommendationResult;
}

const RecommendationScoreBreakdown: React.FC<RecommendationScoreBreakdownProps> = ({ result }) => {
  const scores = [
    { label: 'Availability', value: result.availabilityScore, color: 'bg-green-500' },
    { label: 'Charging Speed', value: result.speedScore, color: 'bg-blue-500' },
    { label: 'Price', value: result.priceScore, color: 'bg-indigo-500' },
    { label: 'Traffic', value: result.trafficScore, color: 'bg-orange-500' },
    { label: 'Distance', value: result.distanceScore, color: 'bg-teal-500' },
    { label: 'Rating', value: result.ratingScore, color: 'bg-amber-400' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900">Recommendation Score Breakdown</h3>
        <div className="bg-slate-100 px-3 py-1 rounded-lg text-sm font-black text-slate-700">
          Overall: {result.overallScore}%
        </div>
      </div>
      
      <div className="space-y-4">
        {scores.map((score, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>{score.label}</span>
              <span>{score.value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${score.color} transition-all duration-1000`} 
                style={{ width: `${score.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationScoreBreakdown;
