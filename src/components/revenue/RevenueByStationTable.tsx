import React from 'react';
import DataTable from '../shared/DataTable';
import { RevenueStation } from '../../types/revenue';

interface Props {
  stations: RevenueStation[];
}

const RevenueByStationTable: React.FC<Props> = ({ stations }) => {
  const sorted = [...stations].sort((a, b) => b.revenueInr - a.revenueInr);

  const columns = [
    { key: 'name', label: 'Station' },
    { key: 'sessions', label: 'Sessions', align: 'center' as const, hiddenOnMobile: true },
    { key: 'energy', label: 'Energy (kWh)', align: 'center' as const, hiddenOnMobile: true },
    { key: 'revenue', label: 'Revenue (₹)', align: 'right' as const },
    { key: 'growth', label: 'Growth', align: 'right' as const },
    { key: 'utilization', label: 'Utilization', align: 'center' as const },
  ];

  const renderCell = (item: RevenueStation, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return <span className="font-bold text-slate-900">{item.name}</span>;
      case 'sessions':
        return <span className="font-medium text-slate-600">{item.sessions.toLocaleString()}</span>;
      case 'energy':
        return <span className="font-medium text-slate-600">{item.energyKWh.toLocaleString()}</span>;
      case 'revenue':
        return <span className="font-bold text-slate-900 text-right block">₹{(item.revenueInr / 100000).toFixed(2)} L</span>;
      case 'growth':
        return (
          <span className={`font-bold block text-right ${item.growthPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {item.growthPercentage >= 0 ? '+' : ''}{item.growthPercentage}%
          </span>
        );
      case 'utilization':
        return (
          <div className="flex flex-col items-center gap-1 w-24 mx-auto">
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.utilizationPercentage > 80 ? 'bg-orange-500' : item.utilizationPercentage > 50 ? 'bg-blue-500' : 'bg-slate-400'}`}
                style={{ width: `${item.utilizationPercentage}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{item.utilizationPercentage}%</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Revenue by Station</h2>
      <DataTable 
        columns={columns}
        data={sorted}
        renderCell={renderCell}
      />
    </div>
  );
};

export default RevenueByStationTable;
