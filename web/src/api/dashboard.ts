import api from './axios';
export const getSummary = () =>
  api.get('/api/v1/dashboard/summary').then((r) => r.data);
