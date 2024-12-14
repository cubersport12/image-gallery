import NextAuth, {DefaultSession} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {findUserByEmail} from '@/lib/db/users';
import bcrypt from 'bcryptjs';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
    session({ session }) {
      return {
        ...session,
        user: {
          ...session.user
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials:  { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      authorize: async credentials => {
        const user = await findUserByEmail(String(credentials.email));
        if (user != null) {
          if (bcrypt.compareSync(String(credentials.password), String(user.hashedPassword))) {
            return {
              name: user.name,
              email: user.email
            };
          }
        }

        return null;
      }
    })
  ]
});
