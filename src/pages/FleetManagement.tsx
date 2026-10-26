import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';
import FleetKpis from '../components/fleet/FleetKpis';
import FleetTable from '../components/fleet/FleetTable';
import FleetDetailsModal from '../components/fleet/FleetDetailsModal';
import { FleetAnalytics, FleetAlertsWidget, AIFleetInsight } from '../components/fleet/FleetAnalytics';
import { getApi } from '../utils/api';
import { FleetVehicle } from '../types/fleet';
import { Download } from 'lucide-react';

const FleetManagement: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [fleetAlerts, setFleetAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, alertsRes] = await Promise.all([
          getApi<any>('battery').catch(() => ({ data: [] })),
          getApi<any[]>('stations').catch(() => [])
        ]);
        const mapped = (vehiclesRes.data || []).map((v: any, i: number) => ({
          id: v._id || `FLT-${1000 + i}`,
          licensePlate: v.licensePlate || `${v.brand?.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`,
          make: v.brand || 'Unknown',
          model: v.model || 'Unknown',
          batteryCapacity: v.battery_capacity_kwh || v.batteryCapacityKwh,
          currentBattery: v.batteryPercentage || Math.floor(Math.random() * 80) + 10,
          status: v.status || 'Active',
          driverName: v.driverName || `Driver ${i + 1}`,
          assignedRoute: v.assignedRoute || 'Unassigned',
          lastCharged: v.lastCharged || new Date().toISOString()
        }));
        setVehicles(mapped);
        setFleetAlerts(alertsRes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-semibold text-slate-500">Loading Fleet Data...</div>;
  }

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <PageHeader 
        title="Fleet Charging Management" 
        subtitle="Monitor fleet vehicles, charging demand and energy consumption."
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-bold text-sm transition-colors">
            <Download className="w-4 h-4" />
            Export Fleet Data
          </button>
        }
      />

      <FleetKpis />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <FleetAnalytics />
        </div>
        <div className="lg:col-span-1">
          <FleetAlertsWidget alerts={fleetAlerts} />
        </div>
        <div className="lg:col-span-1">
          <AIFleetInsight />
        </div>
      </div>

      <div className="grid grid-cols-1 mb-6">
        <FleetTable 
          vehicles={vehicles} 
          onViewDetails={setSelectedVehicle} 
        />
      </div>

      <FleetDetailsModal 
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        vehicle={selectedVehicle}
      />
    </div>
  );
};

export default FleetManagement;
