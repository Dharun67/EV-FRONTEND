import React from 'react';
import DataTable from '../shared/DataTable';
import StatusBadge from '../shared/StatusBadge';
import { MaintenanceAsset } from '../../types/maintenance';
import { Settings2 } from 'lucide-react';

interface Props {
  assets: MaintenanceAsset[];
}

const MaintenanceTable: React.FC<Props> = ({ assets }) => {
  const sorted = [...assets].sort((a, b) => {
    const priorityWeight = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });

  const columns = [
    { key: 'id', label: 'Asset ID' },
    { key: 'station', label: 'Station' },
    { key: 'type', label: 'Type', hiddenOnMobile: true },
    { key: 'issue', label: 'Issue' },
    { key: 'priority', label: 'Priority', align: 'center' as const },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: '', align: 'right' as const },
  ];

  const renderCell = (item: MaintenanceAsset, columnKey: string) => {
    switch (columnKey) {
      case 'id':
        return <span className="font-bold text-slate-900">{item.id}</span>;
      case 'station':
        return <span className="font-medium text-slate-600">{item.station}</span>;
      case 'type':
        return <span className="font-medium text-slate-600">{item.type}</span>;
      case 'issue':
        return <span className="font-medium text-slate-900 line-clamp-1 max-w-[200px]">{item.issue}</span>;
      case 'priority':
        let color = 'bg-slate-100 text-slate-600';
        if (item.priority === 'Critical') color = 'bg-red-100 text-red-700';
        if (item.priority === 'High') color = 'bg-orange-100 text-orange-700';
        if (item.priority === 'Medium') color = 'bg-blue-100 text-blue-700';
        return <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${color}`}>{item.priority}</span>;
      case 'status':
        return <StatusBadge status={item.status} />;
      case 'actions':
        return (
          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900">Maintenance Schedule & Active Faults</h2>
      </div>
      <DataTable 
        columns={columns}
        data={sorted}
        renderCell={renderCell}
      />
    </div>
  );
};

export default MaintenanceTable;
