import React, { useState, useEffect } from 'react';
import { Users, AlertCircle, Clock, Battery, Activity } from 'lucide-react';
import { getApi, postApi } from '../../utils/api';
import { socketService } from '../../utils/socket';

interface QueueState {
  queueLength: number;
  estimatedWaitingTime: number;
  status: string;
  lastUpdated: string;
  availableChargers?: number;
  occupiedChargers?: number;
}

const QueueAnalysis: React.FC<{ stationId?: string }> = ({ stationId = 'ST102' }) => {
  const [queueState, setQueueState] = useState<QueueState | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [myPosition, setMyPosition] = useState<number | null>(null);
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialQueue = async () => {
      try {
        const res = await getApi<any>('stations');
        if (res.success) {
          setQueueState(res);
        } else {
          setErrorMsg(res.message);
        }
        
        // Fetch real vehicle
        const vehiclesRes = await getApi<any>('battery');
        if (vehiclesRes && vehiclesRes.length > 0) {
           setVehicleId(vehiclesRes[0].vehicleId || vehiclesRes[0].id);
        } else if (vehiclesRes && vehiclesRes.data && vehiclesRes.data.length > 0) {
           setVehicleId(vehiclesRes.data[0].vehicleId || vehiclesRes.data[0].id);
        }
      } catch (err) {
        setErrorMsg('Real-time queue service unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialQueue();

    const socket = socketService.connect();
    socketService.subscribeToStation(stationId);

    socket.on('queue:updated', (data: any) => {
      setQueueState(prev => ({ ...prev, ...data, lastUpdated: new Date().toISOString() }));
    });
    
    socket.on('queue:joined', (data: any) => {
      if (vehicleId && data.vehicleId === vehicleId) setMyPosition(data.position + 1);
    });

    socket.on('station:availabilityChanged', (data: any) => {
      setQueueState(prev => prev ? { 
        ...prev, 
        availableChargers: parseInt(data.availableChargers),
        occupiedChargers: parseInt(data.occupiedChargers)
      } : null);
    });

    return () => {
      socket.off('queue:updated');
      socket.off('queue:joined');
      socket.off('station:availabilityChanged');
      socketService.unsubscribeFromStation(stationId);
    };
  }, [stationId, vehicleId]);

  const handleJoinQueue = async () => {
    if (!vehicleId) return alert('No vehicle found for user');
    const res = await postApi<any>('/queue/join', { stationId, vehicleId });
    if (res.success) {
      setMyPosition(res.position);
    }
  };

  const handleLeaveQueue = async () => {
    if (!vehicleId) return;
    await postApi<any>('/queue/leave', { stationId, vehicleId });
    setMyPosition(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col justify-center items-center">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 text-sm font-medium">Connecting to Live Queue...</p>
      </div>
    );
  }

  if (errorMsg && !queueState) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col justify-center items-center">
         <AlertCircle className="w-8 h-8 text-slate-400 mb-2" />
         <p className="text-slate-500">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" /> Live Queue: {stationId}
        </h3>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-full border border-red-100">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-red-700 uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> Queue Length</span>
          <span className="font-black text-slate-900 text-2xl">{queueState?.queueLength || 0}</span>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Est. Wait</span>
          <span className="font-black text-indigo-700 text-2xl">{queueState?.estimatedWaitingTime || 0} <span className="text-sm">min</span></span>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col">
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Battery className="w-3 h-3"/> Available</span>
          <span className="font-black text-green-700 text-2xl">{queueState?.availableChargers ?? '-'}</span>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex flex-col">
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Activity className="w-3 h-3"/> Queue Risk</span>
          <span className="font-black text-orange-700 text-xl mt-1">{(queueState?.queueLength || 0) > 4 ? 'HIGH' : 'LOW'}</span>
        </div>
      </div>

      <div className="mt-auto bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Position</p>
            <p className="font-black text-slate-900 text-xl">{myPosition ? `#${myPosition}` : 'Not in queue'}</p>
          </div>
          {myPosition ? (
             <button onClick={handleLeaveQueue} className="px-4 py-2 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">Leave Queue</button>
          ) : (
             <button onClick={handleJoinQueue} className="px-4 py-2 bg-indigo-600 text-slate-900 text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Join Queue</button>
          )}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
          <span className="text-xs text-slate-400">Last updated:</span>
          <span className="text-xs font-medium text-slate-500">
            {queueState?.lastUpdated ? new Date(queueState.lastUpdated).toLocaleTimeString() : 'Just now'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueAnalysis;
