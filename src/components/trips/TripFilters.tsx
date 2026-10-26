import React from 'react';

interface TripFiltersProps {
  selected: string;
  onSelect: (filter: string) => void;
}

const TripFilters: React.FC<TripFiltersProps> = ({ selected, onSelect }) => {
  const filters = [
    'All Trips',
    'Completed',
    'Cancelled',
    'Long Distance',
    'Short Distance',
    'High Efficiency',
    'Low Efficiency'
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
            selected === filter 
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

export default TripFilters;
