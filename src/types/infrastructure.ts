export interface InfrastructureZone {
  id: string;
  name: string;
  zoneType: "Urban" | "Suburban" | "Highway" | "Residential" | "Commercial";
  currentChargers: number;
  requiredChargers: number;
  demandScore: number;
  utilization: number;
  coverageScore: number;
  capacityGap: number;
  nearestChargerDistanceKm: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  growthPercentage: number;
  x: number; // for SVG Map simulation (0-100)
  y: number; // for SVG Map simulation (0-100)
}

export interface ExpansionRecommendation {
  zoneId: string;
  zoneName: string;
  recommendedChargers: number;
  dcFast: number;
  ac: number;
  ultraFast: number;
  opportunityScore: number;
  estimatedInvestment: number; // in crores (e.g. 1.2)
  estimatedAnnualRevenue: number; // in crores (e.g. 0.82)
  priority: "Critical" | "High" | "Medium" | "Low";
}

export interface HighwayCorridor {
  id: string;
  name: string;
  existingStations: number;
  requiredStations: number;
  gap: number;
  avgDistanceKm: number;
}

export interface ChargingDesert {
  id: string;
  zoneName: string;
  distanceToNearestKm: number;
  demandLevel: "Very High" | "High" | "Moderate" | "Low";
  growthPercentage: number;
  priority: "Critical" | "High" | "Medium" | "Low";
}

export interface ChargerTypeGap {
  type: string;
  current: number;
  required: number;
  gap: number;
}

export interface PowerCapacity {
  currentMW: number;
  requiredMW: number;
  gapMW: number;
  future12MoMW: number;
}

export interface InfrastructureRisk {
  id: string;
  type: "Capacity Overload" | "Geographic Gap" | "Charger Type Imbalance" | "Future Growth";
  description: string;
  priority: "Critical" | "High" | "Medium" | "Low";
}

export interface PlanningQueueItem {
  zoneId: string;
  zoneName: string;
  recommendedChargers: number;
  priority: "Critical" | "High" | "Medium" | "Low";
}
