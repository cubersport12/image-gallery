'use server';

import {signIn, signOut} from '@/auth';
import {createUser} from '@/lib/db/users';
import {redirect} from 'next/navigation';

export const logoutWithCredentials = async () => {
  await signOut();
};

export const signUpWithCredentials = async (form: FormData) => {
  await createUser(String(form.get('email')), String(form.get('password')));
  redirect('/login');
};

export const loginWithCredentials = async (form: FormData) => {
  const raw = {
    email: form.get('email'),
    password: form.get('password'),
    redirectTo: '/'
  };
  await signIn('credentials', raw);
};
