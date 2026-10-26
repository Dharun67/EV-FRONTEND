import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, Car, Terminal } from 'lucide-react';

interface Vehicle {
  id: string;
  soc: number;
  urgency: 'HIGH' | 'LOW';
  status: 'APPROACHING' | 'ROUTING' | 'QUEUED' | 'CHARGING';
  targetStation: string | null;
}

interface Station {
  id: string;
  name: string;
  totalSlots: number;
  activeCars: number;
  queue: Vehicle[];
}

const NetworkLoadBalancer: React.FC = () => {
  const [logs, setLogs] = useState<{ id: number; message: string; type: 'info' | 'success' | 'warning' }[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stations, setStations] = useState<Station[]>([
    { id: 'st1', name: 'Station 1 (City Center)', totalSlots: 4, activeCars: 4, queue: [] },
    { id: 'st2', name: 'Station 2 (Highway Exit)', totalSlots: 6, activeCars: 2, queue: [] }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setLogs(prev => [...prev, { id: Date.now(), message, type }]);
  };

  const processVehicle = (v: Vehicle) => {
    setIsProcessing(true);
    setVehicles(prev => [...prev, { ...v, status: 'ROUTING' }]);
    addLog(`Incoming Request: Car ${v.id} with ${v.soc}% SoC. Analyzing grid load...`, 'info');

    setTimeout(() => {
      setStations(prev => {
        const newStations = [...prev];
        const st1 = newStations[0];
        const st2 = newStations[1];

        // Logic
        let targetId = '';
        if (v.soc <= 20) {
          // Critical: Force to closest (st1) regardless of queue
          st1.queue.push(v);
          targetId = st1.id;
          addLog(`[URGENT] Car ${v.id} is critical (${v.soc}%). Bypassing load balancer -> Routed to ${st1.name}.`, 'warning');
        } else {
          // Balanced: St1 is closest, but if busy, route to St2
          if (st1.activeCars + st1.queue.length >= st1.totalSlots) {
             st2.queue.push(v);
             targetId = st2.id;
             addLog(`[BALANCED] Station 1 is congested. Car ${v.id} has sufficient SoC (${v.soc}%). Re-routed to ${st2.name}.`, 'success');
          } else {
             st1.queue.push(v);
             targetId = st1.id;
             addLog(`[NORMAL] Car ${v.id} routed to closest ${st1.name}.`, 'info');
          }
        }
        
        setVehicles(prevVehs => prevVehs.map(veh => veh.id === v.id ? { ...veh, status: 'QUEUED', targetStation: targetId } : veh));
        setIsProcessing(false);
        return newStations;
      });
    }, 1500); // 1.5s thinking time
  };

  const injectCarA = () => {
    const v: Vehicle = { id: `A-${Math.floor(Math.random()*1000)}`, soc: 20, urgency: 'HIGH', status: 'APPROACHING', targetStation: null };
    processVehicle(v);
  };

  const injectCarB = () => {
    const v: Vehicle = { id: `B-${Math.floor(Math.random()*1000)}`, soc: 40, urgency: 'LOW', status: 'APPROACHING', targetStation: null };
    processVehicle(v);
  };

  const simulateFleet = () => {
    // Inject a mix of cars rapidly
    let count = 0;
    const interval = setInterval(() => {
       if (count >= 5) {
         clearInterval(interval);
         return;
       }
       const isUrgent = Math.random() > 0.6;
       const v: Vehicle = { 
         id: `F-${Math.floor(Math.random()*1000)}`, 
         soc: isUrgent ? Math.floor(Math.random()*15)+5 : Math.floor(Math.random()*40)+30, 
         urgency: isUrgent ? 'HIGH' : 'LOW', 
         status: 'APPROACHING', 
         targetStation: null 
       };
       processVehicle(v);
       count++;
    }, 2000);
  };

  const resetSimulation = () => {
    setLogs([]);
    setVehicles([]);
    setStations([
      { id: 'st1', name: 'Station 1 (City Center)', totalSlots: 4, activeCars: 4, queue: [] },
      { id: 'st2', name: 'Station 2 (Highway Exit)', totalSlots: 6, activeCars: 2, queue: [] }
    ]);
  };

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
           <div className="bg-blue-600/10 p-3 rounded-2xl">
              <BrainCircuit className="h-8 w-8 text-blue-600" />
           </div>
           <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Load Balancer</h1>
             <p className="text-slate-500 font-medium mt-1">Live demonstration of SoC-based dynamic queue orchestration.</p>
           </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={resetSimulation} className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            Reset Grid
          </button>
          <button onClick={simulateFleet} disabled={isProcessing} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-900 font-bold rounded-xl transition-all shadow-md disabled:opacity-50">
            Simulate Fleet
          </button>
          <button onClick={injectCarA} disabled={isProcessing} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-md disabled:opacity-50">
            <Car className="h-4 w-4" /> Inject Car A (20% SoC)
          </button>
          <button onClick={injectCarB} disabled={isProcessing} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md disabled:opacity-50">
            <Car className="h-4 w-4" /> Inject Car B (40% SoC)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1">
        
        {/* Left Col: The Visualization */}
        <div className="xl:col-span-2 flex flex-col gap-6">
           
           <div className="bg-slate-900 rounded-3xl p-8 flex-1 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Decorative Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Incoming Feed */}
              <div className="flex justify-center mb-12">
                 <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center gap-4 min-w-[300px] justify-center relative z-10">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Incoming Traffic</span>
                    {vehicles.filter(v => v.status === 'APPROACHING' || v.status === 'ROUTING').length === 0 && (
                      <span className="text-slate-500 text-sm italic">Waiting for vehicles...</span>
                    )}
                    {vehicles.filter(v => v.status === 'APPROACHING' || v.status === 'ROUTING').map(v => (
                       <div key={v.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${v.urgency === 'HIGH' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-blue-500/20 border-blue-500/50 text-blue-400'} animate-pulse`}>
                          <Car className="h-4 w-4" />
                          <span className="font-bold text-sm">{v.soc}%</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* AI Engine Core */}
              <div className="flex justify-center relative mb-12">
                 {/* Connection Lines (Simulated with div borders) */}
                 <div className="absolute top-1/2 left-[20%] w-[25%] h-px bg-slate-700"></div>
                 <div className="absolute top-1/2 right-[20%] w-[25%] h-px bg-slate-700"></div>
                 
                 <div className={`relative z-10 bg-slate-800 p-6 rounded-3xl border-2 transition-all duration-300 ${isProcessing ? 'border-gridwise-blue shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-110' : 'border-slate-700'}`}>
                    <BrainCircuit className={`h-12 w-12 ${isProcessing ? 'text-blue-600 animate-pulse' : 'text-slate-500'}`} />
                    {isProcessing && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-blue-600 text-xs font-bold uppercase tracking-widest">
                        Processing...
                      </div>
                    )}
                 </div>
              </div>

              {/* Stations */}
              <div className="grid grid-cols-2 gap-8 relative z-10">
                 {stations.map((st, idx) => (
                    <div key={st.id} className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-6 rounded-3xl">
                       <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-slate-900 text-lg">{st.name}</h3>
                          <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${st.activeCars + st.queue.length >= st.totalSlots ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                             {st.activeCars + st.queue.length >= st.totalSlots ? 'Congested' : 'Available'}
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-4 mb-6">
                          <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
                             <div className="h-full bg-blue-600 transition-all" style={{ width: `${(st.activeCars / st.totalSlots) * 100}%`}}></div>
                          </div>
                          <span className="text-slate-300 font-bold text-sm">{st.activeCars}/{st.totalSlots} Slots</span>
                       </div>

                       <div className="border-t border-slate-700 pt-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Queue ({st.queue.length})</h4>
                          <div className="flex flex-wrap gap-2 min-h-[40px]">
                             {st.queue.map(q => (
                                <div key={q.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${q.urgency === 'HIGH' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'} animate-in zoom-in`}>
                                   <Car className="h-3 w-3" />
                                   <span className="text-xs font-bold">{q.soc}%</span>
                                </div>
                             ))}
                             {st.queue.length === 0 && (
                                <span className="text-slate-500 text-sm italic">Queue is empty</span>
                             )}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Col: Terminal Log */}
        <div className="xl:col-span-1 bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col h-full lg:max-h-[700px]">
           <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
              <Terminal className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">AI Orchestration Log</h3>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar font-mono">
              {logs.length === 0 ? (
                 <p className="text-slate-600 text-sm">Waiting for AI events...</p>
              ) : (
                 logs.map(log => (
                    <div key={log.id} className={`p-3 rounded-lg border text-sm ${
                       log.type === 'info' ? 'bg-slate-800/50 border-slate-700 text-slate-300' :
                       log.type === 'success' ? 'bg-green-900/20 border-green-800/50 text-green-400' :
                       'bg-red-900/20 border-red-800/50 text-red-400'
                    }`}>
                       <span className="text-xs opacity-50 mr-2">[{new Date(log.id).toLocaleTimeString()}]</span>
                       {log.message}
                    </div>
                 ))
              )}
              <div ref={logEndRef} />
           </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkLoadBalancer;
