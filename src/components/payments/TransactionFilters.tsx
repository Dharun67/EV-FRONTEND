import React from 'react';
import { Search } from 'lucide-react';

interface TransactionFiltersProps {
  search: string;
  onSearchChange: (s: string) => void;
  filter: string;
  onFilterChange: (f: string) => void;
  sort: string;
  onSortChange: (s: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ 
  search, onSearchChange, 
  filter, onFilterChange, 
  sort, onSortChange 
}) => {
  const filters = ['All', 'Charging', 'Wallet Top-up', 'Emergency Rescue', 'Refund', 'Booking', 'Other'];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-gridwise-blue focus:border-gridwise-blue font-medium bg-slate-50 text-sm"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Sort By:</span>
          <select 
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-gridwise-blue cursor-pointer outline-none w-full sm:w-auto"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Highest Amount</option>
            <option>Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Filters Scrollable */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filter === f 
                ? 'bg-slate-900 border-slate-900 text-slate-900 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionFilters;
