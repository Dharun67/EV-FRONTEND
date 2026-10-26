import React from 'react';
import { Station } from '../../types';
import { AIRecommendationResult } from '../../types/ai';
import { Sparkles, MapPin, Zap, Star, Activity, Clock, CheckCircle2, Navigation, CalendarCheck, Info, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PrimaryRecommendationProps {
  station: Station;
  result: AIRecommendationResult;
}

const PrimaryRecommendation: React.FC<PrimaryRecommendationProps> = ({ station, result }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border-2 border-gridwise-blue shadow-lg overflow-hidden mb-8 relative">
      <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1.5 rounded-bl-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-sm">
        <Sparkles className="h-3 w-3" /> BEST MATCH
      </div>

      <div className="p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Best Charging Option</h2>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-50 p-3 rounded-xl">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">{station.name}</h3>
            <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {station.location || 'Coimbatore'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score & Why */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-5">
              <Sparkles className="h-32 w-32 text-blue-600" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">AI Match Score</p>
            
            <div className="relative h-32 w-32 flex items-center justify-center mb-4">
              <svg className="absolute inset-0 h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray={`${result.overallScore * 2.83} 283`} strokeLinecap="round" />
              </svg>
              <div className="text-center">
                <span className="text-4xl font-black text-slate-900">{result.overallScore}</span>
                <span className="text-sm font-bold text-slate-400 block -mt-1">/ 100</span>
              </div>
            </div>
            
            <p className="font-bold text-blue-600 mb-2">Excellent Match</p>
            <p className="text-xs text-slate-500 text-center font-medium leading-relaxed">
              {result.explanation}
            </p>
          </div>

          {/* Details & Reasons */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Distance</p>
                <p className="font-black text-slate-900">{station.distance} km</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Available</p>
                <p className="font-black text-slate-900">{station.availableConnectors} / {station.connectors}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Zap className="h-3 w-3" /> Power</p>
                <p className="font-black text-slate-900">{station.power || 22} kW</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Info className="h-3 w-3" /> Price</p>
                <p className="font-black text-slate-900">₹{station.pricePerKwh}<span className="text-xs text-slate-500">/kWh</span></p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> ETA Impact</p>
                <p className="font-black text-slate-900">+{result.etaImpactMin} min</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Star className="h-3 w-3" /> Rating</p>
                <p className="font-black text-slate-900">{station.rating || 4.5} ★</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Why GridWise Recommended This</h3>
              <div className="space-y-3">
                {result.reasons.map((reason, idx) => {
                  const parts = reason.split(':');
                  const title = parts[0];
                  const desc = parts.slice(1).join(':');
                  return (
                    <div key={idx} className="flex gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">{title}:</span>
                        <span className="text-slate-600 font-medium ml-1">{desc}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 md:px-8 border-t border-slate-200 flex flex-col md:flex-row gap-3">
        <button 
          onClick={() => navigate(`/booking?station=${encodeURIComponent(station.id)}`)}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md text-sm md:text-base"
        >
          <CalendarCheck className="h-5 w-5" /> Book This Station
        </button>
        <button 
          onClick={() => navigate(`/route-planner?destination=${encodeURIComponent(station.location || station.name)}`)}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-900 rounded-xl font-bold transition-all shadow-md text-sm md:text-base"
        >
          <Route className="h-5 w-5" /> Plan Route
        </button>
        <button 
          onClick={() => navigate(`/stations`)}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold transition-colors text-sm md:text-base"
        >
          <Info className="h-5 w-5" /> View Station
        </button>
      </div>
    </div>
  );
};

export default PrimaryRecommendation;
