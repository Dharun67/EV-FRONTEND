import React, { useState, useEffect } from 'react';
import { Route, MapPin, Zap, Clock, Calendar, ChevronRight } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1';

const TripHistory: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${API_URL}/trips/history`);
        if (res.data.success) {
          setTrips(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="max-w-4xl mx-auto min-h-[calc(100vh-64px)] pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Route className="w-8 h-8 text-green-600" /> 
            Trip History
          </h1>
          <p className="text-slate-500 font-medium mt-1">Review your EV driving analytics and efficiency.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><Zap className="w-8 h-8 animate-pulse text-green-600" /></div>
      ) : (
        <div className="space-y-4">
          {trips.length === 0 ? (
            <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-8 text-center border border-slate-200 rounded-2xl">
              <p className="text-slate-500 font-medium">No previous trips found.</p>
            </div>
          ) : (
            trips.map((trip, idx) => (
              <div key={idx} className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 rounded-3xl border border-slate-200 hover:border-green-200/30 transition-colors group cursor-pointer">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                  
                  {/* Route Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-gridwise-ai shadow-[0_0_8px_rgba(124,255,178,0.8)]"></div>
                      <p className="text-slate-900 font-bold text-lg">{trip.start}</p>
                    </div>
                    <div className="w-0.5 h-6 bg-gridwise-border ml-1 mb-3"></div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-green-600 -ml-1" />
                      <p className="text-slate-900 font-bold text-lg">{trip.destination}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:flex gap-4 md:gap-8">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Distance</p>
                      <p className="font-black text-slate-900 text-xl">{trip.distance_km} <span className="text-xs text-slate-500">km</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Energy</p>
                      <p className="font-black text-green-600 text-xl">{trip.energy_used_kwh} <span className="text-xs text-slate-500 text-slate-900">kWh</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Efficiency</p>
                      <p className="font-black text-blue-600 text-xl">{trip.efficiency}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 group-hover:bg-green-500/10 transition-colors">
                    <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-green-600" />
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                    <Calendar className="w-4 h-4" /> {new Date(trip.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                    <Clock className="w-4 h-4" /> {trip.duration_min} min driving
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TripHistory;
