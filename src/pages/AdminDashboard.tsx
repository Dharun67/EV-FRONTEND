import React, { useState, useEffect } from 'react';
import { Activity, BatteryCharging, DollarSign, Users, AlertTriangle, TrendingUp, Zap, Server, ChevronRight } from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashRes, maintRes] = await Promise.all([
          adminApi.getDashboardData(),
          adminApi.getMaintenanceData()
        ]);
        if (dashRes.success) setData(dashRes.data);
        if (maintRes.success) setMaintenance(maintRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const kpis = data?.kpis || [
    { label: 'Total Stations', value: '0', trend: 'N/A' },
    { label: 'Online Chargers', value: '0', trend: 'N/A' },
    { label: 'Active Sessions', value: '0', trend: 'N/A' },
    { label: 'Today Revenue', value: '₹0', trend: 'N/A' }
  ];

  const chartData = [
    { time: '00:00', sessions: 12, predicted: 15 },
    { time: '04:00', sessions: 5, predicted: 8 },
    { time: '08:00', sessions: 45, predicted: 42 },
    { time: '12:00', sessions: 65, predicted: 68 },
    { time: '16:00', sessions: 85, predicted: 90 },
    { time: '20:00', sessions: 52, predicted: 50 },
    { time: '23:59', sessions: 25, predicted: 28 },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-full text-slate-500 font-bold">Loading CPO Intelligence...</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col relative pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Server className="w-8 h-8 text-blue-600" /> 
              CPO Intelligence
            </h1>
          </div>
          <p className="text-slate-500 font-medium">Network analytics and AI operations dashboard.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold transition-colors hover:bg-slate-50">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold transition-colors shadow-sm hover:bg-blue-700">
            AI Auto-Scale
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi: any, i: number) => {
          const icons = [
            <Server key={1} className="w-6 h-6 text-blue-600" />,
            <Zap key={2} className="w-6 h-6 text-green-600" />,
            <Activity key={3} className="w-6 h-6 text-orange-500" />,
            <DollarSign key={4} className="w-6 h-6 text-blue-600" />
          ];
          
          return (
            <div key={i} className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {icons[i % 4]}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${i === 1 || i === 3 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                  {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{kpi.value}</p>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">{kpi.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart / AI Demand Forecast */}
        <div className="lg:col-span-2 bg-white shadow-sm border border-slate-200 rounded-xl p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                AI Demand Forecast
              </h2>
              <p className="text-xs text-slate-500 mt-1">Predicted charging sessions vs actual</p>
            </div>
            <select className="bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500">
              <option>All Network</option>
              <option>Highway Stations</option>
              <option>City Hubs</option>
            </select>
          </div>
          
          <div className="flex-1 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sessions" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSessions)" name="Actual Sessions" />
                <Area type="monotone" dataKey="predicted" stroke="#16a34a" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" name="AI Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Predictive Maintenance */}
        <div className="flex flex-col gap-6">
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 h-full overflow-hidden flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Predictive Maintenance
            </h2>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
              {maintenance.length === 0 ? (
                <p className="text-sm text-slate-500 text-center mt-10">All chargers operating nominally.</p>
              ) : maintenance.map((alert, idx) => (
                <div key={idx} className={`border rounded-xl p-4 ${alert.failure_probability > 30 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${alert.failure_probability > 30 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {alert.maintenance_recommendation}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">{alert.charger_id}</span>
                  </div>
                  <h3 className="text-slate-900 font-bold mb-1">{alert.station_id}</h3>
                  <p className="text-slate-600 text-xs mb-3">
                    Failure Probability: <span className="font-bold text-slate-900">{alert.failure_probability}%</span> (Health: {alert.health_score}%)
                  </p>
                  {alert.reasons?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {alert.reasons.map((r: string, rIdx: number) => (
                        <span key={rIdx} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-md">{r}</span>
                      ))}
                    </div>
                  )}
                  {alert.failure_probability > 30 && (
                    <button className="w-full mt-3 py-2 bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">
                      Dispatch Technician
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
