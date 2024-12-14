'use client';
import LogoutBtn from '@/components/logout-btn';
import {Button} from '@/components/ui/button';
import {Home} from 'lucide-react';
import { useSession } from 'next-auth/react';
import {redirect} from 'next/navigation';

const NavBar = () => {
  const session = useSession();
  const handleHome = () => {
    redirect('/');
  };
  return <div className="h-10 items-center bg-primary w-full flex pl-1 pr-1">
    <Button onClick={handleHome}>
      <Home />
      Домой
    </Button>
    <div className="flex gap-1 ml-auto items-center">
      <span className="text-gray-200">{session?.data?.user?.name}</span>
      <LogoutBtn/>
    </div>
  </div>;
};

export default NavBar;
