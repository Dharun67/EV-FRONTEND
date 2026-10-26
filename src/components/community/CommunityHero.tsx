import React from 'react';
import { Users, Zap, MapPin, Map } from 'lucide-react';

const CommunityHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 shadow-lg mb-8 relative overflow-hidden text-slate-900 border border-indigo-700">
      <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
        <Users className="w-64 h-64" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Charge Beyond Charging Networks</h2>
        <p className="text-lg text-indigo-100 font-medium mb-10 max-w-2xl leading-relaxed">
          Access privately shared chargers from homes, apartments, workplaces and local businesses.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-300" />
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Community Chargers</p>
            </div>
            <p className="text-2xl font-black">248</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-400" />
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Available Now</p>
            </div>
            <p className="text-2xl font-black">137</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-300" />
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Active Hosts</p>
            </div>
            <p className="text-2xl font-black">86</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-orange-300" />
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Cities Covered</p>
            </div>
            <p className="text-2xl font-black">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHero;
