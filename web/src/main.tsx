import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const qc = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
