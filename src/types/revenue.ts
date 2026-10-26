export interface RevenueStation {
  id: string;
  name: string;
  sessions: number;
  energyKWh: number;
  revenueInr: number;
  growthPercentage: number;
  utilizationPercentage: number;
}

export interface RevenueTrend {
  month: string;
  revenueInr: number;
  isForecast?: boolean;
}

export interface RevenueChargerType {
  type: string;
  revenueInr: number;
  color: string;
}
