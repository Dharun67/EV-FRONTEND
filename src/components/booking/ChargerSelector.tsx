import React from 'react';
import { ChargerConnector } from '../../types/booking';
import { Zap } from 'lucide-react';

interface ChargerSelectorProps {
  connectors: ChargerConnector[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ChargerSelector: React.FC<ChargerSelectorProps> = ({ connectors, selectedId, onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-slate-400" /> Choose Charger
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectors.map(connector => {
          const isSelected = selectedId === connector.id;
          const isUnavailable = connector.status === 'unavailable';
          const isBusy = connector.status === 'busy';
          
          return (
            <div 
              key={connector.id}
              onClick={() => !isUnavailable && onSelect(connector.id)}
              className={`relative bg-white rounded-2xl p-4 transition-all border-2 flex items-center gap-4
                ${isUnavailable ? 'opacity-60 cursor-not-allowed border-slate-100 bg-slate-50' : 'cursor-pointer'}
                ${isSelected ? 'border-gridwise-blue shadow-md' : !isUnavailable && 'border-slate-200 hover:border-slate-300'}
              `}
            >
              <div className={`p-3 rounded-xl border ${
                isSelected ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <Zap className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-0.5">{connector.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span className="text-slate-700">{connector.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{connector.power} kW</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                  isUnavailable ? 'bg-slate-100 text-slate-400 border-slate-200' :
                  isBusy ? 'bg-amber-50 text-amber-600 border-amber-200' :
                  'bg-green-50 text-green-600 border-green-200'
                }`}>
                  {connector.status}
                </span>
                
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-blue-600 border-gridwise-blue' : 'border-slate-300'}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ChargerSelector;
