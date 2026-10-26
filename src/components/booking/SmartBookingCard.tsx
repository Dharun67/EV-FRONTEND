import React from 'react';
import { Sparkles, MapPin, Clock, Zap } from 'lucide-react';

interface SmartBookingCardProps {
  onApply: () => void;
}

const SmartBookingCard: React.FC<SmartBookingCardProps> = ({ onApply }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 md:p-8 shadow-lg mb-8 relative overflow-hidden border border-indigo-700 text-slate-900">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Sparkles className="w-40 h-40 text-purple-300" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <h3 className="font-bold text-lg">Smart Booking Suggestion</h3>
            <span className="bg-white/20 text-slate-900 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm border border-white/20">
              AI OPTIMIZED
            </span>
          </div>

          <p className="text-indigo-100 font-medium leading-relaxed max-w-xl mb-6 italic">
            "10:30 PM at GridWise Central Hub is the best option for your current journey based on your ETA and traffic."
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Station</p>
              <p className="font-bold">GridWise Central</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Time</p>
              <p className="font-bold">10:30 PM</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1"><Zap className="w-3 h-3"/> Charger</p>
              <p className="font-bold">C-04 (150 kW)</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">Duration</p>
              <p className="font-bold">30 min</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onApply}
          className="w-full md:w-auto flex-shrink-0 px-6 py-4 bg-white text-indigo-900 rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all text-sm"
        >
          Apply Suggestion
        </button>
      </div>
    </div>
  );
};

export default SmartBookingCard;
