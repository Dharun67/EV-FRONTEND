import { api } from './api';

export const adminApi = {
  getDashboardData: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  getMaintenanceData: async () => {
    const response = await api.get('/admin/maintenance');
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  changeUserRole: async (userId: string, role: string) => {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  }
};
