import React, { useState } from 'react';
import { MapPin, Target, Search, X } from 'lucide-react';

interface StationSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const StationSearch: React.FC<StationSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const [toastMessage, setToastMessage] = useState('');

  const handleUseLocation = () => {
    setToastMessage('Using your current location');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 relative">
      {toastMessage && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-slate-900 text-xs font-semibold px-4 py-2 rounded-lg shadow-lg z-50 transition-all">
          {toastMessage}
        </div>
      )}
      
      {/* Location Bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex items-center justify-between md:w-1/3">
        <div className="flex items-center gap-2 text-slate-700 truncate">
          <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex flex-col truncate">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Location</span>
            <span className="text-sm font-semibold truncate">Coimbatore, Tamil Nadu</span>
          </div>
        </div>
        <button 
          onClick={handleUseLocation}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors flex-shrink-0"
          title="Use Current Location"
        >
          <Target className="h-5 w-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full h-full min-h-[56px] pl-12 pr-12 rounded-xl border border-slate-200 bg-white focus:border-gridwise-blue focus:ring-2 focus:ring-gridwise-blue/20 outline-none transition-all text-sm font-medium shadow-sm placeholder:text-slate-400"
          placeholder="Search charging stations, locations or landmarks..."
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StationSearch;
