import React from 'react';
import { CommunityHost } from '../../types/community';
import { Star } from 'lucide-react';

interface TopHostsProps {
  hosts: CommunityHost[];
}

const TopHosts: React.FC<TopHostsProps> = ({ hosts }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900">Top Community Hosts</h3>
        <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
          View All Hosts
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hosts.map(host => (
          <div key={host.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-lg font-bold flex-shrink-0">
                {host.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{host.name}</h4>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3 h-3 fill-current" /> {host.rating}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">{host.sessions} sessions</span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-green-50 text-green-600 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopHosts;
