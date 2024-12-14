'use client';

import {signUpWithCredentials} from '@/actions';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useFormStatus} from 'react-dom';
import {useState} from 'react';
const RegistrationForm = () => {
  const [password, setPassword] = useState<Partial<Record<'password' | 'password2', string>>>({});
  const handleReg = (formData: FormData) => {
    if (formData.get('password') === formData.get('password2')) {
      signUpWithCredentials(formData);
    }
  };
  return <div className="flex flex-col h-full w-full items-center justify-center">
    <form action={handleReg} className="flex flex-col gap-1 border border-neutral-200 p-2 rounded">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Логин</Label>
        <Input required type="email" name="email" id="email" placeholder="Логин"/>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Пароль</Label>
        <Input required type="password" onChange={e => setPassword({ ...password, password: e.target.value })} name="password" id="password" placeholder="Пароль"/>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password2">Еще раз пароль</Label>
        <Input onChange={e => setPassword({ ...password, password2: e.target.value })} required type="password" name="password2" id="password2" placeholder="Пароль"/>
      </div>
      <Button type="submit" disabled={password.password !== password.password2 || !password.password2?.length || !password.password?.length }>
        Регистрация
      </Button>
    </form>
  </div>;
};

export default RegistrationForm;
