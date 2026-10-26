import React, { useState, useMemo } from 'react';
import { PlannerStation, ChargingSession } from '../types/planner';

import { getApi } from '../utils/api';

import PlannerHeader from '../components/planner/PlannerHeader';
import PlannerKpiCards from '../components/planner/PlannerKpiCards';
import NetworkStatus from '../components/planner/NetworkStatus';
import PlannerMap from '../components/planner/PlannerMap';
import TopStations from '../components/planner/TopStations';
import AttentionStations from '../components/planner/AttentionStations';
import ChargerStatus from '../components/planner/ChargerStatus';
import ChargerUtilization from '../components/planner/ChargerUtilization';
import DemandAnalysis from '../components/planner/DemandAnalysis';
import AIDemandInsight from '../components/planner/AIDemandInsight';
import RevenueAnalytics from '../components/planner/RevenueAnalytics';
import EnergyAnalytics from '../components/planner/EnergyAnalytics';
import LiveSessions from '../components/planner/LiveSessions';
import SessionDetailsModal from '../components/planner/SessionDetailsModal';
import MaintenanceAlerts from '../components/planner/MaintenanceAlerts';
import MaintenancePriority from '../components/planner/MaintenancePriority';
import NetworkHealth from '../components/planner/NetworkHealth';
import PredictiveMaintenance from '../components/planner/PredictiveMaintenance';
import DemandRanking from '../components/planner/DemandRanking';
import CapacityRecommendations from '../components/planner/CapacityRecommendations';
import NetworkEfficiency from '../components/planner/NetworkEfficiency';
import CustomerSatisfaction from '../components/planner/CustomerSatisfaction';
import OperationsActivity from '../components/planner/OperationsActivity';
import PlannerQuickActions from '../components/planner/PlannerQuickActions';
import PlannerFilters from '../components/planner/PlannerFilters';



const PlannerDashboard: React.FC = () => {
  // State
  const [stations, setStations] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [overview, setOverview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<any[]>([]);
  const [demandRanking, setDemandRanking] = useState<any>({});

  React.useEffect(() => {
    const fetchCpoData = async () => {
      try {
        const [stationsRes, sessionsRes, overviewRes, revenueRes, energyRes, maintenanceRes] = await Promise.all([
          getApi<any>('stations'),
          getApi<any>('trips'),
          getApi<any>('stations'),
          getApi<any>('stations').catch(() => []),
          getApi<any>('stations').catch(() => []),
          getApi<any>('stations').catch(() => [])
        ]);
        
        // Map backend stations to PlannerStation expected format
        const mappedStations = (stationsRes.data || []).map((s: any) => ({
          id: s.station_id || s._id,
          name: s.name,
          location: s.city,
          coordinates: [s.latitude || 13.0827, s.longitude || 80.2707],
          status: s.status === 'Operational' ? 'Operational' : 'Maintenance',
          totalChargers: 4,
          availableChargers: 2,
          utilization: 65,
          revenueToday: 150,
          energyToday: 200,
          activeIssues: 0,
        }));

        // Map sessions
        const mappedSessions = (sessionsRes.data || []).map((s: any) => ({
          id: s._id,
          stationId: s.station_id,
          stationName: s.station_id, // we don't join station name yet
          chargerId: s.charger_id,
          vehicleId: s.vehicle_id,
          userId: s.user_id,
          startTime: s.start_time,
          energyDelivered: s.energy_consumed_kwh,
          currentCost: s.total_cost,
          status: s.status === 'CHARGING' ? 'Active' : 'Completed'
        }));

        setStations(mappedStations);
        setSessions(mappedSessions);
        setOverview(overviewRes || {});
        
        setRevenueData(Array.isArray(revenueRes) ? revenueRes : (revenueRes?.data || []));
        setEnergyData(Array.isArray(energyRes) ? energyRes : (energyRes?.data || []));
        setMaintenanceAlerts(Array.isArray(maintenanceRes) ? maintenanceRes : (maintenanceRes?.data || []));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCpoData();
  }, []);

  // Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const filteredStations = useMemo(() => {
    let result = [...stations];
    
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q));
    }

    if (statusFilter !== 'All') {
      result = result.filter(s => s.status === statusFilter);
    }

    if (regionFilter !== 'All') {
      result = result.filter(s => s.location.includes(regionFilter));
    }

    return result;
    return result;
  }, [stations, search, statusFilter, regionFilter]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-semibold text-slate-500">Loading CPO Dashboard...</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col pb-8">
      
      {selectedSession && (
        <SessionDetailsModal 
          session={selectedSession} 
          onClose={() => setSelectedSession(null)} 
        />
      )}

      <PlannerHeader />
      <PlannerKpiCards />
      
      <PlannerFilters 
        search={search} onSearchChange={setSearch}
        statusFilter={statusFilter} onStatusChange={setStatusFilter}
        regionFilter={regionFilter} onRegionChange={setRegionFilter}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
        {/* Left Col - Map (8 cols on large screens) */}
        <div className="xl:col-span-8 flex flex-col h-full">
          <div className="flex-1 min-h-[450px]">
            <PlannerMap stations={filteredStations} />
          </div>
        </div>
        
        {/* Right Col - Status (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="flex-1">
            <NetworkStatus />
          </div>
          <div className="flex-1">
            <ChargerStatus />
          </div>
        </div>
      </div>

      <PlannerQuickActions />

      {/* Main Grid rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <ChargerUtilization data={[{ time: '6 AM', util: 20 }, { time: '12 PM', util: 80 }, { time: '6 PM', util: 60 }, { time: '11 PM', util: 30 }]} />
        <DemandAnalysis />
        <div className="flex flex-col gap-6">
          <AIDemandInsight />
          <OperationsActivity activities={[]} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueAnalytics data={[{label: 'Mon', value: 12000}, {label: 'Tue', value: 15000}, {label: 'Wed', value: 11000}, {label: 'Thu', value: 18000}, {label: 'Fri', value: 14000}, {label: 'Sat', value: 21000}, {label: 'Sun', value: 19000}]} />
        <EnergyAnalytics data={[{label: 'Mon', value: 450}, {label: 'Tue', value: 520}, {label: 'Wed', value: 480}, {label: 'Thu', value: 610}, {label: 'Fri', value: 550}, {label: 'Sat', value: 720}, {label: 'Sun', value: 680}]} />
      </div>

      <div className="mb-6">
        <LiveSessions sessions={sessions} onSelect={setSelectedSession} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col gap-6 xl:col-span-1">
          <NetworkHealth />
          <MaintenancePriority />
        </div>
        <div className="xl:col-span-1">
          <MaintenanceAlerts alerts={maintenanceAlerts} />
        </div>
        <div className="flex flex-col gap-6 xl:col-span-1">
          <PredictiveMaintenance />
          <AttentionStations />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <DemandRanking data={demandRanking} />
        </div>
        <div className="xl:col-span-1">
          <CapacityRecommendations data={[]} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-1">
          <TopStations />
        </div>
        <div className="xl:col-span-1">
          <NetworkEfficiency />
        </div>
        <div className="xl:col-span-1">
          <CustomerSatisfaction data={[{ stars: 5, percentage: 75 }, { stars: 4, percentage: 15 }, { stars: 3, percentage: 10 }]} />
        </div>
      </div>

    </div>
  );
};

export default PlannerDashboard;
