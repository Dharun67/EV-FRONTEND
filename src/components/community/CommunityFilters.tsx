import React from 'react';

interface CommunityFiltersProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

const CommunityFilters: React.FC<CommunityFiltersProps> = ({ selectedFilter, onSelectFilter }) => {
  const filters = [
    'All',
    'Available Now',
    'Home Chargers',
    'Apartment Chargers',
    'Workplace',
    'Business',
    'Low Cost',
    'Fast Charging',
    'Top Rated'
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 hide-scrollbar">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onSelectFilter(filter)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
            selectedFilter === filter 
              ? 'bg-blue-600 border-gridwise-blue text-slate-900 shadow-sm' 
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default CommunityFilters;
