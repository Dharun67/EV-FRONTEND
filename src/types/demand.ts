export interface DemandZone {
  id: string;
  name: string;
  demandScore: number;
  utilization: number;
  currentSessions: number;
  availableChargers: number;
  queue: number;
  growthPercentage: number;
  capacityGap: number;
  x: number;
  y: number;
}

export interface HourlyDemand {
  hour: string;
  demand: number;
}

export interface DemandForecast {
  date: string;
  day: string;
  actual?: number;
  forecast: number;
}

export interface CapacityRecommendation {
  zone: string;
  currentChargers: number;
  requiredChargers: number;
  gap: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  recommendedType: string;
}

export interface StationCongestion {
  id: string;
  name: string;
  utilization: number;
  queue: number;
  status: "Critical" | "High" | "Moderate" | "Low";
}

export interface DemandFactor {
  name: string;
  status: string;
  impact: string;
  isPositive: boolean;
}

export interface DemandAlert {
  id: string;
  title: string;
  message: string;
  priority: "Critical" | "High" | "Medium" | "Low";
}
