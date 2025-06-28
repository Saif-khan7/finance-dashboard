import api from './axios';
export const loginApi = (payload: { email: string; password: string }) =>
  api.post('/api/v1/auth/login', payload);
