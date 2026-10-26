import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import RevenueKpis from '../components/revenue/RevenueKpis';
import { RevenueTrendChart } from '../components/revenue/RevenueTrendChart';
import RevenueByStationTable from '../components/revenue/RevenueByStationTable';
import { RevenueInsights } from '../components/revenue/RevenueInsights';
import { getApi } from '../utils/api';
import { FileText, CalendarDays } from 'lucide-react';

const RevenueAnalytics: React.FC = () => {
  const [trends, setTrends] = React.useState<any[]>([]);
  const [stations, setStations] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const [trendRes, stationRes] = await Promise.all([
          getApi<any>('stations'),
          getApi<any>('stations')
        ]);
        
        const mappedTrends = (trendRes || []).map((t: any) => ({
          date: `${t._id.month}/${t._id.day}`,
          revenue: t.revenue,
          target: t.revenue * 1.1,
          energy: t.sessions * 20
        }));

        const mappedStations = (stationRes || []).map((s: any, i: number) => ({
          id: s._id,
          name: `Station ${s._id.substring(0, 4)}`,
          revenue: s.revenue,
          sessions: s.sessions,
          growth: Math.floor(Math.random() * 20) - 5
        }));

        setTrends(mappedTrends);
        setStations(mappedStations);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRevenueData();
  }, []);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-semibold text-slate-500">Loading Revenue Data...</div>;
  }

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <PageHeader 
        title="Revenue & Financial Analytics" 
        subtitle="Monitor business impact, revenue generation and network ROI."
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-bold text-sm transition-colors">
              <CalendarDays className="w-4 h-4" />
              This Year
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm transition-colors shadow-md shadow-blue-500/20">
              <FileText className="w-4 h-4" />
              Download Financial Report
            </button>
          </>
        }
      />

      <RevenueKpis />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-[350px]">
            <RevenueTrendChart trends={trends} />
          </div>
          <div className="flex-1">
            <RevenueByStationTable stations={stations} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <RevenueInsights />
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
