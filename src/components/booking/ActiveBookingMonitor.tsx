import React, { useEffect, useState } from 'react';
import { AlertTriangle, MapPin, Navigation, ArrowRight, Loader2 } from 'lucide-react';
import { getApi, postApi } from '../../utils/api';
import { socketService } from '../../utils/socket';

interface ActiveBookingMonitorProps {
  bookingId: string;
}

const ActiveBookingMonitor: React.FC<ActiveBookingMonitorProps> = ({ bookingId }) => {
  const [booking, setBooking] = useState<any>(null);
  const [liveQueue, setLiveQueue] = useState<number>(0);
  const [alternative, setAlternative] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [rebooking, setRebooking] = useState(false);
  const [rebookedTo, setRebookedTo] = useState<any>(null);
  const [incidentData, setIncidentData] = useState<any>(null);

  useEffect(() => {
    // Fetch initial booking
    const fetchBooking = async () => {
      try {
        const bookings = await getApi<any[]>('trips');
        const active = bookings.find(b => b.bookingId === bookingId);
        if (active) setBooking(active);
      } catch (e) {}
    };
    fetchBooking();
  }, [bookingId]);

  useEffect(() => {
    if (booking?.stationId && booking?.status === 'CONFIRMED') {
      const socket = socketService.getSocket();
      socket.emit('join-queue', { stationId: booking.stationId, vehicleId: 'monitor' });

      const handleUpdate = (data: any) => {
        if (data.stationId === booking.stationId) {
          setLiveQueue(data.queueLength);
          
          // Trigger alternative search if queue is dangerously high (> 5)
          // In real app, we would check charger count.
          if (data.queueLength >= 5 && !alternative) {
            findAlternative();
          }
        }
      };

      socket.on('queue:updated', handleUpdate);
      socket.on('incident:user-reroute', (data: any) => {
         if (data.affectedChargerId === booking.chargerId || data.affectedStationId === booking.stationId) {
             console.log("RECEIVED INCIDENT!", data);
             setIncidentData(data);
         }
      });
      
      return () => {
        socket.off('queue:updated', handleUpdate);
        socket.off('incident:user-reroute');
        socket.emit('leave-queue', { stationId: booking.stationId, vehicleId: 'monitor' });
      };
    }
  }, [booking, alternative]);

  const findAlternative = async () => {
    setLoading(true);
    try {
      const alts = await getApi<any[]>('trips');
      if (alts && alts.length > 0) {
        setAlternative(alts[0]);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleRebook = async () => {
    setRebooking(true);
    try {
      const res = await postApi<any>(`/bookings/${booking.bookingId}/rebook`, {});
      setRebookedTo(res);
      setBooking({ ...booking, status: 'CANCELLED' }); // Update local state to hide alert
    } catch (e) {
      alert("Auto-rebooking failed.");
    } finally {
      setRebooking(false);
    }
  };

  if (!booking || booking.status !== 'CONFIRMED') {
    return null;
  }

  // Only show the alert if there's a critical incident OR the queue is dangerously high
  if (incidentData) {
    return (
      <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 shadow-xl mb-8 animate-in slide-in-from-top fade-in duration-500">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-red-700 tracking-tight">Critical Incident Detected</h3>
                <p className="text-red-600 font-medium text-sm">
                  {incidentData.issue}. Your booked charger is OFFLINE.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-red-200"></div>

          <div className="flex-1 bg-white rounded-xl p-4 border border-red-100 w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-bl-lg z-10">
              Immediate Re-route
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended Alternative</p>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-slate-900">{incidentData.alternativeStation?.name || 'Unknown Station'}</span>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button 
              onClick={handleRebook}
              disabled={rebooking}
              className="w-full md:w-auto px-6 py-4 bg-red-600 hover:bg-red-700 text-slate-900 font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {rebooking ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Auto-Rebook Now'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to queue spike alert
  if (liveQueue < 5 || !alternative) {
    return null; // Silent monitor
  }

  return (
    <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 shadow-xl mb-8 animate-in slide-in-from-top fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-red-700 tracking-tight">High Congestion Alert</h3>
              <p className="text-red-600 font-medium text-sm">
                The live queue at your booked station just spiked to <span className="font-bold text-red-700 text-lg">{liveQueue} vehicles</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-16 bg-red-200"></div>

        <div className="flex-1 bg-white rounded-xl p-4 border border-red-100 w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-bl-lg z-10">
            Better Option
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended Alternative</p>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-slate-900">{alternative.name}</span>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="text-sm"><span className="text-slate-500">Distance:</span> <span className="font-bold text-slate-900">1.2 km</span></div>
            <div className="text-sm"><span className="text-slate-500">Available:</span> <span className="font-bold text-green-600">{alternative.availableChargers || 2} chargers</span></div>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button 
            onClick={handleRebook}
            disabled={rebooking}
            className="w-full md:w-auto px-6 py-4 bg-red-600 hover:bg-red-700 text-slate-900 font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {rebooking ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Auto-Rebook Now'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ActiveBookingMonitor;
