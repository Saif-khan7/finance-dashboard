// src/config/jwt.ts
import { Secret, SignOptions } from 'jsonwebtoken';

export const jwtConfig: {
  secret: Secret;
  expiresIn: SignOptions['expiresIn'];
} = {
  secret: (process.env.JWT_SECRET || 'devSecret') as Secret,
  // cast the string literal to the narrower union
  expiresIn: ((process.env.JWT_EXPIRY as string) || '55m') as SignOptions['expiresIn'],
};
