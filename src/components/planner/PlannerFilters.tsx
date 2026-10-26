import React from 'react';
import { Filter, Search } from 'lucide-react';

interface PlannerFiltersProps {
  search: string;
  onSearchChange: (s: string) => void;
  statusFilter: string;
  onStatusChange: (s: string) => void;
  regionFilter: string;
  onRegionChange: (r: string) => void;
}

const PlannerFilters: React.FC<PlannerFiltersProps> = ({ 
  search, onSearchChange,
  statusFilter, onStatusChange,
  regionFilter, onRegionChange
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex items-center gap-2 px-2 text-slate-400">
        <Filter className="w-5 h-5" />
        <span className="font-bold text-sm hidden sm:block">Filters:</span>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-gridwise-blue focus:border-gridwise-blue font-medium bg-slate-50 text-sm"
            placeholder="Search station or charger..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Region */}
        <div className="relative">
          <select 
            value={regionFilter}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gridwise-blue cursor-pointer"
          >
            <option value="All">All Regions</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Tiruppur">Tiruppur</option>
            <option value="Pollachi">Pollachi</option>
          </select>
        </div>

        {/* Status */}
        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gridwise-blue cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Operational">Operational</option>
            <option value="Degraded">Degraded</option>
            <option value="Offline">Offline</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlannerFilters;
