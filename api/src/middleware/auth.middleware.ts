import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { User } from '../models/user.model';

/** Adds req.user when token is valid */
export const protect: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token' });
    return;                          // <-- guarantees void return
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload & { id: string };

    // attach user (omit password)
    (req as any).user = await User.findById(decoded.id).select('-password');
    next();                           // hand off to next middleware
  } catch {
    res.status(401).json({ message: 'Token invalid' });
  }
};
