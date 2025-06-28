import {
  Home,
  Table,
  Wallet,
  BarChart2,
  User,
  Mail,
  Settings,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const links = [
  { to: '/',             label: 'Dashboard',   icon: Home },
  { to: '/transactions', label: 'Transactions',icon: Table },
  { to: '#',             label: 'Wallet',      icon: Wallet },
  { to: '#',             label: 'Analytics',   icon: BarChart2 },
  { to: '#',             label: 'Personal',    icon: User },
  { to: '#',             label: 'Message',     icon: Mail },
  { to: '#',             label: 'Setting',     icon: Settings },
];

export default function Sidebar() {
  const loc = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-60 bg-panel flex flex-col p-5">
      {/* Brand */}
      <h1 className="text-2xl font-bold mb-8">
        <span className="text-accentGreen">F</span>inance
      </h1>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {links.map(({ to, label, icon: Icon }) => {
          const active = loc.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                active
                  ? 'text-accentGreen'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              {/* active bar */}
              {active && (
                <span className="absolute left-0 top-0 h-full w-1 bg-accentGreen rounded-r-md" />
              )}

              <Icon
                size={18}
                className={active ? 'text-accentGreen' : 'text-muted-foreground'}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-card text-muted-foreground text-sm transition-colors"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
