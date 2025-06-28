import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export const signToken = (id: string) =>
  jwt.sign({ id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
