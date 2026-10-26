import React, { useState, useEffect, useRef } from 'react';
import { Navigation, MapPin, Search, Navigation2, Zap, Clock, Route as RouteIcon, Target, Activity, Settings2, ShieldCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tripApi } from '../services/tripApi';
import { aiApi } from '../services/aiApi';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Custom Icons for Map
const startIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="w-4 h-4 bg-gridwise-text rounded-full border-2 border-white shadow-md"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const endIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="w-5 h-5 bg-gridwise-action rounded-full border-2 border-white shadow-md flex items-center justify-center"><div class="w-1.5 h-1.5 bg-white rounded-full"></div></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const stationIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="w-6 h-6 bg-gridwise-card border-2 border-gridwise-primary rounded-full flex items-center justify-center shadow-lg text-gridwise-primary font-bold text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Component to dynamically update map view
const MapBoundsUpdater = ({ routeData }: { routeData: any }) => {
  const map = useMap();
  useEffect(() => {
    if (routeData && routeData.geometry && routeData.geometry.coordinates) {
      const bounds = L.latLngBounds(routeData.geometry.coordinates.map((c: any) => [c[1], c[0]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routeData, map]);
  return null;
};

const RoutePlanner: React.FC = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState('Coimbatore');
  const [destination, setDestination] = useState('Pollachi');
  const [isPlanned, setIsPlanned] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [tripData, setTripData] = useState<any>(null);
  const [waitTimes, setWaitTimes] = useState<Record<number, number>>({});

  const handlePlan = async () => {
    setIsPlanning(true);
    try {
      const response = await tripApi.planTrip({ start, destination });
      setTripData(response.data);
      setIsPlanned(true);
      
      // If there are stops, fetch ML Wait Time predictions for them in the background
      if (response.data.stops && response.data.stops.length > 0) {
        response.data.stops.forEach(async (stop: any, index: number) => {
          try {
            const aiResponse = await aiApi.predictWaitTime({ station_id: 'auto', lat: stop.lat, lng: stop.lng });
            setWaitTimes(prev => ({ ...prev, [index]: aiResponse.data.predicted_wait_minutes }));
          } catch (e) {
            console.error("AI Wait time prediction failed for stop", index);
          }
        });
      }
      
    } catch (e) {
      console.error(e);
      alert('Failed to plan route. Ensure the locations exist.');
    } finally {
      setIsPlanning(false);
    }
  };

  const polylinePositions = tripData?.geometry?.coordinates?.map((c: any) => [c[1], c[0]]) || [];

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-64px)] flex flex-col md:flex-row relative bg-gridwise-bg overflow-hidden rounded-xl shadow-lg border border-gridwise-border">
      
      {/* Real Map Layer */}
      <div className="absolute inset-0 z-0 bg-gridwise-bg">
        <MapContainer 
          center={[11.0168, 76.9558]} 
          zoom={10} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles grayscale opacity-80"
          />
          
          {tripData && (
            <>
              <MapBoundsUpdater routeData={tripData} />
              
              <Polyline 
                positions={polylinePositions} 
                color="var(--gridwise-primary)" 
                weight={5} 
                opacity={0.8} 
              />

              {tripData.coordinates?.start && (
                <Marker position={[tripData.coordinates.start.lat, tripData.coordinates.start.lng]} icon={startIcon}>
                  <Popup>Start: {tripData.start}</Popup>
                </Marker>
              )}

              {tripData.coordinates?.end && (
                <Marker position={[tripData.coordinates.end.lat, tripData.coordinates.end.lng]} icon={endIcon}>
                  <Popup>Destination: {tripData.destination}</Popup>
                </Marker>
              )}

              {tripData.stops?.map((stop: any, idx: number) => (
                <Marker key={idx} position={[stop.lat, stop.lng]} icon={stationIcon}>
                  <Popup>
                    <div className="text-center font-bold">
                      {stop.station_name}<br/>
                      <span className="text-gridwise-primary text-xs">{stop.charge_time_minutes} min charge</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          )}
        </MapContainer>
      </div>

      {/* Left Sidebar Control Panel */}
      <div className="w-full md:w-[400px] lg:w-[480px] h-full flex flex-col z-20 bg-white/70 backdrop-blur-2xl border-r border-white/40 premium-shadow overflow-y-auto scrollbar-hide transition-all">
        <div className="p-6 md:p-8">
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-gridwise-text flex items-center gap-2">
              <RouteIcon className="w-6 h-6 text-gridwise-primary" /> 
              Trip Planner
            </h1>
            <button className="bg-gridwise-bg border border-gridwise-border rounded-xl p-2 text-gridwise-text-muted hover:text-gridwise-primary transition-colors">
              <Settings2 className="w-5 h-5" />
            </button>
          </div>

          {/* Input Section */}
          <div className="bg-gridwise-bg rounded-2xl p-5 border border-gridwise-border mb-6 relative shadow-inner">
            <div className="relative flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gridwise-card border border-gridwise-border flex items-center justify-center flex-shrink-0">
                <Navigation2 className="w-5 h-5 text-gridwise-text-muted" />
              </div>
              <div className="flex-1 border-b border-gridwise-border pb-2">
                <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">From</p>
                <input 
                  type="text" 
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full bg-transparent text-gridwise-text font-bold focus:outline-none placeholder-gridwise-text-muted/50"
                  placeholder="Enter starting point"
                />
              </div>
            </div>

            <div className="relative flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gridwise-primary/10 flex items-center justify-center border border-gridwise-primary/20 flex-shrink-0">
                <Target className="w-5 h-5 text-gridwise-primary" />
              </div>
              <div className="flex-1 pb-2">
                <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">To</p>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-gridwise-text font-bold focus:outline-none placeholder-gridwise-text-muted/50"
                  placeholder="Enter destination"
                />
              </div>
            </div>
            
            <div className="absolute left-[39px] top-[72px] bottom-[50px] w-0.5 bg-gridwise-border border-dashed"></div>
          </div>

          {!isPlanned ? (
            <button 
              onClick={handlePlan}
              disabled={isPlanning}
              className="w-full py-4 bg-gridwise-primary hover:bg-gridwise-primary-hover text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 premium-shadow-hover"
            >
              {isPlanning ? 'Analyzing Topography & Traffic...' : 'Plan Smart Route'}
            </button>
          ) : (
            <div className="animate-slide-up">
              
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-gridwise-primary animate-pulse"></div>
                <span className="text-xs font-bold text-gridwise-text uppercase tracking-wider">AI Route Optimized</span>
              </div>

              {/* Trip Summary Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gridwise-bg border border-gridwise-border rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">Total Distance</p>
                  <p className="font-black text-gridwise-text text-2xl">{tripData?.total_distance_km || 0} <span className="text-sm font-medium text-gridwise-text-muted">km</span></p>
                </div>
                <div className="bg-gridwise-bg border border-gridwise-border rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">Total Time</p>
                  <p className="font-black text-gridwise-text text-2xl flex items-center gap-1">
                    {Math.floor((tripData?.total_time_minutes || 0) / 60)}<span className="text-sm font-medium text-gridwise-text-muted mr-1">h</span>
                    {(tripData?.total_time_minutes || 0) % 60}<span className="text-sm font-medium text-gridwise-text-muted">m</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gridwise-bg border border-gridwise-border rounded-xl p-3 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">Driving</p>
                    <p className="font-bold text-gridwise-text text-sm">
                        {Math.floor((tripData?.driving_minutes || 0) / 60) > 0 ? `${Math.floor((tripData?.driving_minutes || 0) / 60)}h ` : ''}
                        {(tripData?.driving_minutes || 0) % 60}m
                    </p>
                  </div>
                  <Navigation2 className="w-4 h-4 text-gridwise-action" />
                </div>
                <div className="bg-gridwise-primary/10 border border-gridwise-primary/20 rounded-xl p-3 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">Charging</p>
                    <p className="font-bold text-gridwise-primary text-sm">{tripData?.charging_minutes || 0}m</p>
                  </div>
                  <Zap className="w-4 h-4 text-gridwise-primary" />
                </div>
              </div>

              <h3 className="text-sm font-bold text-gridwise-text mb-4 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-gridwise-action" /> Recommended Itinerary
              </h3>
              
                {/* Route Timeline */}
              <div className="relative pl-6 space-y-6 mb-8">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gridwise-border"></div>
                
                {/* Start */}
                <div className="relative">
                  <div className="absolute -left-[27px] w-4 h-4 bg-gridwise-text rounded-full border-[3px] border-gridwise-card z-10"></div>
                  <h4 className="font-bold text-gridwise-text">Start: {tripData?.start || start}</h4>
                  <p className="text-xs text-gridwise-text-muted font-medium mt-1">Battery: {tripData?.initial_battery || 100}%</p>
                </div>

                {/* Charging Stops */}
                {tripData?.stops?.map((stop: any, index: number) => (
                  <div key={index} className="relative bg-gridwise-bg border border-gridwise-border rounded-xl p-4 ml-0 shadow-sm transition-all hover:border-gridwise-primary/50">
                    <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-5 h-5 bg-gridwise-primary rounded-full border-[3px] border-gridwise-card z-10 flex items-center justify-center">
                      <Zap className="w-2 h-2 text-gridwise-bg" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gridwise-text text-sm pr-2 leading-tight">{stop.station_name}</h4>
                      <span className="text-[10px] font-bold bg-gridwise-primary/10 border border-gridwise-primary/20 text-gridwise-primary px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0 shadow-sm">{stop.charge_time_minutes} min charge</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 text-xs text-gridwise-text-muted mb-3 font-medium">
                      <span className="bg-gridwise-card px-2 py-1 rounded border border-gridwise-border">Arrive: {stop.arrive_battery}%</span>
                      <span className="bg-gridwise-card px-2 py-1 rounded border border-gridwise-border">Leave: {stop.leave_battery}%</span>
                      
                      {waitTimes[index] !== undefined && (
                         <span className="bg-gridwise-action/10 text-gridwise-action px-2 py-1 rounded border border-gridwise-action/20 flex items-center gap-1">
                           <Clock className="w-3 h-3" /> Live Wait: {waitTimes[index]}m
                         </span>
                      )}
                    </div>

                    <button 
                      onClick={() => navigate('/booking')}
                      className="text-xs font-bold text-gridwise-text bg-white hover:bg-gridwise-border px-3 py-2.5 rounded-lg transition-colors border border-gridwise-border w-full text-center shadow-sm flex justify-center items-center gap-2"
                    >
                      Reserve Charging Slot <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {tripData?.stops?.length === 0 && (
                   <div className="relative bg-green-50/50 border border-green-200 rounded-xl p-4 ml-0 shadow-sm">
                      <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full border-[3px] border-gridwise-card z-10 flex items-center justify-center">
                        <ShieldCheck className="w-2 h-2 text-white" />
                      </div>
                      <p className="text-sm font-bold text-green-700">No charging stops needed!</p>
                      <p className="text-xs text-green-600 mt-1">You can reach the destination comfortably with your current battery.</p>
                   </div>
                )}

                {/* Destination */}
                <div className="relative">
                  <div className="absolute -left-[28px] w-5 h-5 bg-gridwise-action rounded-full border-[3px] border-gridwise-card z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <h4 className="font-bold text-gridwise-text">Arrive: {tripData?.destination || destination}</h4>
                  <p className="text-xs text-gridwise-text-muted font-medium mt-1">Arrival Battery: {tripData?.arrival_battery || 0}%</p>
                </div>
              </div>

              <div className="flex gap-3">
                  <button onClick={() => { setIsPlanned(false); setTripData(null); }} className="px-4 py-4 bg-gridwise-bg border border-gridwise-border hover:bg-gridwise-card text-gridwise-text rounded-xl font-bold transition-all shadow-sm">
                    Back
                  </button>
                  <button className="flex-1 py-4 bg-gridwise-primary hover:bg-gridwise-primary/90 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
                    <Navigation2 className="w-5 h-5 fill-current" /> Start Navigation
                  </button>
              </div>

            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default RoutePlanner;
