import React from 'react';
import { Battery, Map, Route, Navigation, ShieldAlert, CalendarCheck, Zap, Sparkles, ChevronRight, Clock, IndianRupee, MapPin } from 'lucide-react';

import ActiveBookingMonitor from '../components/booking/ActiveBookingMonitor';
import { getApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { aiApi } from '../services/aiApi';

// Coimbatore fallback coordinates
const USER_LAT = 11.0168;
const USER_LNG = 76.9558;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeBookingId, setActiveBookingId] = React.useState<string | null>(null);
  const [recommendation, setRecommendation] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesRes = await getApi<any>('vehicles');
        const vehicles = Array.isArray(vehiclesRes) ? vehiclesRes : vehiclesRes?.data?.data || vehiclesRes?.data;
        const mainVehicle = vehicles && vehicles.length > 0 ? vehicles[0] : null;

        if (mainVehicle) {
          setVehicle({
            name: `${mainVehicle.brand || ''} ${mainVehicle.vehicleModel || ''}`.trim() || 'Your EV',
            currentPercentage: mainVehicle.batteryPercentage ?? 0,
            estimatedRangeKm: mainVehicle.rangeKm ?? 0,
          });
        } else {
          setVehicle(null);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setVehicle(null);
      } finally {
        try {
            const aiRes = await aiApi.getRecommendation({ lat: USER_LAT, lng: USER_LNG, battery_percentage: vehicle?.currentPercentage || 38 });
            if (aiRes.success) {
                setRecommendation(aiRes.data);
            }
        } catch (e) {
            console.error("Failed to load AI recommendation", e);
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (isLoading) {
    return <div className="flex h-[calc(100vh-64px)] items-center justify-center font-semibold text-gridwise-text-muted bg-gridwise-bg">Loading AI Dashboard...</div>;
  }
  
  const safeVehicle = vehicle;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {activeBookingId && <ActiveBookingMonitor bookingId={activeBookingId} />}
      
      {/* Header */}
      <div className="pt-2 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 text-gridwise-text">
          Good Morning, {user?.name?.split(' ')[0] || "Dharun"} <span className="inline-block animate-[wave_2.5s_ease-in-out_infinite] origin-bottom-right">👋</span>
        </h1>
        <p className="text-gridwise-text-muted">Here's your mobility overview for today.</p>
      </div>

      {/* EV Status Card */}
      {safeVehicle ? (
        <div>
          <h2 className="text-sm font-bold text-gridwise-text-muted uppercase tracking-wider mb-3">Your EV</h2>
          <div className="glass-card premium-shadow-hover p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-gridwise-primary/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2 animate-pulse-soft"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gridwise-bg rounded-lg border border-gridwise-border">
                  <Zap className="w-5 h-5 text-gridwise-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gridwise-text">{safeVehicle.name}</h3>
                  <p className="text-gridwise-primary text-sm font-semibold">{safeVehicle.estimatedRangeKm} km estimated range</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-gridwise-text">{safeVehicle.currentPercentage}%</div>
                <p className="text-gridwise-text-muted text-xs">Battery Level</p>
              </div>
            </div>
            
            {/* Custom Battery Bar */}
            <div className="w-full h-3 bg-gridwise-bg rounded-full overflow-hidden border border-gridwise-border relative z-10 mt-4">
              <div 
                className="h-full bg-gridwise-primary relative"
                style={{ width: `${safeVehicle.currentPercentage}%` }}
              >
              </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card premium-shadow-hover p-6 text-center transition-all">
          <Battery className="w-12 h-12 text-gridwise-text-muted mx-auto mb-3" />
          <h3 className="font-bold text-lg text-gridwise-text">No Vehicle Linked</h3>
          <p className="text-gridwise-text-muted text-sm mb-4">Add your EV to see battery status and range.</p>
          <button className="px-4 py-2 bg-gridwise-primary text-white rounded-lg font-medium hover:bg-gridwise-primary-hover transition-colors shadow-sm">
            Add Vehicle
          </button>
        </div>
      )}

      {/* AI Recommendation Card (USP) */}
      {recommendation && (
        <div>
          <h2 className="text-sm font-bold text-gridwise-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gridwise-action animate-pulse" /> AI Recommendation
          </h2>
          
          <div className="glass-card premium-shadow-hover p-1 relative overflow-hidden">
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gridwise-action/30 via-transparent to-gridwise-action/10 pointer-events-none"></div>
            
            <div className="bg-white/60 backdrop-blur-2xl rounded-xl p-5 relative z-10 border border-white/40">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-gridwise-action" />
                <span className="font-bold text-gridwise-action tracking-wide">GRIDWISE AI</span>
              </div>
              
              <p className="text-gridwise-text text-lg font-medium leading-snug mb-5">
                Your battery is getting low.<br/>
                <span className="text-gridwise-text-muted">We found the best charger for your current route.</span>
              </p>
              
              <div className="bg-gridwise-bg border border-gridwise-border rounded-xl p-4 mb-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gridwise-primary" />
                    <span className="font-bold text-gridwise-text truncate max-w-[200px]">{recommendation.station_name}</span>
                  </div>
                  <div className="bg-gridwise-primary/20 text-gridwise-primary text-xs font-bold px-2 py-1 rounded-md">
                    {recommendation.ai_match_score}% Match
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  <div className="flex items-center gap-2 text-gridwise-text-muted">
                    <MapPin className="w-4 h-4 flex-shrink-0" /> <span className="truncate text-gridwise-text">{recommendation.distance_km} km away</span>
                  </div>
                  <div className="flex items-center gap-2 text-gridwise-text-muted">
                    <Clock className="w-4 h-4 flex-shrink-0" /> <span className="truncate text-gridwise-text">{recommendation.eta_minutes} min arrival</span>
                  </div>
                  <div className="flex items-center gap-2 text-gridwise-text-muted">
                    <Battery className="w-4 h-4 flex-shrink-0" /> <span className="truncate text-gridwise-text">Wait: {recommendation.predicted_wait_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-gridwise-text-muted">
                    <IndianRupee className="w-4 h-4 flex-shrink-0" /> <span className="truncate text-gridwise-text">₹{recommendation.estimated_cost_per_kwh} / kWh</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/stations/recommendation')}
                className="w-full py-3.5 bg-gridwise-action/10 hover:bg-gridwise-action/20 text-gridwise-action font-bold rounded-xl border border-gridwise-action/30 transition-all flex justify-center items-center gap-2"
              >
                View Recommendation <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Emergency Rescue CTA */}
      <div onClick={() => navigate('/rescue')} className="glass-card premium-shadow-hover border-2 border-gridwise-danger/30 p-4 cursor-pointer hover:bg-gridwise-danger/5 transition-all flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gridwise-danger/10 text-gridwise-danger rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gridwise-danger group-hover:text-red-400 transition-colors">Battery Emergency?</h3>
            <p className="text-xs text-gridwise-text-muted">Request mobile rescue van</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gridwise-text-muted group-hover:text-gridwise-danger transition-colors" />
      </div>

    </div>
  );
};

export default Dashboard;
