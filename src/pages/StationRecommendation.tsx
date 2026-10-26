import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';
import RecommendationKpis from '../components/recommendations/RecommendationKpis';
import TopLocationCard from '../components/recommendations/TopLocationCard';
import CandidateLocationsTable from '../components/recommendations/CandidateLocationsTable';
import SimulatedLocationMap from '../components/recommendations/SimulatedLocationMap';
import LocationDetailsModal from '../components/recommendations/LocationDetailsModal';
import Toast from '../components/shared/Toast';
import { getApi } from '../utils/api';
import { StationCandidate } from '../types/stationRecommendation';
import { RefreshCw, FileText } from 'lucide-react';

const fallbackCandidates: any[] = [];

const StationRecommendation: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<StationCandidate | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchRecs = async () => {
      try {
        const response = await getApi<any>('stations');
        if (response && response.length > 0) {
          const mapped = response.map((r: any, i: number) => ({
            id: r.id || `c-${i}`,
            name: `Project ${r.location.substring(0,6)}`,
            coordinates: [13.0827 + Math.random()*0.1, 80.2707 + Math.random()*0.1],
            opportunityScore: r.score,
            demandFactor: r.demand,
            infrastructureGap: r.infrastructureGap,
            evGrowth: r.evGrowth,
            accessibility: r.accessibility,
            roiEstimate: '1.5 yrs',
            suggestedChargers: 4,
            status: 'Ready for Review'
          }));
          setCandidates(mapped);
        } else {
          setCandidates(fallbackCandidates);
        }
      } catch (err) {
        console.error(err);
        setCandidates(fallbackCandidates);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecs();
  }, []);

  const topLocation = candidates.length > 0 ? [...candidates].sort((a, b) => b.opportunityScore - a.opportunityScore)[0] : null;

  const handleAddQueue = (candidate: StationCandidate) => {
    setToast({ message: `${candidate.name} added to planning queue.`, type: 'success' });
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-semibold text-slate-500">Loading Recommendations...</div>;
  }

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <PageHeader 
        title="New Station Recommendation" 
        subtitle="Identify high-potential locations for future EV charging infrastructure."
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-bold text-sm transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh Analysis
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm transition-colors shadow-md shadow-blue-500/20">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </>
        }
      />

      <RecommendationKpis candidates={candidates} />

      {topLocation && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <TopLocationCard location={topLocation} />
          </div>
          <div className="lg:col-span-2">
            <SimulatedLocationMap candidates={candidates} onLocationClick={setSelectedCandidate} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 mb-6">
        <CandidateLocationsTable 
          candidates={candidates} 
          onViewDetails={setSelectedCandidate}
        />
      </div>

      <LocationDetailsModal 
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        candidate={selectedCandidate}
        onAddQueue={handleAddQueue}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default StationRecommendation;
