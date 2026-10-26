import { api } from './api';

export const stationApi = {
  getAll: async (params?: any) => {
    const response = await api.get('/stations', { params });
    return response.data;
  },
  createStation: async (stationData: any) => {
    const response = await api.post('/stations', stationData);
    return response.data;
  },
  getNearby: async (lat: number, lng: number, distance?: number) => {
    const response = await api.get('/charging-stations/nearby', { params: { lat, lng, distance } });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/stations/${id}`);
    return response.data;
  },
  getAvailability: async (id: string) => {
    const response = await api.get(`/stations/${id}/availability`);
    return response.data;
  },
  getChargers: async (id: string) => {
    const response = await api.get(`/stations/${id}/chargers`);
    return response.data;
  }
};
