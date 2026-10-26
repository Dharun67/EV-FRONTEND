export interface RouteLocation {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Percentage for mock map positioning
}

export interface Vehicle {
  id: string;
  name: string;
  batteryPercentage: number;
  rangeKm: number;
  efficiency: number; // km/kWh
}

export interface TrafficSegment {
  id: string;
  name: string;
  condition: 'Light' | 'Moderate' | 'Heavy';
}

export interface RouteOption {
  id: string;
  name: string;
  distanceKm: number;
  durationMinutes: number;
  energyRequiredKwh: number;
  arrivalBatteryPercentage: number;
  chargingStops: number;
  badge?: string;
  traffic: 'Light' | 'Moderate' | 'Heavy';
  trafficSegments: TrafficSegment[];
  pathPoints: { x: number; y: number }[];
}

export interface RecentRoute {
  id: string;
  startLocation: string;
  destination: string;
  distanceKm: number;
  timeAgo: string;
}
