import React from 'react';

interface TripSortProps {
  selected: string;
  onSelect: (sort: string) => void;
}

const TripSort: React.FC<TripSortProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Sort By:</span>
      <select 
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-gridwise-blue cursor-pointer outline-none"
      >
        <option>Newest</option>
        <option>Oldest</option>
        <option>Longest Distance</option>
        <option>Shortest Distance</option>
        <option>Highest Efficiency</option>
        <option>Lowest Efficiency</option>
        <option>Highest Energy Usage</option>
      </select>
    </div>
  );
};

export default TripSort;
