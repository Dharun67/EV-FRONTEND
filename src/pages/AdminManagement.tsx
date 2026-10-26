import React, { useState, useEffect } from 'react';
import { Users, MapPin, Search, Edit2, Trash2, Check, X, UserCog, User, Shield } from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { getApi } from '../utils/api';
import PageHeader from '../components/shared/PageHeader';

const AdminManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'stations'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await adminApi.getUsers();
        if (res.success) setUsers(res.users);
      } else {
        const res = await getApi('stations');
        if (res.data) setStations(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Handle Role Change
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await adminApi.changeUserRole(userId, newRole.toUpperCase());
      fetchData();
    } catch (e) {
      alert("Failed to update role");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col pb-12 animate-in fade-in duration-500">
      
      <PageHeader 
        title="Admin Management" 
        subtitle="Manage users, roles, and CPO station infrastructure."
      />

      <div className="flex bg-white rounded-xl border border-slate-200 p-1 mb-8 w-fit shadow-sm">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" /> User Management
        </button>
        <button
          onClick={() => setActiveTab('stations')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'stations' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <MapPin className="w-4 h-4" /> Station Management
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
              className="w-full bg-white border border-slate-300 text-slate-700 text-sm rounded-xl pl-9 pr-4 py-2 font-medium focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow-sm">
            + Add New {activeTab === 'users' ? 'User' : 'Station'}
          </button>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-slate-500 font-bold">Loading...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  {activeTab === 'users' ? (
                    <>
                      <th className="p-4 pl-6">User</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Joined</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </>
                  ) : (
                    <>
                      <th className="p-4 pl-6">Station ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Power</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeTab === 'users' && users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.role?.toUpperCase() === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                          {user.role?.toUpperCase() === 'ADMIN' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-slate-900">{user.name || 'Unknown User'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 font-medium">{user.email}</td>
                    <td className="p-4">
                      <select 
                        value={user.role?.toUpperCase() || 'USER'}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded-md border ${
                          user.role?.toUpperCase() === 'ADMIN' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <span className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500 font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {activeTab === 'stations' && stations.map((station) => (
                  <tr key={station._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-900 text-sm">{station.stationId}</td>
                    <td className="p-4 text-sm text-slate-700 font-bold">{station.name}</td>
                    <td className="p-4 text-sm text-slate-500 font-medium">{station.address}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider border ${
                        station.status === 'Operational' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {station.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-700 font-bold">{station.powerCapacityKw} kW</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
