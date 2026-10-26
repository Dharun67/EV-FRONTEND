import React, { useEffect, useState } from 'react';
import { getApi } from '../../utils/api';
import { LineChart, AlertTriangle } from 'lucide-react';

interface DemandForecastChartProps {
  stationId: string;
}

const DemandForecastChart: React.FC<DemandForecastChartProps> = ({ stationId }) => {
  const [demandData, setDemandData] = useState<any>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [forecastRes, historyRes] = await Promise.all([
          getApi<any>('stations'),
          getApi<any[]>('stations')
        ]);
        if (forecastRes?.success) {
          setDemandData(forecastRes);
        }
        if (historyRes && Array.isArray(historyRes)) {
          setHistoryData(historyRes.slice(0, 5).reverse()); // Get last 5 predictions
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [stationId]);

  if (isLoading) return <div className="p-4 border rounded-xl text-sm text-slate-500">Loading forecast...</div>;
  if (!demandData) return <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-xl text-sm">Failed to load demand forecast (Insufficient data).</div>;

  const isHighDemand = demandData.demandLevel === 'HIGH' || demandData.demandLevel === 'VERY_HIGH';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-600" />
            Station Demand Forecast
          </h3>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{stationId}</p>
        </div>
        {isHighDemand && (
          <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-red-200">
            <AlertTriangle className="w-3 h-3" /> High Demand Expected
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Predicted Sessions</p>
          <div className="text-2xl font-black text-slate-900">{demandData.predictedDemand}</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Demand Level</p>
          <div className={`text-lg font-black ${isHighDemand ? 'text-red-600' : 'text-green-600'}`}>
            {demandData.demandLevel}
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Horizon</p>
          <div className="text-lg font-bold text-slate-900">{demandData.predictionHorizon}</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Model Version</p>
          <div className="text-sm font-bold text-slate-900 mt-1">{demandData.modelVersion}</div>
        </div>
      </div>
      
      {/* Visual Chart Placeholder for History vs Predicted */}
      {historyData.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Prediction History</h4>
          <div className="flex items-end gap-2 h-24">
            {historyData.map((h, i) => {
               const height = Math.max(10, Math.min(100, (h.prediction / 4) * 100)); // normalized roughly
               return (
                 <div key={i} className="flex-1 flex flex-col justify-end items-center group relative">
                   <div className="w-full bg-slate-200 rounded-t-sm transition-all hover:bg-slate-300" style={{ height: `${height}%` }}></div>
                   <div className="absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
                     {h.prediction} ({h.demandLevel})
                   </div>
                 </div>
               )
            })}
            {/* The current prediction in blue */}
            <div className="flex-1 flex flex-col justify-end items-center group relative">
               <div className="w-full bg-blue-600 rounded-t-sm transition-all shadow-[0_0_10px_rgba(37,99,235,0.3)]" style={{ height: `${Math.max(10, Math.min(100, (demandData.predictedDemand / 4) * 100))}%` }}></div>
               <div className="absolute -top-8 bg-blue-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 font-bold">
                 {demandData.predictedDemand} (Now)
               </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 text-right mt-2">Historical vs Current Forecast</div>
        </div>
      )}
    </div>
  );
};

export default DemandForecastChart;
