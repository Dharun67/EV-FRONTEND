import React from 'react';
import { Search } from 'lucide-react';

interface TripSearchProps {
  value: string;
  onChange: (val: string) => void;
}

const TripSearch: React.FC<TripSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 min-w-[250px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-gridwise-blue focus:border-gridwise-blue font-medium bg-slate-50 text-sm"
        placeholder="Search trips by origin, destination or date..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TripSearch;
