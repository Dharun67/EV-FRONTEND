import React, { useState, useEffect } from 'react';
import { Zap, Filter, Search, IndianRupee, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { stationApi } from '../services/stationApi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom icons for the map
const createStationIcon = (status: string, isSelected: boolean) => {
  let color = 'bg-gridwise-primary';
  if (status === 'Busy') color = 'bg-gridwise-warning';
  if (status === 'Full') color = 'bg-gridwise-danger';
  
  const scale = isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-40';
  
  return new L.DivIcon({
    className: 'bg-transparent border-0',
    html: `<div class="w-10 h-10 rounded-full ${color} flex items-center justify-center border-2 border-[#0a1114] transition-transform duration-300 ${scale} shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#0a1114]"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const userIcon = new L.DivIcon({
  className: 'bg-transparent border-0',
  html: `<div class="relative flex items-center justify-center"><div class="absolute w-12 h-12 bg-blue-600/30 rounded-full animate-ping"></div><div class="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] relative z-10"></div></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Coimbatore Coordinates
const USER_LAT = 11.0168;
const USER_LNG = 76.9558;

const NearbyStations: React.FC = () => {
  const navigate = useNavigate();
  const [stationsData, setStationsData] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = ['All', 'Fast', 'Available', 'Cheapest', 'Nearest', '24/7', 'Community'];

  const fetchStations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await stationApi.getNearby(USER_LAT, USER_LNG, 15);
      
      const stations = response.data || [];
      setStationsData(stations);
      
      if (stations.length > 0) {
          setSelectedStation(stations[0].id);
      }
    } catch (e) {
      console.error(e);
      setError("Unable to load charging stations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] overflow-hidden bg-gridwise-bg">
      {/* Real Interactive Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={[USER_LAT, USER_LNG]} 
          zoom={14} 
          scrollWheelZoom={true} 
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* User Location */}
          <Marker position={[USER_LAT, USER_LNG]} icon={userIcon}>
            <Popup className="gridwise-popup">
              <div className="text-slate-900 font-bold">Your Location</div>
            </Popup>
          </Marker>

          {/* Station Markers */}
          {stationsData.map((station) => (
            <Marker 
              key={station.id}
              position={[station.lat, station.lng]}
              icon={createStationIcon(station.status, station.id === selectedStation)}
              eventHandlers={{
                click: () => setSelectedStation(station.id),
              }}
            >
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="absolute inset-0 z-40 bg-gridwise-bg/80 flex flex-col items-center justify-center backdrop-blur-sm">
          <Zap className="w-8 h-8 text-gridwise-primary animate-pulse mb-4" />
          <p className="text-gridwise-text font-bold tracking-wider">Finding nearby chargers...</p>
        </div>
      )}

      {error && !loading && (
        <div className="absolute inset-0 z-40 bg-gridwise-bg/80 flex flex-col items-center justify-center backdrop-blur-sm">
          <p className="text-gridwise-danger font-bold mb-4">{error}</p>
          <button onClick={fetchStations} className="px-6 py-2 bg-gridwise-primary text-gridwise-bg rounded-full font-bold">
            Retry
          </button>
        </div>
      )}

      {/* Bottom Station Cards */}
      <div className="absolute bottom-6 left-0 right-0 z-30">
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x">
          {stationsData.map((station, index) => {
            const isMain = index === 0; // Highlight the nearest/first one as AI Match
            const isSelected = station.id === selectedStation;
            
            return (
              <div 
                key={station.id}
                onClick={() => setSelectedStation(station.id)}
                className={`snap-center shrink-0 w-[85vw] md:w-[400px] bg-gridwise-card border rounded-3xl p-5 cursor-pointer transition-all ${
                  isMain ? 'border-gridwise-primary/40 ' : 'border-gridwise-border opacity-80 hover:opacity-100'
                } ${isSelected && !isMain ? 'border-gridwise-border opacity-100' : ''}`}
              >
                {isMain && (
                  <div className="absolute top-0 right-0 p-3 bg-gridwise-primary/10 rounded-bl-2xl flex items-center gap-1 border-l border-b border-gridwise-primary/20">
                    <Sparkles className="w-3.5 h-3.5 text-gridwise-action" />
                    <span className="text-[10px] font-bold text-gridwise-action tracking-wide">AI MATCH 96%</span>
                  </div>
                )}
                
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${isMain ? 'bg-gridwise-primary/10 border-gridwise-primary/30' : 'bg-gridwise-bg border-gridwise-border'} flex items-center justify-center border flex-shrink-0`}>
                    <Zap className={`w-6 h-6 ${isMain ? 'text-gridwise-primary' : 'text-gridwise-text'}`} />
                  </div>
                  <div className="truncate">
                    <h3 className="font-bold text-xl text-gridwise-text truncate">{station.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gridwise-text-muted mt-1 font-medium">
                      <span>{station.distance_km || 0} km</span>
                      <span className="w-1 h-1 bg-gridwise-border rounded-full"></span>
                      <span>{Math.ceil((station.distance_km || 0) * 2)} min drive</span>
                      <span className="w-1 h-1 bg-gridwise-border rounded-full"></span>
                      <span className="truncate">{station.operator || 'Unknown Operator'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gridwise-bg border border-gridwise-border rounded-xl p-3">
                    <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">Availability</p>
                    <p className="font-black text-gridwise-text text-lg">{station.charger_count || 0}<span className="text-sm font-medium text-gridwise-text-muted"> Available</span></p>
                  </div>
                  <div className="bg-gridwise-bg border border-gridwise-border rounded-xl p-3">
                    <p className="text-[10px] text-gridwise-text-muted uppercase font-bold tracking-wider mb-1">Power</p>
                    <p className="font-black text-gridwise-text text-lg flex items-center">{station.maxPowerKw || 0} kW</p>
                  </div>
                </div>

                {isMain ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate('/planner')} 
                      className="flex-1 bg-gridwise-primary hover:bg-gridwise-primary/90 text-gridwise-bg font-bold py-3.5 rounded-xl transition-colors"
                    >
                      Navigate
                    </button>
                    <button 
                      onClick={() => navigate('/booking')}
                      className="flex-1 bg-gridwise-bg border border-gridwise-border hover:bg-gridwise-border/50 text-gridwise-text font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      Book Slot
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => navigate('/booking')} 
                    className="w-full bg-gridwise-bg border border-gridwise-border hover:bg-gridwise-border/50 text-gridwise-text font-bold py-3.5 rounded-xl transition-colors"
                  >
                    View Station
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default NearbyStations;
