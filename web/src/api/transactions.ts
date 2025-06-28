import api from './axios';

export const listTx = (params: any) =>
  api.get('/api/v1/transactions', { params }).then((r) => r.data);

export const exportCsv = (body: any) =>
  api.post('/api/v1/export', body, { responseType: 'blob' });

export const listTxPaginated = (params: any) =>
  api.get('/api/v1/transactions', { params }).then((r) => r.data);
