'use client';
import {Button} from '@/components/ui/button';
import {LogOut} from 'lucide-react';
import {logoutWithCredentials} from '@/actions';

const LogoutBtn = ({ className }: { className?: string }) => {
  return <Button onClick={logoutWithCredentials} size="icon" className={className}>
    <LogOut />
  </Button>;
};
export default LogoutBtn;
