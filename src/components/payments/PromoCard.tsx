import React, { useState } from 'react';
import { Tag } from 'lucide-react';

const PromoCard: React.FC = () => {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const handleApply = () => {
    const c = code.toUpperCase().trim();
    if (c === 'GRID10') setMsg('₹10 charging discount applied.');
    else if (c === 'EV50') setMsg('₹50 wallet credit added.');
    else if (c === 'WELCOME100') setMsg('₹100 promotional credit added.');
    else setMsg('Invalid promo code.');
    
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Tag className="w-5 h-5 text-slate-400" /> Promo & Offers
      </h3>

      <div className="flex gap-2 mb-2">
        <input 
          type="text" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter promo code"
          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm uppercase focus:outline-none focus:ring-2 focus:ring-gridwise-blue"
        />
        <button 
          onClick={handleApply}
          disabled={!code}
          className="px-6 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-slate-900 rounded-xl font-bold text-sm transition-colors"
        >
          Apply
        </button>
      </div>
      
      {msg && (
        <p className={`text-xs font-bold mt-2 ${msg.includes('Invalid') ? 'text-red-500' : 'text-green-600'}`}>
          {msg}
        </p>
      )}
    </div>
  );
};

export default PromoCard;
