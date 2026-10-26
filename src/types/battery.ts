export interface BatteryStatus {
  percentage: number;
  energyAvailableKwh: number;
  capacityKwh: number;
  estimatedRangeKm: number;
  healthPercentage: number;
  temperatureCelsius: number;
  efficiencyKmPerKwh: number;
  status: "Healthy" | "Warning" | "Critical";
}

export interface ChargingSession {
  id: string;
  date: string;
  stationName: string;
  startPercentage: number;
  endPercentage: number;
  energyKwh: number;
  cost: number;
  durationMinutes: number;
}

export interface BatteryInsight {
  id: string;
  title: string;
  description: string;
  type: "health" | "charging" | "range";
}
