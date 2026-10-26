import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export interface FilterState {
  distance: string;
  chargerType: string;
  availability: string;
  chargingSpeed: string;
  quickFilter: string;
  sortBy: string;
}

interface StationFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const StationFilters: React.FC<StationFiltersProps> = ({ filters, setFilters }) => {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      distance: '',
      chargerType: '',
      availability: '',
      chargingSpeed: '',
      quickFilter: 'All',
      sortBy: 'Recommended'
    });
  };

  const quickFilters = ['All', 'Available Now', 'Fast Charging', 'Cheapest', 'Nearest'];

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Dropdown Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 px-2 text-slate-500 border-r border-slate-200 mr-1">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Filters</span>
        </div>
        
        <select 
          value={filters.distance}
          onChange={(e) => handleFilterChange('distance', e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-gridwise-blue focus:border-gridwise-blue block p-2 outline-none font-medium min-w-[120px]"
        >
          <option value="">Any Distance</option>
          <option value="2">Within 2 km</option>
          <option value="5">Within 5 km</option>
          <option value="10">Within 10 km</option>
        </select>

        <select 
          value={filters.chargerType}
          onChange={(e) => handleFilterChange('chargerType', e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-gridwise-blue focus:border-gridwise-blue block p-2 outline-none font-medium min-w-[120px]"
        >
          <option value="">Any Type</option>
          <option value="AC">AC</option>
          <option value="DC Fast">DC Fast</option>
          <option value="Ultra Fast">Ultra Fast</option>
        </select>

        <select 
          value={filters.availability}
          onChange={(e) => handleFilterChange('availability', e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-gridwise-blue focus:border-gridwise-blue block p-2 outline-none font-medium min-w-[120px]"
        >
          <option value="">Any Availability</option>
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <select 
          value={filters.chargingSpeed}
          onChange={(e) => handleFilterChange('chargingSpeed', e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-gridwise-blue focus:border-gridwise-blue block p-2 outline-none font-medium min-w-[120px]"
        >
          <option value="">Any Speed</option>
          <option value="Normal">Normal</option>
          <option value="Fast">Fast</option>
          <option value="Ultra Fast">Ultra Fast</option>
        </select>

        <div className="ml-auto flex items-center gap-3">
          <select 
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="bg-blue-600/5 border border-gridwise-blue/20 text-blue-600 text-sm rounded-lg focus:ring-gridwise-blue focus:border-gridwise-blue block p-2 outline-none font-bold min-w-[140px]"
          >
            <option value="Recommended">Sort: Recommended</option>
            <option value="Nearest">Sort: Nearest</option>
            <option value="Cheapest">Sort: Cheapest</option>
            <option value="Fastest Charging">Sort: Fastest</option>
            <option value="Highest Rated">Sort: Highest Rated</option>
          </select>

          <button 
            onClick={handleClearFilters}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline decoration-slate-300 underline-offset-4"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
        {quickFilters.map((qf) => (
          <button
            key={qf}
            onClick={() => handleFilterChange('quickFilter', qf)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm border ${
              filters.quickFilter === qf
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {qf}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StationFilters;
