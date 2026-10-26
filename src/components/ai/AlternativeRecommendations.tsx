import React from 'react';
import { Station } from '../../types';
import { AIRecommendationResult } from '../../types/ai';

interface AlternativeRecommendationsProps {
  alternatives: { station: Station; result: AIRecommendationResult }[];
  onSelect: (id: string) => void;
}

const AlternativeRecommendations: React.FC<AlternativeRecommendationsProps> = ({ alternatives, onSelect }) => {
  if (alternatives.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="font-bold text-slate-900 mb-4 text-lg">Other Good Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alternatives.slice(0, 3).map(({ station, result }) => (
          <div key={station.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-gridwise-blue hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-slate-900 pr-2 leading-tight">{station.name}</h4>
              <div className="bg-slate-100 px-2 py-1 rounded-lg text-center flex-shrink-0">
                <span className="text-[10px] font-bold text-slate-400 block uppercase leading-none mb-0.5">Score</span>
                <span className="text-sm font-black text-slate-700">{result.overallScore}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance</p>
                <p className="text-sm font-bold text-slate-900">{station.distance} km</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Available</p>
                <p className="text-sm font-bold text-slate-900">{station.availableConnectors} / {station.connectors}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Power</p>
                <p className="text-sm font-bold text-slate-900">{station.power || 22} kW</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</p>
                <p className="text-sm font-bold text-slate-900">₹{station.pricePerKwh}/kWh</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Traffic</p>
                <p className="text-sm font-bold text-slate-900">{result.trafficCondition}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">ETA Impact</p>
                <p className="text-sm font-bold text-slate-900">+{result.etaImpactMin} min</p>
              </div>
            </div>

            <button 
              onClick={() => onSelect(station.id)}
              className="mt-auto w-full py-2.5 bg-slate-50 hover:bg-blue-600 hover:text-slate-900 text-slate-700 text-sm font-bold rounded-xl transition-colors border border-slate-200 hover:border-gridwise-blue"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlternativeRecommendations;
