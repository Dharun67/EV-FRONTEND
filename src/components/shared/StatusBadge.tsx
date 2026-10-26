import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const s = status.toLowerCase();
  let color = 'bg-slate-100 text-slate-700';

  if (s.includes('active') || s.includes('charging') || s.includes('healthy') || s.includes('operational')) {
    color = 'bg-green-100 text-green-700';
  } else if (s.includes('critical') || s.includes('fault') || s.includes('suspended')) {
    color = 'bg-red-100 text-red-700';
  } else if (s.includes('maintenance') || s.includes('high') || s.includes('warning') || s.includes('pending')) {
    color = 'bg-orange-100 text-orange-700';
  } else if (s.includes('available') || s.includes('driving') || s.includes('medium')) {
    color = 'bg-blue-100 text-blue-700';
  }

  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${color} whitespace-nowrap`}>
      {status}
    </span>
  );
};

export default StatusBadge;
