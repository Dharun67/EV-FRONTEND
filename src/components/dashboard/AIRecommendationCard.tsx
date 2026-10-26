import React from 'react';
import type { Recommendation } from '../../types';
import { Sparkles, Navigation, Clock, Activity, IndianRupee } from 'lucide-react';

interface AIRecommendationCardProps {
  recommendation: Recommendation;
}

const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-1 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden h-full flex flex-col">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gridwise-purple rounded-full opacity-20 blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-xl p-5 h-full flex flex-col relative z-10 border border-indigo-500/30">
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="h-4 w-4 text-gridwise-purple animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase">AI Recommended</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{recommendation.stationName}</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Distance</p>
            <p className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Navigation className="h-3.5 w-3.5 text-indigo-400" />
              {recommendation.distanceKm} km
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Charge Time</p>
            <p className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              {recommendation.chargingTimeMin} min
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Est. Cost</p>
            <p className="text-base font-bold text-slate-900 flex items-center gap-1">
              <IndianRupee className="h-3.5 w-3.5 text-indigo-400" />
              {recommendation.estimatedCost}
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">Traffic / Avail.</p>
            <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-indigo-400" />
              {recommendation.traffic} / {recommendation.availability}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <span className="text-xs font-bold text-indigo-300">+{recommendation.etaImpactMin}m</span>
            </div>
            <span className="text-xs font-medium text-slate-300">ETA Impact</span>
          </div>
          
          <button className="px-4 py-2.5 bg-gradient-to-r from-gridwise-blue to-gridwise-purple hover:from-blue-500 hover:to-purple-500 text-slate-900 text-sm font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            Start Navigation
          </button>
        </div>

      </div>
    </div>
  );
};

export default AIRecommendationCard;
