export interface MaintenanceAsset {
  id: string;
  station: string;
  type: string;
  issue: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  lastMaintenance: string;
  nextMaintenance: string;
  status: 'Fault' | 'Maintenance' | 'Healthy';
}

export interface PredictiveMaintenanceRisk {
  id: string;
  assetId: string;
  riskScore: number;
  predictedIssue: string;
  recommendedAction: string;
  timeframe: string;
}
