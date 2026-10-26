import React from 'react';
import { PlusCircle } from 'lucide-react';

interface BecomeHostCardProps {
  onListCharger: () => void;
}

const BecomeHostCard: React.FC<BecomeHostCardProps> = ({ onListCharger }) => {
  return (
    <div className="bg-gradient-to-r from-gridwise-blue to-blue-600 rounded-3xl p-8 md:p-10 shadow-md mb-8 text-slate-900 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 2v4c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm7.1 1.9L15.27 6.73a1 1 0 0 0 1.41 1.41L19.51 5.3a1 1 0 0 0-1.41-1.4zM22 11h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1zm-3.9 7.1l-2.83-2.83a1 1 0 0 0-1.41 1.41l2.83 2.83a1 1 0 0 0 1.41-1.41zM12 22c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zM4.9 18.1l2.83-2.83a1 1 0 0 0-1.41-1.41L3.49 16.7a1 1 0 0 0 1.41 1.41zM2 13h4c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm3.9-7.1l2.83 2.83a1 1 0 0 0 1.41-1.41L7.31 4.49a1 1 0 0 0-1.41 1.41z"/>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-2xl">
        <h3 className="text-2xl md:text-3xl font-black mb-3">Have an EV Charger?</h3>
        <p className="text-blue-100 font-medium mb-8 text-lg leading-relaxed">
          Turn your charger into a community resource and earn from every charging session.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            Earn from unused charger time
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            Help other EV drivers
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            Build your community
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            Manage availability
          </div>
        </div>

        <button 
          onClick={onListCharger}
          className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-black shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" /> List Your Charger
        </button>
      </div>
    </div>
  );
};

export default BecomeHostCard;
