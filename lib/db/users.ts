import {db, users} from '@/schema';
import {eq} from 'drizzle-orm';
import {saltAndHashPassword} from '@/lib/hash';



export const findUserByEmail = async (email: string) => {
  const r = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    hashedPassword: users.hashedPassword }).from(users)
    .where(eq(users.email, email))
    .limit(1);
  return r?.[0];
};

export const createUser =  async (email: string, password: string) => {
  const hashedPassword = saltAndHashPassword(password);
  await db.insert(users).values({
    email,
    hashedPassword,
    name: email.split('@')[0]
  });
};
