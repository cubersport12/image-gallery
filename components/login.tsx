'use client';
import {loginWithCredentials} from '@/actions';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {LogIn} from 'lucide-react';
import {redirect} from 'next/navigation';
import {MouseEvent} from 'react';
//5432 123
const LoginForm = () => {
  const handleRegistration = (e: MouseEvent) => {
    e.preventDefault();
    redirect('/reg');
  };
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <form action={loginWithCredentials} className="flex flex-col gap-1 border border-neutral-200 p-2 rounded">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Логин</Label>
          <Input type="email" name="email" id="email" placeholder="Логин"/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Пароль</Label>
          <Input type="password" name="password" id="password" placeholder="Пароль"/>
        </div>
        <Button type="submit">
          <LogIn />
          Войти
        </Button>
        <Button variant="link" onClick={handleRegistration}>
          Регистрация
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
