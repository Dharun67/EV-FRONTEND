import React, { useState, useEffect } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { getApi } from '../utils/api';

import CommunityHero from '../components/community/CommunityHero';
import CommunitySearch from '../components/community/CommunitySearch';
import CommunityFilters from '../components/community/CommunityFilters';
import CommunityChargerCard from '../components/community/CommunityChargerCard';
import CommunityChargerMap from '../components/community/CommunityChargerMap';
import CommunityChargerDetailsModal from '../components/community/CommunityChargerDetailsModal';
import CommunityInsights from '../components/community/CommunityInsights';
import TopHosts from '../components/community/TopHosts';
import BecomeHostCard from '../components/community/BecomeHostCard';
import ListChargerModal from '../components/community/ListChargerModal';
import CommunityActivity from '../components/community/CommunityActivity';

const CommunityChargers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedChargerId, setSelectedChargerId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  
  // Real data state
  const [chargers, setChargers] = useState<any[]>([]);
  const [hosts, setHosts] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stationsRes, hostsRes, activitiesRes] = await Promise.all([
          getApi<any>('stations').catch(() => ({ data: [] })),
          getApi<any[]>('users').catch(() => []), 
          getApi<any[]>('stations').catch(() => [])
        ]);
        
        setChargers((stationsRes?.data || []).map((s: any) => ({
          id: s.id || s._id || s.stationId,
          name: s.station_name || s.name || 'Unknown Charger',
          type: s.type || 'Community',
          location: s.address || s.city || 'Unknown Location',
          distanceKm: s.distanceKm || 0,
          powerKw: s.power_kw || s.powerCapacityKw || s.maxPowerKw || 0,
          connector: s.connector_type || s.connector || 'Type 2',
          pricePerKwh: s.pricePerKwh || 0,
          status: s.status || 'Unavailable',
          rating: s.rating || 0,
          hostName: s.hostName || 'Unknown Host',
          sessionsCompleted: s.sessionsCompleted || 0,
        })));
        setHosts(hostsRes || []);
        setActivities(activitiesRes || []);
      } catch (err) {
        console.error("Failed to fetch community data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Frontend filtering logic
  const filteredChargers = chargers.filter(charger => {
    // Search match
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (charger.name && charger.name.toLowerCase().includes(searchLower)) ||
      (charger.location && charger.location.toLowerCase().includes(searchLower)) ||
      (charger.hostName && charger.hostName.toLowerCase().includes(searchLower));

    // Filter match
    let matchesFilter = true;
    if (selectedFilter === 'Available Now') matchesFilter = charger.status === 'Available';
    if (selectedFilter === 'Home Chargers') matchesFilter = charger.type === 'Home';
    if (selectedFilter === 'Apartment Chargers') matchesFilter = charger.type === 'Apartment';
    if (selectedFilter === 'Workplace') matchesFilter = charger.type === 'Workplace';
    if (selectedFilter === 'Business') matchesFilter = charger.type === 'Business' || charger.type === 'Hotel';
    if (selectedFilter === 'Low Cost') matchesFilter = charger.pricePerKwh < 12;
    if (selectedFilter === 'Fast Charging') matchesFilter = charger.powerKw >= 22;
    if (selectedFilter === 'Top Rated') matchesFilter = charger.rating >= 4.8;

    return matchesSearch && matchesFilter;
  });

  const selectedCharger = chargers.find(c => c.id === selectedChargerId || c._id === selectedChargerId);
  const hostForSelected = selectedCharger 
    ? hosts.find(h => h.name?.includes(selectedCharger.hostName)) || { name: selectedCharger.hostName || 'Community Host', rating: 4.9, role: 'USER' }
    : null;

  const handleSelectCharger = (id: string) => {
    setSelectedChargerId(id);
  };

  const handleViewDetails = (id: string) => {
    setSelectedChargerId(id);
    setShowDetailsModal(true);
  };

  const handleReserve = (id: string) => {
    window.location.href = `/booking?station=${encodeURIComponent(id)}`;
  };

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col relative pb-8">
      {showListModal && <ListChargerModal onClose={() => setShowListModal(false)} />}
      
      {showDetailsModal && selectedCharger && hostForSelected && (
        <CommunityChargerDetailsModal 
          charger={selectedCharger}
          host={hostForSelected}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Community Chargers</h1>
          <p className="text-slate-500 font-medium">Discover trusted EV chargers shared by people and businesses near you.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Search className="w-4 h-4" /> Find a Charger
          </button>
          <button 
            onClick={() => setShowListModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl font-bold text-slate-900 transition-all shadow-md"
          >
            <PlusCircle className="w-4 h-4" /> List Your Charger
          </button>
        </div>
      </div>

      <CommunityHero />

      <div className="mb-8">
        <CommunitySearch onSearch={setSearchQuery} />
        <CommunityFilters selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
        
        <div className="flex justify-between items-center mt-2 mb-4">
          <p className="text-sm font-bold text-slate-500">{filteredChargers.length} chargers found</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By:</span>
            <select className="text-sm font-bold text-slate-900 bg-transparent border-none focus:ring-0 cursor-pointer outline-none">
              <option>Recommended</option>
              <option>Nearest</option>
              <option>Cheapest</option>
              <option>Fastest</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main layout: List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
            {isLoading ? (
              <div className="col-span-full py-12 text-center text-slate-500">Loading Community Chargers...</div>
            ) : filteredChargers.map(charger => (
              <CommunityChargerCard 
                key={charger.id || charger._id} 
                charger={charger}
                isSelected={selectedChargerId === (charger.id || charger._id)}
                onClick={() => handleSelectCharger(charger.id || charger._id)}
                onViewDetails={() => handleViewDetails(charger.id || charger._id)}
                onReserve={(e: any) => {
                  e.stopPropagation();
                  handleReserve(charger.id || charger._id);
                }}
              />
            ))}
            
            {!isLoading && filteredChargers.length === 0 && (
              <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-500 font-medium">No chargers found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedFilter('All'); }}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-5 xl:col-span-4 hidden lg:block">
          <CommunityChargerMap 
            chargers={filteredChargers} 
            selectedId={selectedChargerId}
            onSelectMarker={handleSelectCharger} 
          />
        </div>
      </div>

      {/* Map for mobile - rendered below list */}
      <div className="lg:hidden mb-12">
        <CommunityChargerMap 
          chargers={filteredChargers} 
          selectedId={selectedChargerId}
          onSelectMarker={handleSelectCharger} 
        />
      </div>

      <CommunityInsights />
      <TopHosts hosts={hosts} />
      <BecomeHostCard onListCharger={() => setShowListModal(true)} />
      <CommunityActivity activities={activities} />

    </div>
  );
};

export default CommunityChargers;
