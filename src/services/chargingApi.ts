import { api } from './api';

export const chargingApi = {
  getSessionStatus: async (sessionId: string) => {
    const response = await api.get(`/charging-sessions/${sessionId}`);
    return response.data;
  },
  stopSession: async (sessionId: string) => {
    const response = await api.post(`/charging-sessions/${sessionId}/stop`);
    return response.data;
  }
};
