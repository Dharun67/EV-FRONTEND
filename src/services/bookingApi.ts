import { api } from './api';

export const bookingApi = {
  create: async (bookingData: any) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  checkFeasibility: async (data: any) => {
    const response = await api.post('/bookings/feasibility', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  cancel: async (id: string) => {
    const response = await api.post(`/bookings/${id}/cancel`);
    return response.data;
  }
};
