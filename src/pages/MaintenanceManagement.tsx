import React, { useState, useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import MaintenanceKpis from '../components/maintenance/MaintenanceKpis';
import MaintenanceTable from '../components/maintenance/MaintenanceTable';
import { PredictiveMaintenanceAI } from '../components/maintenance/PredictiveMaintenanceAI';
import { AssetHealthBars, FaultAnalytics } from '../components/maintenance/AssetHealthBars';
import Toast from '../components/shared/Toast';
import { Plus } from 'lucide-react';
import { getApi } from '../utils/api';
import { useSocket } from '../utils/socket';
import { IncidentDashboard } from '../components/maintenance/IncidentDashboard';
import { MaintenanceAsset, PredictiveMaintenanceRisk } from '../types/maintenance';

const MaintenanceManagement: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [maintenanceAssets, setMaintenanceAssets] = useState<MaintenanceAsset[]>([]);
  const [predictiveRisks, setPredictiveRisks] = useState<PredictiveMaintenanceRisk[]>([]);
  const socket = useSocket();
  
  useEffect(() => {
    const fetchMaintenance = async () => {
      // Common chargers from dataset
      const chargers = ['CA-496', 'CA-319', 'CA-489', 'CA-327', 'CA-500', 'CA-499', 'CA-495', 'CA-318', 'CA-491', 'CA-325'];
      const assets: MaintenanceAsset[] = [];
      const risks: PredictiveMaintenanceRisk[] = [];
      
      for (const chargerId of chargers) {
        try {
          const res = await getApi<any>('stations');
          if (res?.success) {
             const { healthScore, riskLevel, recommendedAction, maintenancePriority, stationId } = res;
             
             let status: any = 'Healthy';
             if (riskLevel === 'CRITICAL' || riskLevel === 'WARNING') status = 'Fault';
             else if (riskLevel === 'MONITOR') status = 'Maintenance';
             
             let p: any = 'Low';
             if (maintenancePriority === 'URGENT') p = 'Critical';
             else if (maintenancePriority === 'HIGH' || maintenancePriority === 'MEDIUM') p = 'High';
             
             assets.push({
               id: chargerId,
               station: stationId,
               type: 'DC Fast Charger',
               issue: recommendedAction === 'None' ? 'No Issues' : recommendedAction,
               priority: p,
               lastMaintenance: '2026-08-01',
               nextMaintenance: '2026-10-01',
               status
             });
             
             if (riskLevel !== 'HEALTHY') {
               risks.push({
                 id: `risk-${chargerId}`,
                 assetId: chargerId,
                 riskScore: 100 - healthScore,
                 predictedIssue: `Low Health Score (${healthScore})`,
                 recommendedAction: recommendedAction,
                 timeframe: 'Immediate'
               });
             }
          }
        } catch (e) {
          console.error(e);
        }
      }
      
      setMaintenanceAssets(assets);
      setPredictiveRisks(risks.sort((a,b) => b.riskScore - a.riskScore));
    };
    
    fetchMaintenance();
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    socket.on('notification:admin', (data: any) => {
       console.log('Received critical incident alert:', data);
       setToast(`CRITICAL ALERT: Charger ${data.chargerId} at ${data.stationId} reported ${data.issue}. Automation triggered.`);
       
       // Add it to the top of the risks visually
       setPredictiveRisks(prev => [{
           id: `incident-${Date.now()}`,
           assetId: data.chargerId,
           riskScore: 100,
           predictedIssue: `LIVE INCIDENT: ${data.issue}`,
           recommendedAction: data.action,
           timeframe: 'Immediate'
       }, ...prev]);
    });
    
    return () => {
      socket.off('notification:admin');
    };
  }, [socket]);

  const handleCreateTask = () => {
    setToast("Maintenance task created.");
  };

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <PageHeader 
        title="Maintenance & Asset Management" 
        subtitle="Track asset health, active faults, and predictive maintenance alerts."
        actions={
          <button 
            onClick={handleCreateTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm transition-colors shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Create Maintenance Task
          </button>
        }
      />
      
      <IncidentDashboard />

      <MaintenanceKpis />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <AssetHealthBars />
        </div>
        <div className="lg:col-span-1">
          <FaultAnalytics />
        </div>
        <div className="lg:col-span-1">
          <PredictiveMaintenanceAI risks={predictiveRisks} />
        </div>
      </div>

      <div className="grid grid-cols-1 mb-6">
        <MaintenanceTable assets={maintenanceAssets} />
      </div>

      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default MaintenanceManagement;
