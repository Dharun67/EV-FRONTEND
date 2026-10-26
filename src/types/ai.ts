export interface AIInsightCard {
  id: string;
  category: 'Demand' | 'Infrastructure' | 'Revenue' | 'Maintenance' | 'Fleet' | 'Customer';
  insight: string;
  evidence: string;
  impact: 'High' | 'Medium' | 'Low';
  recommendation: string;
  confidence: number;
}

export interface AITopRecommendation {
  id: string;
  action: string;
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
}

export interface AIActivity {
  id: string;
  timestamp: string;
  description: string;
}

export interface JourneyContext {
  startLocation: string;
  destination: string;
  distanceKm: number;
  currentBatteryPercentage: number;
  estimatedArrivalBattery: number;
  vehicleName: string;
  trafficCondition: string;
}

export interface AIRecommendationResult {
  stationId: string;
  overallScore: number;
  availabilityScore: number;
  speedScore: number;
  distanceScore: number;
  trafficScore: number;
  priceScore: number;
  ratingScore: number;
  explanation: string;
  reasons: string[];
  etaImpactMin: number;
  trafficCondition: string;
}
