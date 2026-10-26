export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Station {
  id: string;
  name: string;
  location?: string;
  distance: number;
  connectors: number;
  availableConnectors: number;
  chargingType: string;
  power?: number;
  pricePerKwh: number;
  status: "Available" | "Busy" | "Unavailable";
  rating?: number;
  estimatedChargingTime?: number;
}

export interface Booking {
  id: string;
  stationName: string;
  date: string;
  time: string;
  connector: string;
  durationMin: number;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export interface BatteryStatus {
  currentPercentage: number;
  estimatedRangeKm: number;
  capacityKwh: number;
  statusText: string;
}

export interface TripSummary {
  distanceTravelledKm: number;
  energyConsumedKwh: number;
  chargingSessions: number;
  averageEfficiency: number;
}

export interface Recommendation {
  stationName: string;
  distanceKm: number;
  chargingTimeMin: number;
  estimatedCost: number;
  traffic: "Low" | "Moderate" | "High";
  availability: "Low" | "Moderate" | "High";
  etaImpactMin: number;
}
