import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

interface CommunitySearchProps {
  onSearch: (query: string) => void;
}

const CommunitySearch: React.FC<CommunitySearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('Coimbatore, Tamil Nadu');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <p className="text-sm font-bold text-slate-900 mb-3">Where do you want to charge?</p>
      
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-gridwise-blue focus:border-gridwise-blue font-medium bg-slate-50"
            placeholder="Search location, landmark or area..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleSearch}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-slate-900 px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" /> Search
          </button>
          
          <button 
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl transition-colors border border-slate-200"
            title="Current Location"
          >
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySearch;
