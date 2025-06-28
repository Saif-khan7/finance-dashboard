import { Search, Bell } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@radix-ui/react-avatar';
import { Input } from '@/components/ui/input';

export default function Topbar() {
  return (
    <header className="h-14 bg-panel flex items-center px-6 border-b border-card">
      <span className="text-lg font-semibold">Dashboard</span>

      {/* right controls */}
      <div className="ml-auto flex items-center gap-4">

        {/* Search pill */}
        <div className="relative w-60">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search…"
            className="h-9 rounded-full bg-card pl-10 pr-3 border border-border text-sm focus-visible:ring-0"
          />
        </div>

        {/* Bell icon with dot */}
        <div className="relative cursor-pointer">
          <Bell className="size-5 text-muted-foreground" />
          <span className="absolute top-0 right-0 block size-2 rounded-full bg-accentGreen" />
        </div>

        {/* Avatar */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user.jpg" />
          <AvatarFallback className="bg-accentGreen text-black">
            S
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
