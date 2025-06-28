import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <div className="flex h-screen items-center justify-center bg-bg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login.mutate(form);
        }}
        className="bg-card p-8 rounded-lg w-80 space-y-4"
      >
        <h1 className="text-xl font-semibold mb-4">Sign in</h1>
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button className="w-full" disabled={login.isPending}>
          {login.isPending ? '...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
