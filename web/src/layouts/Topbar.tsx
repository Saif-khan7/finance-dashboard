import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@radix-ui/react-avatar';
import { Input } from '@/components/ui/input';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Topbar() {
  const { pathname } = useLocation();

  const pageTitle = (() => {
    if (pathname === '/' || pathname === '/dashboard') return 'Dashboard';
    if (pathname.startsWith('/transactions'))          return 'Transactions';
    if (pathname.startsWith('/wallet'))                return 'Wallet';
    if (pathname.startsWith('/analytics'))             return 'Analytics';
    return cap(pathname.replace('/', ''));
  })();

  return (
    <header className="h-14 bg-panel flex items-center px-6 border-b border-card">
      <span className="text-lg font-semibold">{pageTitle}</span>

      {/* right controls */}
      <div className="ml-auto flex items-center gap-4">
        {/* search pill */}
        <div className="relative w-72">
          <Input
            placeholder="Search…"
            className="h-9 rounded-full bg-[#282c35] border-none pl-4 pr-10 text-sm focus-visible:ring-0"
          />
          <Search className="absolute right-4 top-2.5 size-4 text-muted-foreground" />
        </div>

        {/* notification bell */}
        <div className="relative cursor-pointer">
          <Bell className="size-5 text-muted-foreground" />
          <span className="absolute top-0 right-0 block size-2 rounded-full bg-accentGreen" />
        </div>

        {/* rounded-square avatar */}
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://i.pravatar.cc/64"
            alt="user"
            className="h-8 w-8 rounded-md object-cover"
          />
          <AvatarFallback className="h-8 w-8 rounded-md bg-accentGreen text-black">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
