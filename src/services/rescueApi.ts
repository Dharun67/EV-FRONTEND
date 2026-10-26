import { api } from './api';

export const rescueApi = {
  request: async (rescueData: any) => {
    const response = await api.post('/rescue/request', rescueData);
    return response.data;
  },
  getStatus: async () => {
    const response = await api.get(`/rescue/status`);
    return response.data;
  },
  cancel: async () => {
    const response = await api.post(`/rescue/cancel`);
    return response.data;
  }
};
