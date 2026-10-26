import React from 'react';
import { StationCandidate } from '../../types/stationRecommendation';
import { Zap, IndianRupee, TrendingUp, Users, Target } from 'lucide-react';
import { AIBadge } from '../shared/AIBadge';

interface Props {
  location: StationCandidate;
}

const TopLocationCard: React.FC<Props> = ({ location }) => {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 text-slate-900 shadow-lg relative overflow-hidden mb-6 h-full">
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <AIBadge type="insight" />
              <AIBadge type="confidence" />
            </div>
            <h2 className="text-sm font-bold text-purple-200 uppercase tracking-wider mb-1">Top Recommended Location</h2>
            <h3 className="text-3xl font-black">{location.name}</h3>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
            <p className="text-[10px] font-bold text-purple-200 uppercase tracking-wider">Score</p>
            <p className="text-2xl font-black text-slate-900">{location.opportunityScore}<span className="text-sm text-purple-200">/100</span></p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/10">
          <p className="text-sm text-purple-100 font-medium">
            <span className="font-bold text-slate-900">GridWise AI Insight: </span>
            {location.name} has the strongest combination of demand, infrastructure shortage, accessibility and revenue potential. Recommendation: High-capacity DC charging hub.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
          <div>
            <div className="flex items-center gap-1.5 text-purple-200 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Demand</span>
            </div>
            <p className="text-lg font-bold">{location.demandScore}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-purple-200 mb-1">
              <Target className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Infra Gap</span>
            </div>
            <p className="text-lg font-bold">{location.infrastructureGap}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-purple-200 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">EV Growth</span>
            </div>
            <p className="text-lg font-bold">{location.evGrowth}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-purple-200 mb-1">
              <IndianRupee className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Revenue</span>
            </div>
            <p className="text-lg font-bold">{location.revenuePotential}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLocationCard;
