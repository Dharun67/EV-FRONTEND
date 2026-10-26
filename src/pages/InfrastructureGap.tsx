import React, { useState, useEffect } from 'react';
import InfrastructureHeader from '../components/infrastructure/InfrastructureHeader';
import InfrastructureFilters from '../components/infrastructure/InfrastructureFilters';
import InfrastructureKpiCards from '../components/infrastructure/InfrastructureKpiCards';
import InfrastructureMap from '../components/infrastructure/InfrastructureMap';
import CoverageScore from '../components/infrastructure/CoverageScore';
import InfrastructureGapSummary from '../components/infrastructure/InfrastructureGapSummary';
import ZoneGapTable from '../components/infrastructure/ZoneGapTable';
import UnderservedAreas from '../components/infrastructure/UnderservedAreas';
import CoverageByZone from '../components/infrastructure/CoverageByZone';
import HighwayCoverage from '../components/infrastructure/HighwayCoverage';
import ChargingDesertAnalysis from '../components/infrastructure/ChargingDesertAnalysis';
import ChargingDeserts from '../components/infrastructure/ChargingDeserts';
import ChargerTypeGap from '../components/infrastructure/ChargerTypeGap';
import PowerCapacityGap from '../components/infrastructure/PowerCapacityGap';
import RecommendedChargerMix from '../components/infrastructure/RecommendedChargerMix';
import DemandInfrastructureChart from '../components/infrastructure/DemandInfrastructureChart';
import InfrastructureReadiness from '../components/infrastructure/InfrastructureReadiness';
import PriorityMatrix from '../components/infrastructure/PriorityMatrix';
import FutureInfrastructureForecast from '../components/infrastructure/FutureInfrastructureForecast';
import EVGrowthAnalysis from '../components/infrastructure/EVGrowthAnalysis';
import AIInfrastructureInsight from '../components/infrastructure/AIInfrastructureInsight';
import ExpansionPriorities from '../components/infrastructure/ExpansionPriorities';
import InvestmentSimulation from '../components/infrastructure/InvestmentSimulation';
import ROIPriority from '../components/infrastructure/ROIPriority';
import ExpansionScenarios from '../components/infrastructure/ExpansionScenarios';
import InfrastructureRisks from '../components/infrastructure/InfrastructureRisks';
import InfrastructureReliability from '../components/infrastructure/InfrastructureReliability';
import PlanningQueue from '../components/infrastructure/PlanningQueue';
import PlanningQueueModal from '../components/infrastructure/PlanningQueueModal';

import { PlanningQueueItem } from '../types/infrastructure';
import { getApi } from '../utils/api';

const InfrastructureGap: React.FC = () => {
  const [planningQueue, setPlanningQueue] = useState<PlanningQueueItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [infraZones, setInfraZones] = useState<any[]>([]);
  const [expansionRecs, setExpansionRecs] = useState<any[]>([]);
  const [highwayCorridors, setHighwayCorridors] = useState<any[]>([]);
  const [chargingDeserts, setChargingDeserts] = useState<any[]>([]);
  const [chargerTypeGaps, setChargerTypeGaps] = useState<any[]>([]);
  const [powerCapacity, setPowerCapacity] = useState<any>({});
  const [infraRisks, setInfraRisks] = useState<any[]>([]);

  useEffect(() => {
    // Attempt to fetch real infrastructure recommendations and zones
    const fetchData = async () => {
      try {
        const [recsRes, zonesRes] = await Promise.all([
           getApi<any>('stations').catch(() => []),
           getApi<any>('stations').catch(() => [])
        ]);
        setExpansionRecs(recsRes || []);
        setInfraZones(zonesRes || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleAddToQueue = (zoneId: string) => {
    if (planningQueue.find(item => item.zoneId === zoneId)) return;
    
    const rec = expansionRecs.find(r => r.zoneId === zoneId);
    if (rec) {
      setPlanningQueue([...planningQueue, {
        zoneId: rec.zoneId,
        zoneName: rec.zoneName,
        recommendedChargers: rec.recommendedChargers,
        priority: rec.priority
      }]);
    }
  };

  const handleRemoveFromQueue = (zoneId: string) => {
    setPlanningQueue(planningQueue.filter(item => item.zoneId !== zoneId));
  };

  const handleClearQueue = () => {
    setPlanningQueue([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <InfrastructureHeader />
        <InfrastructureKpiCards />
        <InfrastructureFilters />

        {/* Row 1: Main Map & KPI Overviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <InfrastructureMap zones={infraZones} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <CoverageScore />
            </div>
            <div className="flex-1">
              <InfrastructureGapSummary />
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <AIInfrastructureInsight />

        {/* Row 2: Tables and Zone Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ZoneGapTable zones={infraZones} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <UnderservedAreas zones={infraZones} />
            </div>
            <div className="flex-1">
              <CoverageByZone />
            </div>
          </div>
        </div>

        {/* Row 3: Priorities and Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ExpansionPriorities 
              recommendations={expansionRecs} 
              onAdd={handleAddToQueue} 
            />
          </div>
          <div className="flex flex-col">
            <PlanningQueue 
              queue={planningQueue} 
              onRemove={handleRemoveFromQueue}
              onPlanSelected={() => setShowModal(true)}
            />
          </div>
        </div>

        {/* Row 4: Charts and Matrices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PriorityMatrix zones={infraZones} />
          <DemandInfrastructureChart zones={infraZones} />
        </div>

        {/* Row 5: Desert and Highways */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-1">
            <ChargingDesertAnalysis />
          </div>
          <div className="xl:col-span-1">
            <ChargingDeserts deserts={chargingDeserts} />
          </div>
          <div className="xl:col-span-1">
            <HighwayCoverage corridors={highwayCorridors} />
          </div>
        </div>

        {/* Row 6: Capacity and Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ChargerTypeGap gaps={chargerTypeGaps} />
          <PowerCapacityGap capacity={powerCapacity} />
          <RecommendedChargerMix recommendations={expansionRecs} />
        </div>

        {/* Row 7: Growth and Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FutureInfrastructureForecast />
          </div>
          <div className="lg:col-span-1">
            <EVGrowthAnalysis />
          </div>
        </div>

        {/* Row 8: Investment and ROI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <InvestmentSimulation />
          </div>
          <div className="lg:col-span-2">
            <ROIPriority recommendations={expansionRecs} />
          </div>
        </div>

        {/* Row 9: Scenarios, Risks, Reliability */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ExpansionScenarios />
          <InfrastructureRisks risks={infraRisks} />
          <InfrastructureReliability />
        </div>

        {/* Row 10: Final Readiness Table */}
        <div className="grid grid-cols-1 mb-8">
          <InfrastructureReadiness zones={infraZones} />
        </div>
      </div>

      {showModal && (
        <PlanningQueueModal 
          queue={planningQueue} 
          onClose={() => setShowModal(false)}
          onClear={handleClearQueue}
        />
      )}
    </div>
  );
};

export default InfrastructureGap;
