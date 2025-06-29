import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login        from '@/pages/Login';
import Register     from '@/pages/Register';
import Dashboard    from '@/pages/Dashboard';
import Transactions from '@/pages/Transactions';
import Shell        from '@/layouts/Shell';
import type { JSX } from 'react';

const Private = ({ children }: { children: JSX.Element }) =>
  localStorage.getItem('token') ? children : <Navigate to="/login" replace />;

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected */}
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

        {/* fallback → redirect root to /login if unknown */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
