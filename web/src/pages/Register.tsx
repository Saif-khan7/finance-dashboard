import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/auth/register', form);
      nav('/login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm space-y-6
          rounded-xl shadow-xl
          bg-[#282c35]            /* ← updated */
          px-8 py-10
        "
      >
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="text-xs text-[#8A8F9B]">It’s quick and easy</p>
        </header>

        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button className="w-full" disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </Button>

        <p className="text-xs text-center text-[#8A8F9B]">
          Already have an account?
          <Link to="/login" className="ml-1 text-accentGreen hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
