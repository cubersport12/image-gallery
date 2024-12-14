import bcrypt from 'bcryptjs';

export const saltAndHashPassword = (password: string) => {
  const saltRound = 10;
  return bcrypt.hashSync(password, saltRound);
};
