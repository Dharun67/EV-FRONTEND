import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { getApi } from '../utils/api';
import { analyzeChargingOptions } from '../utils/recommendationEngine';
import { JourneyContext, AIRecommendationResult } from '../types/ai';

import CurrentJourneyCard from '../components/ai/CurrentJourneyCard';
import AIAnalysisStatus from '../components/ai/AIAnalysisStatus';
import PrimaryRecommendation from '../components/ai/PrimaryRecommendation';
import RecommendationScoreBreakdown from '../components/ai/RecommendationScoreBreakdown';
import AlternativeRecommendations from '../components/ai/AlternativeRecommendations';
import ComparisonTable from '../components/ai/ComparisonTable';
import SmartChargingStrategy from '../components/ai/SmartChargingStrategy';
import BatteryIntelligence from '../components/ai/BatteryIntelligence';
import TrafficETAImpact from '../components/ai/TrafficETAImpact';
import AIInsight from '../components/ai/AIInsight';
import { DecisionCenter } from '../components/decisions/DecisionCenter';

const AIRecommendations: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [stationsData, setStationsData] = useState<any[]>([]);

  const context: JourneyContext = {
    startLocation: 'Coimbatore',
    destination: 'Pollachi',
    distanceKm: 67.8,
    currentBatteryPercentage: 72,
    estimatedArrivalBattery: 58,
    vehicleName: 'Tesla Model 3',
    trafficCondition: 'Moderate'
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await getApi<any>('stations');
        const data = Array.isArray(res) ? res : (res?.data || []);
        
        const mapped = data.map((s: any) => ({
          ...s,
          id: s._id || s.id,
          name: s.name || s.station_name || `Station ${s._id?.substring(0,6) || 'Unknown'}`,
          distanceKm: s.distanceKm || 0,
          currentUtilization: s.totalChargers && s.availableChargers 
            ? Math.round(((s.totalChargers - s.availableChargers) / s.totalChargers) * 100) 
            : 0,
          reliabilityScore: s.rating ? s.rating * 20 : 0,
          pricePerKwh: s.pricePerKwh || 0,
          chargerTypes: s.connector_type ? [s.connector_type] : ['CCS2', 'Type 2']
        }));
        
        setStationsData(mapped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStations();
  }, []);

  const recommendationResults = useMemo(() => {
    if (stationsData.length === 0) return [];
    return analyzeChargingOptions(stationsData, context);
  }, [stationsData]);

  // Initial load simulation
  useEffect(() => {
    if (stationsData.length > 0) {
      const timer = setTimeout(() => setIsAnalyzing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [stationsData]);

  const handleRefresh = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  const primaryResultId = selectedStationId || recommendationResults[0]?.stationId || 'ST-101';
  const primaryResult = recommendationResults.find(r => r.stationId === primaryResultId) || recommendationResults[0];
  const primaryStation = stationsData.find(s => s.id === primaryResultId) || { id: primaryResultId, name: 'Loading...' };

  const alternativeResults = recommendationResults
    .filter(r => r.stationId !== primaryResultId)
    .map(result => ({
      station: stationsData.find(s => s.id === result.stationId) || { id: result.stationId, name: 'Unknown' },
      result
    }));

  const resultsMap = recommendationResults.reduce((acc, r) => {
    acc[r.stationId] = r;
    return acc;
  }, {} as Record<string, AIRecommendationResult>);

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Charging Recommendations</h1>
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 shadow-sm">
              <Sparkles className="h-3 w-3" /> GRIDWISE AI
            </span>
          </div>
          <p className="text-slate-500 font-medium">Let GridWise find the smartest charging option for your journey.</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isAnalyzing || stationsData.length === 0}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-gridwise-blue text-slate-700 hover:text-blue-600 rounded-xl font-bold transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin text-blue-600' : ''}`} />
          Refresh Analysis
        </button>
      </div>
      
      <DecisionCenter />

      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
        
        {/* Left Column: Main Recommendation & Context */}
        <div className="w-full xl:w-[65%] flex flex-col">
          <CurrentJourneyCard context={context} />
          
          {primaryResult && primaryStation && !isAnalyzing && (
            <PrimaryRecommendation 
              station={primaryStation as any} 
              result={primaryResult} 
            />
          )}

          {!isAnalyzing && alternativeResults.length > 0 && (
            <AlternativeRecommendations 
              alternatives={alternativeResults as any} 
              onSelect={setSelectedStationId} 
            />
          )}

          {!isAnalyzing && stationsData.length > 0 && (
            <ComparisonTable 
              stations={stationsData.slice(0, 4)} 
              results={resultsMap} 
              primaryStationId={primaryResultId} 
            />
          )}
        </div>

        {/* Right Column: AI Analysis & Breakdowns */}
        <div className="w-full xl:w-[35%] flex flex-col">
          <AIAnalysisStatus isAnalyzing={isAnalyzing} />
          <AIInsight />
          {primaryResult && !isAnalyzing && <RecommendationScoreBreakdown result={primaryResult} />}
          <SmartChargingStrategy context={context} />
          <BatteryIntelligence context={context} />
          {primaryResult && !isAnalyzing && <TrafficETAImpact result={primaryResult} />}
        </div>
        
      </div>
    </div>
  );
};

export default AIRecommendations;
