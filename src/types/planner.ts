export interface PlannerStation {
  id: string;
  name: string;
  location: string;
  totalChargers: number;
  availableChargers: number;
  activeSessions: number;
  utilization: number;
  revenueToday: number;
  energyDeliveredKwh: number;
  status: "Operational" | "Degraded" | "Offline" | "Maintenance";
  lat: number;
  lng: number;
}

export interface ChargerStatus {
  id: string;
  stationId: string;
  type: "AC" | "DC Fast";
  powerKw: number;
  status: "Available" | "Charging" | "Reserved" | "Fault" | "Maintenance";
}

export interface ChargingSession {
  id: string;
  stationName: string;
  chargerId: string;
  vehicle: string;
  startTime: string;
  energyDeliveredKwh: number;
  durationMinutes: number;
  status: "Charging" | "Completed";
  currentBattery: number;
  targetBattery: number;
}

export interface MaintenanceAlert {
  id: string;
  chargerId: string;
  issue: string;
  priority: "Critical" | "High" | "Medium" | "Low";
}
