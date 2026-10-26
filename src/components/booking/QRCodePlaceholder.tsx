import React from 'react';

interface QRCodePlaceholderProps {
  bookingId: string;
}

const QRCodePlaceholder: React.FC<QRCodePlaceholderProps> = ({ bookingId }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="w-48 h-48 bg-white border-4 border-slate-900 rounded-xl p-4 flex items-center justify-center relative overflow-hidden shadow-sm mb-4">
        {/* Mock QR pattern */}
        <div className="absolute top-4 left-4 w-10 h-10 border-4 border-slate-900"></div>
        <div className="absolute top-4 right-4 w-10 h-10 border-4 border-slate-900"></div>
        <div className="absolute bottom-4 left-4 w-10 h-10 border-4 border-slate-900"></div>
        
        <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full p-12">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className={`bg-slate-900 ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
          ))}
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scan at charger</p>
      <p className="font-mono text-sm font-bold text-slate-700">{bookingId}</p>
    </div>
  );
};

export default QRCodePlaceholder;
