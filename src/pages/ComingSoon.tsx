import React from 'react';
import { Construction } from 'lucide-react';

const ComingSoon: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Construction className="h-10 w-10 text-blue-600" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Coming Soon</h1>
      <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
        We're actively building this feature. Check back later as we continue to expand the GridWise Intelligence platform.
      </p>
    </div>
  );
};

export default ComingSoon;
