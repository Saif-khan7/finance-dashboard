import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Shell from '@/layouts/Shell';
import type { JSX } from 'react';

const Private = ({ children }: { children: JSX.Element }) =>
  localStorage.getItem('token') ? children : <Navigate to="/login" />;

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Private>
              <Shell>
                <Dashboard />
              </Shell>
            </Private>
          }
        />
        <Route
          path="/transactions"
          element={
            <Private>
              <Shell>
                <Transactions />
              </Shell>
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
