import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env';
import { User } from '../models/User';
import { ActivityLog } from '../models/ActivityLog';
import { AppError } from '../middleware/error';

// ─── Helpers ────────────────────────────────────────────────────────────────

function signAccessToken(id: string, email: string, role: string) {
  return jwt.sign({ id, email, role }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as any,
  });
}

function signRefreshToken(id: string, version: number) {
  return jwt.sign({ id, version }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
  });
}

function setRefreshCookie(res: Response, token: string) {
  const isProd = env.NODE_ENV === 'production';
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/v1/auth/refresh',
  });
}

async function logActivity(userId: string, action: string, req: Request) {
  await ActivityLog.create({
    adminId: userId,
    action,
    resource: 'auth',
    ip: req.ip,
    userAgent: req.get('user-agent') ?? '',
  });
}

// ─── Controllers ─────────────────────────────────────────────────────────────

/** POST /auth/login */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) throw new AppError('Email and password required', 400);

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !user.isActive) throw new AppError('Invalid credentials', 401);

    const valid = await user.comparePassword(password);
    if (!valid) throw new AppError('Invalid credentials', 401);

    // Update login history
    user.lastLoginAt = new Date();
    user.loginHistory.push({
      ip: req.ip ?? '',
      userAgent: req.get('user-agent') ?? '',
      at: new Date(),
    });
    if (user.loginHistory.length > 20) user.loginHistory = user.loginHistory.slice(-20);
    await user.save({ validateBeforeSave: false });

    const accessToken = signAccessToken(user.id, user.email, user.role);
    const refreshToken = signRefreshToken(user.id, user.refreshTokenVersion);

    if (rememberMe) setRefreshCookie(res, refreshToken);

    await logActivity(user.id, 'LOGIN', req);

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken: rememberMe ? undefined : refreshToken,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      },
    });
  } catch (err) { next(err); }
}

/** POST /auth/refresh */
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string | undefined =
      req.cookies?.refreshToken ?? req.body?.refreshToken;
    if (!token) throw new AppError('No refresh token', 401);

    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string; version: number };
    const user = await User.findById(payload.id);
    if (!user || !user.isActive) throw new AppError('User not found', 401);
    if (user.refreshTokenVersion !== payload.version)
      throw new AppError('Token revoked', 401);

    const accessToken = signAccessToken(user.id, user.email, user.role);
    const newRefresh  = signRefreshToken(user.id, user.refreshTokenVersion);

    setRefreshCookie(res, newRefresh);
    res.json({ success: true, data: { accessToken } });
  } catch (err) { next(err); }
}

/** POST /auth/logout */
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user) {
      // Rotate version to invalidate all existing refresh tokens
      await User.findByIdAndUpdate(req.user.id, { $inc: { refreshTokenVersion: 1 } });
      await logActivity(req.user.id, 'LOGOUT', req);
    }
    res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh' });
    res.json({ success: true, message: 'Logged out' });
  } catch (err) { next(err); }
}

/** GET /auth/me */
export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user!.id).select('-__v');
    if (!user) throw new AppError('User not found', 404);
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
}

/** PATCH /auth/profile */
export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user!.id,
      { ...(name && { name }), ...(avatar && { avatar }) },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
}

/** PATCH /auth/password */
export async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user!.id).select('+password');
    if (!user) throw new AppError('User not found', 404);

    const valid = await user.comparePassword(currentPassword);
    if (!valid) throw new AppError('Current password is incorrect', 400);

    user.password = newPassword;
    user.refreshTokenVersion += 1; // invalidate all sessions
    await user.save();

    await logActivity(user.id, 'PASSWORD_CHANGED', req);
    res.json({ success: true, message: 'Password updated' });
  } catch (err) { next(err); }
}
