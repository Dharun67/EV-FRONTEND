import React from 'react';
import DataTable from '../shared/DataTable';
import StatusBadge from '../shared/StatusBadge';
import { AdminUser } from '../../types/admin';
import { Eye, Edit, ShieldOff, CheckCircle } from 'lucide-react';

interface Props {
  users: AdminUser[];
  onView: (u: AdminUser) => void;
}

export const UserTable: React.FC<Props> = ({ users, onView }) => {
  const columns = [
    { key: 'user', label: 'User' },
    { key: 'role', label: 'Role' },
    { key: 'org', label: 'Organization', hiddenOnMobile: true },
    { key: 'status', label: 'Status', align: 'center' as const },
    { key: 'active', label: 'Last Active', hiddenOnMobile: true },
    { key: 'actions', label: 'Actions', align: 'right' as const },
  ];

  const renderCell = (item: AdminUser, columnKey: string) => {
    switch(columnKey) {
      case 'user':
        return (
          <div>
            <p className="font-bold text-slate-900">{item.name}</p>
            <p className="text-xs font-medium text-slate-500">{item.email}</p>
          </div>
        );
      case 'role':
        return <span className="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded text-xs">{item.role}</span>;
      case 'org':
        return <span className="font-medium text-slate-600">{item.organization}</span>;
      case 'status':
        return <StatusBadge status={item.status} />;
      case 'active':
        return <span className="text-xs font-medium text-slate-500">{item.lastActive}</span>;
      case 'actions':
        return (
          <div className="flex justify-end gap-1">
            <button onClick={() => onView(item)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded" title="View"><Eye className="w-4 h-4"/></button>
            <button className="p-1.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded" title="Edit"><Edit className="w-4 h-4"/></button>
            {item.status === 'Active' ? (
              <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded" title="Suspend"><ShieldOff className="w-4 h-4"/></button>
            ) : (
              <button className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded" title="Activate"><CheckCircle className="w-4 h-4"/></button>
            )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-4">User Directory</h2>
      <DataTable columns={columns} data={users} renderCell={renderCell} />
    </div>
  );
};
