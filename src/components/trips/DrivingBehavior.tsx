import React from 'react';
import { Activity } from 'lucide-react';

interface DrivingBehaviorProps {
  behavior: any;
}

const DrivingBehavior: React.FC<DrivingBehaviorProps> = ({ behavior }) => {
  const metrics = [
    { label: 'Smooth Driving', value: behavior.smoothDriving },
    { label: 'Efficient Acceleration', value: behavior.efficientAccel },
    { label: 'Regenerative Braking', value: behavior.regenBraking },
    { label: 'Speed Optimization', value: behavior.speedOptim },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" /> Driving Behavior
      </h3>

      <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-6">
        <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center flex-shrink-0 relative">
          <span className="text-2xl font-black text-slate-900">{behavior.score}</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Overall Driving Score</p>
          <p className="text-2xl font-black text-green-600 mb-1">Good</p>
          <p className="text-xs font-medium text-slate-500">Based on last 30 trips</p>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-bold text-slate-900 mb-1">
              <span>{metric.label}</span>
              <span>{metric.value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${metric.value >= 80 ? 'bg-green-500' : 'bg-blue-600'}`} 
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrivingBehavior;
