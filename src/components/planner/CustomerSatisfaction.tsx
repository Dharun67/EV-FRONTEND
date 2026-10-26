import React from 'react';
import { Star } from 'lucide-react';

interface CustomerSatisfactionProps {
  data: Array<{ stars: number, percentage: number }>;
}

const CustomerSatisfaction: React.FC<CustomerSatisfactionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 h-full flex flex-col">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" /> Driver Experience
      </h3>

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Average Rating</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black text-slate-900">4.7</span>
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          </div>
        </div>

        <div className="space-y-3">
          {data.map(item => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="w-12 text-sm font-bold text-slate-600 flex justify-end gap-1">
                {item.stars} <Star className="w-4 h-4 text-slate-400" />
              </span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.stars >= 4 ? 'bg-green-500' : item.stars === 3 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="w-8 text-xs font-bold text-slate-500 text-right">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;
