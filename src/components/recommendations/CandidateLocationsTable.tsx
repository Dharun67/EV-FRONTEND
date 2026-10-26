import React from 'react';
import DataTable from '../shared/DataTable';
import StatusBadge from '../shared/StatusBadge';
import { StationCandidate } from '../../types/stationRecommendation';
import { Eye } from 'lucide-react';

interface Props {
  candidates: StationCandidate[];
  onViewDetails: (candidate: StationCandidate) => void;
}

const CandidateLocationsTable: React.FC<Props> = ({ candidates, onViewDetails }) => {
  const sortedCandidates = [...candidates].sort((a, b) => b.opportunityScore - a.opportunityScore);

  const columns = [
    { key: 'rank', label: 'Rank', align: 'center' as const },
    { key: 'name', label: 'Location' },
    { key: 'score', label: 'Opportunity Score', align: 'center' as const },
    { key: 'demand', label: 'Demand', align: 'center' as const, hiddenOnMobile: true },
    { key: 'gap', label: 'Gap', align: 'center' as const, hiddenOnMobile: true },
    { key: 'chargers', label: 'Recommended', align: 'center' as const },
    { key: 'priority', label: 'Priority' },
    { key: 'actions', label: '', align: 'right' as const },
  ];

  const renderCell = (item: StationCandidate, columnKey: string) => {
    switch (columnKey) {
      case 'rank':
        const rank = sortedCandidates.findIndex(c => c.id === item.id) + 1;
        return <span className={`font-bold ${rank <= 3 ? 'text-blue-600' : 'text-slate-500'}`}>#{rank}</span>;
      case 'name':
        return <span className="font-bold text-slate-900">{item.name}</span>;
      case 'score':
        return <span className="font-black text-slate-900">{item.opportunityScore}</span>;
      case 'demand':
        return <span className="font-medium text-slate-600">{item.demandScore}</span>;
      case 'gap':
        return <span className="font-medium text-slate-600">{item.infrastructureGap}</span>;
      case 'chargers':
        const total = item.recommendedMix.ac + item.recommendedMix.dc + item.recommendedMix.ultra;
        return <span className="font-bold text-slate-900">{total} Chargers</span>;
      case 'priority':
        return <StatusBadge status={item.priority} />;
      case 'actions':
        return (
          <button 
            onClick={() => onViewDetails(item)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Candidate Locations Ranking</h2>
      <DataTable 
        columns={columns}
        data={sortedCandidates}
        renderCell={renderCell}
      />
    </div>
  );
};

export default CandidateLocationsTable;
