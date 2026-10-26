import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

const SafetyChecklist: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Vehicle is safely stopped', checked: false },
    { id: 2, text: 'Hazard lights are on', checked: false },
    { id: 3, text: 'Passengers are safe', checked: false },
    { id: 4, text: 'Vehicle location is correct', checked: false },
    { id: 5, text: 'Charger/vehicle issue identified', checked: false },
  ]);
  const [confirmed, setConfirmed] = useState(false);

  const toggleItem = (id: number) => {
    setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const allChecked = items.every(i => i.checked);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <ClipboardCheck className="w-5 h-5 text-slate-400" /> Before Requesting Rescue
      </h3>
      
      <div className="space-y-3 mb-6">
        {items.map(item => (
          <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              item.checked ? 'bg-blue-600 border-gridwise-blue text-slate-900' : 'border-slate-300 group-hover:border-slate-400'
            }`}>
              {item.checked && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <input type="checkbox" className="hidden" checked={item.checked} onChange={() => toggleItem(item.id)} />
            <span className={`text-sm font-medium ${item.checked ? 'text-slate-900 line-through opacity-50' : 'text-slate-700'}`}>{item.text}</span>
          </label>
        ))}
      </div>

      <button 
        disabled={!allChecked || confirmed}
        onClick={() => setConfirmed(true)}
        className={`w-full py-3 rounded-xl font-bold transition-all shadow-sm ${
          confirmed ? 'bg-green-100 text-green-700 cursor-not-allowed' :
          allChecked ? 'bg-slate-900 hover:bg-slate-800 text-slate-900' :
          'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        {confirmed ? 'Safety checklist confirmed' : 'Confirm Safety'}
      </button>
    </div>
  );
};

export default SafetyChecklist;
