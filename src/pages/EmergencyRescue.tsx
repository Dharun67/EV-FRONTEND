import React, { useState, useEffect } from 'react';
import { ShieldAlert, BatteryWarning, Phone, Navigation, Clock, IndianRupee, MapPin, Truck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { rescueApi } from '../services/rescueApi';

const EmergencyRescue: React.FC = () => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState<'idle' | 'searching' | 'found'>('idle');
  const [rescueData, setRescueData] = useState<any>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await rescueApi.getStatus();
      if (res.success && res.data) {
        setRescueData(res.data);
        setRequestStatus('found');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequest = async () => {
    setRequestStatus('searching');
    try {
      const res = await rescueApi.request({ lat: 11.0168, lng: 76.9558, batteryLevel: 4 });
      if (res.success && res.data) {
        setRescueData(res.data);
        setRequestStatus('found');
      }
    } catch (e) {
      console.error(e);
      setRequestStatus('idle');
      alert('Failed to request rescue.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-full flex flex-col relative pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-gridwise-danger" /> 
              Emergency Rescue
            </h1>
          </div>
          <p className="text-slate-500 font-medium">Stranded with low battery? We've got you covered.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* Critical Battery State */}
          <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl p-8 border border-gridwise-danger/50 relative overflow-hidden bg-gridwise-danger/5">
            <div className="absolute inset-0 bg-gradient-to-br from-gridwise-danger/20 to-transparent pointer-events-none animate-pulse"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gridwise-danger/20 flex items-center justify-center mb-4 border border-gridwise-danger/30 shadow-[0_0_20px_rgba(255,59,48,0.4)]">
                <BatteryWarning className="w-10 h-10 text-gridwise-danger" />
              </div>
              
              <h2 className="text-6xl font-black text-slate-900 mb-2">4%</h2>
              <p className="text-gridwise-danger font-bold text-lg mb-6 tracking-wide uppercase">Critical Battery Level</p>

              <div className="flex items-center justify-center gap-6 w-full mb-6">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Range Remaining</p>
                  <p className="text-2xl font-black text-slate-900">12 <span className="text-sm font-medium text-slate-500">km</span></p>
                </div>
                <div className="w-px h-10 bg-gridwise-border"></div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Nearest Station</p>
                  <p className="text-2xl font-black text-slate-900">18 <span className="text-sm font-medium text-slate-500">km</span></p>
                </div>
              </div>
              
              <div className="w-full bg-gridwise-danger/10 border border-gridwise-danger/30 rounded-xl p-4 flex items-start gap-3 text-left">
                <AlertTriangle className="w-5 h-5 text-gridwise-danger shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  You cannot reach the nearest station. <span className="text-gridwise-danger">Emergency charging available.</span> Request a mobile rescue van now.
                </p>
              </div>
            </div>
          </div>

          {/* Rescue Action Area */}
          {requestStatus === 'idle' && (
            <button 
              onClick={handleRequest}
              className="w-full py-5 bg-gridwise-danger hover:bg-red-600 text-white rounded-2xl font-black text-xl transition-all shadow-[0_0_20px_rgba(255,59,48,0.5)] flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              <Truck className="w-6 h-6" /> Request Rescue
            </button>
          )}

          {requestStatus === 'searching' && (
            <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-gridwise-danger border-t-transparent animate-spin"></div>
              <p className="font-bold text-slate-900">Locating nearest rescue van...</p>
            </div>
          )}

          {requestStatus === 'found' && (
            <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl p-6 border border-green-200/40 bg-green-500/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Rescue Dispatched</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{rescueData?.unitId || 'Mobile Unit #07'}</h3>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                  <p className="text-xs font-bold text-slate-900">{rescueData?.chargerType || 'DC Fast Charge'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50/40 border border-slate-200 rounded-xl p-4">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Distance</p>
                  <p className="font-black text-slate-900 text-lg">{rescueData?.distanceKm || 0} km</p>
                </div>
                <div className="bg-slate-50/40 border border-slate-200 rounded-xl p-4">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> ETA</p>
                  <p className="font-black text-green-600 text-lg">{rescueData?.etaMinutes || 0} min</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200 mb-6">
                <span className="text-sm font-bold text-slate-500 uppercase">Estimated Cost</span>
                <span className="text-xl font-black text-slate-900 flex items-center"><IndianRupee className="w-5 h-5 mr-0.5"/> {rescueData?.cost || 0}</span>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-white shadow-sm border border-slate-200 rounded-xl hover:bg-white/10 text-slate-900 font-bold py-3.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" /> Call Driver
                </button>
                <button className="flex-1 bg-green-500 hover:bg-green-500-hover text-[#0a1114] font-bold py-3.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(0,230,118,0.3)]">
                  Track Live
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Map Placeholder & Safety) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="w-full h-[300px] bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{
                   backgroundImage: 'linear-gradient(#7CFFB2 1px, transparent 1px), linear-gradient(90deg, #7CFFB2 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }}
            />
            {requestStatus === 'found' && (
              <>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"></div>
                <div className="absolute top-1/3 left-2/3 w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_rgba(0,230,118,0.8)] z-10 animate-pulse"></div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <path d="M 25% 50% Q 50% 30% 66% 33%" stroke="rgba(0, 230, 118, 0.5)" strokeWidth="3" strokeDasharray="5,5" fill="none" />
                </svg>
              </>
            )}
            <div className="absolute bottom-4 right-4 bg-slate-50/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500">LIVE TRACKING</span>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-slate-200 rounded-xl rounded-3xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-slate-500" /> Important Contacts</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <span className="font-bold text-slate-900 text-sm">GridWise Support</span>
                <Phone className="w-4 h-4 text-slate-500" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gridwise-danger/10 hover:bg-gridwise-danger/20 transition-colors border border-gridwise-danger/20">
                <span className="font-bold text-gridwise-danger text-sm">Highway Patrol (103)</span>
                <Phone className="w-4 h-4 text-gridwise-danger" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencyRescue;
