import React, { useState } from 'react';
import { getApi } from '../utils/api';
import DemandHeader from '../components/demand/DemandHeader';
import DemandKpiCards from '../components/demand/DemandKpiCards';
import DemandHeatmap from '../components/demand/DemandHeatmap';
import HourlyDemandChart from '../components/demand/HourlyDemandChart';
import PeakDemand from '../components/demand/PeakDemand';
import AIDemandInsight from '../components/demand/AIDemandInsight';
import DemandForecast from '../components/demand/DemandForecast';
import ForecastSummary from '../components/demand/ForecastSummary';
import ZoneRanking from '../components/demand/ZoneRanking';
import LowDemandZones from '../components/demand/LowDemandZones';
import CapacityGap from '../components/demand/CapacityGap';
import ZoneCapacityTable from '../components/demand/ZoneCapacityTable';
import DemandAlerts from '../components/demand/DemandAlerts';
import DynamicPricingSimulation from '../components/demand/DynamicPricingSimulation';
import QueueAnalysis from '../components/demand/QueueAnalysis';
import StationCongestion from '../components/demand/StationCongestion';
import DemandCapacityChart from '../components/demand/DemandCapacityChart';
import GrowthTrend from '../components/demand/GrowthTrend';
import ExpansionZones from '../components/demand/ExpansionZones';
import AIExpansionRecommendation from '../components/demand/AIExpansionRecommendation';
import RecommendationModal from '../components/demand/RecommendationModal';
import DemandFactors from '../components/demand/DemandFactors';
import DemandFactorImpact from '../components/demand/DemandFactorImpact';
import DemandScenarios from '../components/demand/DemandScenarios';

const DemandIntelligence: React.FC = () => {
  const [showRecModal, setShowRecModal] = useState(false);
  const [hourlyDemand, setHourlyDemand] = useState<any[]>([]);
  const [demandZones, setDemandZones] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchDemandData = async () => {
      try {
        const [trendRes, zoneRes] = await Promise.all([
          getApi<any>('stations').catch(() => []),
          getApi<any>('stations').catch(() => [])
        ]);
        
        const mappedTrends = (trendRes || []).slice(-24).map((t: any, i: number) => ({
          hour: `${String(i).padStart(2, '0')}:00`,
          current: t.avgDemand * 10,
          predicted: t.avgDemand * 11,
          capacity: 100
        }));

        const mappedZones = (zoneRes || []).slice(0, 5).map((z: any, i: number) => ({
          id: `zone-${i}`,
          name: z._id || `Zone ${i}`,
          demandScore: Math.min(100, z.avgDemand * 1.5),
          capacity: 100,
          utilization: 80,
          trend: 'up',
          coordinates: [13.0827 + (Math.random()*0.1), 80.2707 + (Math.random()*0.1)]
        }));

        setHourlyDemand(mappedTrends.length > 0 ? mappedTrends : []);
        setDemandZones(mappedZones.length > 0 ? mappedZones : []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDemandData();
  }, []);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-semibold text-slate-500">Loading Demand Data...</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col pb-8">
      
      {showRecModal && (
        <RecommendationModal onClose={() => setShowRecModal(false)} />
      )}

      <DemandHeader />
      <DemandKpiCards />

      <div className="mb-6">
        <DemandHeatmap zones={demandZones} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <HourlyDemandChart data={hourlyDemand} />
        </div>
        <div className="lg:col-span-1">
          <PeakDemand />
        </div>
      </div>

      <AIDemandInsight />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DemandForecast data={{}} />
        </div>
        <div className="lg:col-span-1">
          <ForecastSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <ZoneRanking zones={demandZones} />
        </div>
        <div className="xl:col-span-1">
          <LowDemandZones zones={[]} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <CapacityGap />
        <ZoneCapacityTable recommendations={[]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <DemandAlerts alerts={[]} />
        <DynamicPricingSimulation />
        <QueueAnalysis />
        <StationCongestion stations={[]} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <DemandCapacityChart />
        <GrowthTrend data={{}} />
      </div>

      <ExpansionZones />

      <AIExpansionRecommendation onReview={() => setShowRecModal(true)} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <DemandFactors factors={[]} />
        <DemandFactorImpact factors={[]} />
        <DemandScenarios />
      </div>

    </div>
  );
};

export default DemandIntelligence;
