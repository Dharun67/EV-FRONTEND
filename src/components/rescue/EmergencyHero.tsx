import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmergencyHeroProps {
  onRequestRescue: () => void;
}

const EmergencyHero: React.FC<EmergencyHeroProps> = ({ onRequestRescue }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 space-y-6">
      {/* Emergency Warning */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900">Critical Battery Level</h4>
            <p className="text-sm font-medium text-amber-700">
              Your battery is running low. Consider requesting assistance before the vehicle becomes stranded.
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/stations')}
          className="whitespace-nowrap px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-bold text-sm shadow-sm transition-colors"
        >
          Find Nearest Charger
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-black text-red-900 mb-2">Need Emergency Assistance?</h2>
        <p className="text-red-700 font-medium mb-6">
          GridWise can help you find nearby rescue charging and roadside assistance.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Battery</p>
            <p className="text-2xl font-black text-red-600">18%</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
            <p className="text-xl font-black text-red-600">CRITICAL</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Remaining Range</p>
            <p className="text-2xl font-black text-slate-900">32 km</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Location</p>
            <p className="text-sm font-bold text-slate-900 leading-tight">Coimbatore, Tamil Nadu</p>
          </div>
        </div>

        <button 
          onClick={onRequestRescue}
          className="w-full py-4 bg-red-600 hover:bg-red-700 text-slate-900 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 animate-pulse"
        >
          <ShieldAlert className="w-6 h-6" /> Request Emergency Rescue
        </button>
      </div>
    </div>
  );
};

export default EmergencyHero;
