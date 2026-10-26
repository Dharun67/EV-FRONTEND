import React from 'react';
import Modal from '../shared/Modal';
import { AdminUser } from '../../types/admin';
import StatusBadge from '../shared/StatusBadge';
import { User } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
}

export const UserDetailModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Profile" subtitle={user.id} icon={<User className="w-6 h-6 text-blue-600" />}>
      <div className="space-y-6">
        <div className="flex justify-between items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-sm font-medium text-slate-500 mb-2">{user.email}</p>
            <span className="font-bold text-slate-700 bg-slate-200 px-2 py-1 rounded text-xs">{user.role}</span>
          </div>
          <div className="text-right">
            <StatusBadge status={user.status} />
            <p className="text-xs font-bold text-slate-400 mt-2">Joined: {user.joinedDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Organization</p>
            <p className="text-sm font-bold text-slate-900">{user.organization}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Last Active</p>
            <p className="text-sm font-bold text-slate-900">{user.lastActive}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
