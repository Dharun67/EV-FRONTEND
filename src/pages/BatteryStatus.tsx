import React, { useState, useEffect } from 'react';
import { Zap, Clock, IndianRupee, StopCircle, Car, Activity, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chargingApi } from '../services/chargingApi';

const BatteryStatus: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ws: WebSocket;
    const connectWs = () => {
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8001/api/v1';
      ws = new WebSocket(`${wsUrl}/charging-sessions/ws/demo_session`);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'TELEMETRY_UPDATE') {
          setSession(data);
          setLoading(false);
        }
      };
      
      ws.onerror = (e) => {
        console.error('WebSocket error:', e);
        setLoading(false);
      };
    };
    
    connectWs();
    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleStop = async () => {
    if (session) {
      await chargingApi.stopSession(session.session_id);
      navigate('/dashboard');
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;

  const progress = session?.current_battery_percentage || 68;

  return (
    <div className="max-w-4xl mx-auto min-h-full flex flex-col relative pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-8 h-8 text-green-600" /> 
              Live Charging Status
            </h1>
          </div>
          <p className="text-slate-500 font-medium">Monitoring active session at ChargeHub Peelamedu</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl border border-green-200/30 px-4 py-2 rounded-xl flex items-center gap-3 shadow-[0_0_15px_rgba(0,230,118,0.1)]">
            <Car className="w-5 h-5 text-slate-500" />
            <span className="font-bold text-slate-900 border-r border-slate-200 pr-3">{session?.vehicle_id || 'Vehicle #24'}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-green-600 bg-green-500/10 px-2 py-0.5 rounded">
              {session?.status || 'Charging'}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Charging Screen */}
      <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl p-8 border border-green-200/30 mb-8 relative overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-b from-gridwise-energy/10 to-transparent pointer-events-none"></div>
        
        <div className="text-center relative z-10 mb-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-200/30 mb-6 shadow-[0_0_15px_rgba(0,230,118,0.2)]">
            <Zap className="w-4 h-4 text-green-600 animate-pulse" />
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Charging in Progress</span>
          </div>
          
          <h2 className="text-8xl font-black text-slate-900 tracking-tighter mb-2">{progress}<span className="text-4xl text-slate-500">%</span></h2>
          <p className="text-blue-600 font-bold text-lg">{session?.energy_delivered_kwh || 12.4} kWh delivered</p>
        </div>

        {/* Custom Progress Bar */}
        <div className="relative w-full h-4 bg-slate-50/50 rounded-full mb-10 overflow-hidden border border-slate-200 z-10">
          <div 
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full shadow-[0_0_15px_rgba(0,230,118,0.8)] transition-all duration-1000 ease-in-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 right-0 w-4 h-full bg-white/50 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
          <div className="bg-slate-50/40 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center">
            <Zap className="w-6 h-6 text-green-600 mb-2 opacity-80" />
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Power</p>
            <p className="text-xl font-black text-slate-900">{session?.current_power_kw || 92} <span className="text-sm font-bold text-slate-500">kW</span></p>
          </div>
          
          <div className="bg-slate-50/40 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center">
            <Clock className="w-6 h-6 text-gridwise-warning mb-2 opacity-80" />
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Time Remaining</p>
            <p className="text-xl font-black text-slate-900">{session?.estimated_time_remaining_minutes || 18} <span className="text-sm font-bold text-slate-500">min</span></p>
          </div>

          <div className="bg-slate-50/40 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center">
            <IndianRupee className="w-6 h-6 text-blue-600 mb-2 opacity-80" />
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Estimated Cost</p>
            <p className="text-xl font-black text-slate-900 flex items-center"><IndianRupee className="w-4 h-4 mr-0.5" />{session?.current_cost || 180}</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex justify-between items-center relative z-10">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Charger</p>
            <p className="font-bold text-slate-900 text-lg">{session?.charger_id || 'CCS2'} • 120 kW</p>
          </div>
          <button onClick={handleStop} className="flex items-center gap-2 px-6 py-3 bg-gridwise-danger/20 hover:bg-gridwise-danger/40 text-gridwise-danger rounded-xl font-bold transition-colors border border-gridwise-danger/30">
            <StopCircle className="w-5 h-5" /> Stop Charging
          </button>
        </div>
      </div>

      {/* Live Chart Placeholder */}
      <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-green-600" /> Charging Curve
          </h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs font-bold text-green-600"><div className="w-2 h-2 rounded-full bg-green-500"></div> Power (kW)</span>
            <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-gridwise-text-muted"></div> SoC (%)</span>
          </div>
        </div>
        
        {/* Mock Chart Visualization */}
        <div className="h-48 flex items-end justify-between gap-1 mt-4">
          {[20, 45, 75, 90, 110, 120, 115, 100, 92, 85, 70, 60, 40].map((val, i) => (
            <div key={i} className="w-full flex flex-col justify-end h-full relative group">
              <div 
                className={`w-full rounded-t-sm transition-all duration-500 ${i === 8 ? 'bg-green-500 shadow-[0_0_10px_rgba(0,230,118,0.5)]' : 'bg-green-500/30'}`}
                style={{ height: `${(val / 120) * 100}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase">
          <span>0 min</span>
          <span>15 min</span>
          <span>30 min (Now)</span>
          <span>45 min</span>
        </div>
      </div>
    </div>
  );
};

export default BatteryStatus;
