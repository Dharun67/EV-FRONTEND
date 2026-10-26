import React from 'react';
import KpiCard from '../shared/KpiCard';
import { MapPin, Target, AlertTriangle, Activity, Zap, IndianRupee } from 'lucide-react';
import { StationCandidate } from '../../types/stationRecommendation';

interface Props {
  candidates: StationCandidate[];
}

const RecommendationKpis: React.FC<Props> = ({ candidates }) => {
  const highPotential = candidates.filter(c => c.opportunityScore > 85).length;
  const criticalGaps = candidates.filter(c => c.priority === 'Critical').length;
  const avgScore = Math.round(candidates.reduce((acc, c) => acc + c.opportunityScore, 0) / candidates.length);
  const totalRec = candidates.filter(c => c.priority === 'Critical' || c.priority === 'High').length;
  const revenue = '₹6.8 Cr/year';

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <KpiCard label="Candidate Locations" value={candidates.length} icon={MapPin} iconColor="text-blue-500" />
      <KpiCard label="High Potential" value={highPotential} icon={Target} iconColor="text-green-500" />
      <KpiCard label="Critical Gaps" value={criticalGaps} icon={AlertTriangle} iconColor="text-red-500" />
      <KpiCard label="Avg Opportunity Score" value={`${avgScore} / 100`} icon={Activity} iconColor="text-purple-500" />
      <KpiCard label="Recommended Stations" value={totalRec} icon={Zap} iconColor="text-orange-500" />
      <KpiCard label="Est. Revenue Potential" value={revenue} icon={IndianRupee} iconColor="text-emerald-500" />
    </div>
  );
};

export default RecommendationKpis;
