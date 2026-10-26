import React from 'react';
import DataTable from '../shared/DataTable';
import StatusBadge from '../shared/StatusBadge';
import { FleetVehicle } from '../../types/fleet';
import { Eye, BatteryMedium, MapPin } from 'lucide-react';

interface Props {
  vehicles: FleetVehicle[];
  onViewDetails: (v: FleetVehicle) => void;
}

const FleetTable: React.FC<Props> = ({ vehicles, onViewDetails }) => {
  const columns = [
    { key: 'id', label: 'Vehicle ID' },
    { key: 'model', label: 'Vehicle' },
    { key: 'fleetName', label: 'Fleet' },
    { key: 'battery', label: 'Battery', align: 'center' as const },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Current Station', hiddenOnMobile: true },
    { key: 'energy', label: 'Energy', align: 'center' as const, hiddenOnMobile: true },
    { key: 'cost', label: 'Cost', align: 'center' as const },
    { key: 'actions', label: '', align: 'right' as const },
  ];

  const renderCell = (item: FleetVehicle, columnKey: string) => {
    switch (columnKey) {
      case 'id':
        return <span className="font-bold text-slate-900">{item.id}</span>;
      case 'model':
        return <span className="font-medium text-slate-600">{item.model}</span>;
      case 'fleetName':
        return <span className="font-bold text-blue-600">{item.fleetName}</span>;
      case 'battery':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className={`text-xs font-bold ${item.batteryLevel < 20 ? 'text-red-600' : 'text-slate-900'}`}>{item.batteryLevel}%</span>
            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.batteryLevel < 20 ? 'bg-red-500' : item.batteryLevel < 50 ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${item.batteryLevel}%` }}
              />
            </div>
          </div>
        );
      case 'status':
        return <StatusBadge status={item.status} />;
      case 'location':
        return item.currentStation ? (
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {item.currentStation}
          </div>
        ) : <span className="text-slate-400">-</span>;
      case 'energy':
        return <span className="font-medium text-slate-600">{item.energyConsumedKWh > 0 ? `${item.energyConsumedKWh} kWh` : '-'}</span>;
      case 'cost':
        return <span className="font-medium text-slate-600">{item.costInr > 0 ? `₹${item.costInr}` : '-'}</span>;
      case 'actions':
        return (
          <button 
            onClick={() => onViewDetails(item)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Fleet Tracking</h2>
      <DataTable 
        columns={columns}
        data={vehicles}
        renderCell={renderCell}
      />
    </div>
  );
};

export default FleetTable;
