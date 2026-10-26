export interface FleetVehicle {
  id: string;
  model: string;
  fleetName: string;
  batteryLevel: number;
  rangeKm: number;
  status: 'Charging' | 'Driving' | 'Available' | 'Maintenance';
  currentStation?: string;
  energyConsumedKWh: number;
  chargingTimeMins?: number;
  costInr: number;
}

export interface FleetAlert {
  id: string;
  vehicleId: string;
  type: 'Low Battery' | 'Overdue Maintenance' | 'High Energy Consumption';
  detail: string;
  priority: 'High' | 'Medium' | 'Low';
}
