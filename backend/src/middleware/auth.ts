import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User, UserRole } from '../models/User';
import { AppError } from './error';
import { JwtPayload } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: UserRole };
    }
  }
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) throw new AppError('No token provided', 401);

    const token = header.slice(7);
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;

    const user = await User.findById(payload.id).select('_id email role isActive');
    if (!user || !user.isActive) throw new AppError('User not found or inactive', 401);

    req.user = { id: user._id.toString(), email: user.email, role: user.role };
    next();
  } catch (err) {
    next(err);
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError('Not authenticated', 401));
    if (!roles.includes(req.user.role)) return next(new AppError('Insufficient permissions', 403));
    next();
  };
}
