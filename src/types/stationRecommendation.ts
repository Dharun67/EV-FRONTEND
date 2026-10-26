export interface StationCandidate {
  id: string;
  name: string;
  opportunityScore: number; // 0-100
  demandScore: number;
  infrastructureGap: number;
  evGrowth: number;
  accessibilityScore: number;
  revenuePotential: number; // 0-100 score
  coverage: number; // %
  currentChargers: number;
  requiredChargers: number;
  competitionScore: number; // 0-100
  expectedSessionsPerDay: number;
  recommendedMix: {
    ac: number;
    dc: number;
    ultra: number;
  };
  financials: {
    estInvestmentCr: number; // crores
    estAnnualRevenueL: number; // lakhs
    estAnnualEnergyMWh: number;
    paybackYears: number;
  };
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  x: number;
  y: number;
}
