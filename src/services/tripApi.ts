import { api } from './api';

export const tripApi = {
  getHistory: async () => {
    const response = await api.get('/trips');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },
  planTrip: async (payload: { start: string; destination: string; vehicle_id?: string }) => {
    const response = await api.post('/trips/plan', payload);
    return response.data;
  }
};
