import { api } from './api';

export const queueApi = {
  getQueue: async (stationId: string) => {
    const response = await api.get(`/queue/${stationId}`);
    return response.data;
  }
};
