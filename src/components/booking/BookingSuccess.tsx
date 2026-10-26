import React, { useState, useEffect } from 'react';
import { Booking, BookingStation, ChargerConnector } from '../../types/booking';
import { CheckCircle, Navigation, LayoutDashboard, History, Zap, ArrowDown, Clock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { queueApi } from '../../services/queueApi';

interface BookingSuccessProps {
  bookingId: string;
  booking: Booking;
  station: BookingStation;
  connector: ChargerConnector;
  dateLabel: string;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ bookingId, booking, station, connector, dateLabel }) => {
  const navigate = useNavigate();
  const [queueData, setQueueData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const res = await queueApi.getQueue(booking.stationId || 'demo');
        if (res.success) {
          setQueueData(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchQueue();
  }, [booking.stationId]);

  return (
    <div className="max-w-md mx-auto flex flex-col items-center">
      <div className="mb-6 mt-4 relative">
        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
        <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-xl rounded-full flex items-center justify-center border border-green-200/50 relative z-10">
          <CheckCircle className="w-8 h-8 text-green-600 drop-shadow-[0_0_8px_rgba(0,230,118,0.8)]" />
        </div>
      </div>
      
      <h2 className="text-2xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
      <p className="text-slate-500 font-medium mb-8 text-center text-sm">You have secured your spot in the queue.</p>

      {/* Dynamic Queue Screen */}
      <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl p-6 border border-slate-200 mb-8">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Your Charging Queue</h3>
        
        {loading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-green-600" /></div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">YOU</div>
            <ArrowDown className="w-4 h-4 text-green-600 mb-2 animate-bounce" />

            {queueData?.queue?.map((item: any, idx: number) => {
              if (item.is_user) {
                return (
                  <React.Fragment key={item.id}>
                    <div className="w-full bg-green-500/10 rounded-xl p-4 border border-green-200/30 flex justify-between items-center relative overflow-hidden  mb-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-gridwise-energy/20 to-transparent w-1/2 animate-pulse"></div>
                      <div className="flex items-center gap-3 relative z-10">
                        <span className="text-xl">🚗</span>
                        <span className="font-bold text-green-600">YOU</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 relative z-10">
                        Position #{item.position || idx + 1}
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={item.id}>
                  <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl rounded-xl p-4 border border-slate-200 flex justify-between items-center bg-slate-50/40 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚗</span>
                      <span className="font-bold text-slate-900">{item.vehicle}</span>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Charging' ? 'text-green-600 bg-green-500/10 border border-green-200/20' : 'text-gridwise-warning bg-gridwise-warning/10 border border-gridwise-warning/20'}`}>
                      {item.status}
                    </div>
                  </div>
                  <ArrowDown className="w-4 h-4 text-slate-500 mb-2 opacity-50" />
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-center">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Estimated waiting time</p>
          <p className="text-3xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-green-600" /> {queueData?.estimated_wait_minutes || 18} min
          </p>
          <div className="flex items-center gap-2 text-xs font-bold bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Queue moving normally
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button 
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-2 py-4 bg-green-500 hover:bg-green-500-hover text-[#0a1114] rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(0,230,118,0.3)]"
        >
          Track Live Queue
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full flex items-center justify-center gap-2 py-4 bg-white shadow-sm border border-slate-200 rounded-xl hover:bg-white/10 text-slate-900 rounded-xl font-bold transition-colors border border-slate-200"
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
