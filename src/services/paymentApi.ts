import { api } from './api';

export const paymentApi = {
  createOrder: async (paymentData: any) => {
    const response = await api.post('/payments/create', paymentData);
    return response.data;
  },
  verify: async (verifyData: any) => {
    const response = await api.post('/payments/verify', verifyData);
    return response.data;
  },
  getStatus: async (id: string) => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  }
};
