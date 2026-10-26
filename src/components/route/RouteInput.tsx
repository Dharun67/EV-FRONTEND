import React from 'react';
import { MapPin, ArrowDownUp } from 'lucide-react';

interface RouteInputProps {
  startLocation: string;
  setStartLocation: (val: string) => void;
  destination: string;
  setDestination: (val: string) => void;
  onSwap: () => void;
}

const RouteInput: React.FC<RouteInputProps> = ({
  startLocation,
  setStartLocation,
  destination,
  setDestination,
  onSwap
}) => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="block w-full min-h-[56px] pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-gridwise-blue focus:ring-2 focus:ring-gridwise-blue/20 transition-all text-sm font-semibold shadow-sm outline-none"
            placeholder="Start Location"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-red-500" />
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="block w-full min-h-[56px] pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-gridwise-blue focus:ring-2 focus:ring-gridwise-blue/20 transition-all text-sm font-semibold shadow-sm outline-none"
            placeholder="Destination"
          />
        </div>
      </div>
      
      <button 
        onClick={onSwap}
        className="absolute top-1/2 left-[28px] transform -translate-y-1/2 -translate-x-1/2 bg-white border border-slate-200 p-1.5 rounded-full shadow-sm hover:shadow-md hover:border-gridwise-blue text-slate-400 hover:text-blue-600 transition-all"
        title="Swap Locations"
      >
        <ArrowDownUp className="h-4 w-4" />
      </button>
      <div className="absolute top-[28px] left-[27px] w-0.5 h-[calc(100%-56px)] bg-slate-200 -z-10 border-l border-dashed border-slate-300"></div>
    </div>
  );
};

export default RouteInput;
