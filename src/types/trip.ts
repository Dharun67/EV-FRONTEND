export interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  startTime: string;
  endTime: string;
  distanceKm: number;
  durationMinutes: number;
  startBattery: number;
  endBattery: number;
  energyUsedKwh: number;
  efficiencyKmPerKwh: number;
  averageSpeedKmh: number;
  traffic: "Low" | "Moderate" | "High";
  status: "Completed" | "Cancelled";
}

export interface ChargingSession {
  id: string;
  date: string;
  stationName: string;
  startBattery: number;
  endBattery: number;
  energyKwh: number;
  cost: number;
  durationMinutes: number;
}
