import { api } from './api';

export const aiApi = {
  getRecommendation: async (payload: any) => {
    const response = await api.post('/ai/recommend', payload);
    return response.data;
  },
  predictWaitTime: async (payload: any) => {
    const response = await api.post('/ai/predict-wait', payload);
    return response.data;
  },
  planTrip: async (payload: any) => {
    const response = await api.post('/ai/trip-plan', payload);
    return response.data;
  }
};
