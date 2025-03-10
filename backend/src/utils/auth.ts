import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './interface';

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const createJWT = (user: User) => {
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
};

export { createJWT, comparePassword, hashPassword };