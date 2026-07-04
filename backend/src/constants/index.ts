/**
 * Application-wide constants for ArjunOS backend.
 */

/** Common API response messages */
export const MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'You do not have permission to perform this action',
  VALIDATION_ERROR: 'Validation failed',
  SERVER_ERROR: 'An internal server error occurred',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_SENT: 'Email sent successfully',
  UPLOAD_SUCCESS: 'File uploaded successfully',
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOKEN_EXPIRED: 'Token has expired',
  TOKEN_INVALID: 'Token is invalid',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
} as const;

/** MongoDB collection names */
export const COLLECTIONS = {
  ADMINS: 'admins',
  PROJECTS: 'projects',
  EXPERIENCES: 'experiences',
  SKILLS: 'skills',
  STATS: 'stats',
  CERTIFICATIONS: 'certifications',
  MESSAGES: 'messages',
  SETTINGS: 'settings',
  NAVIGATION: 'navigations',
  FOOTER: 'footers',
  MEDIA: 'media',
  ANALYTICS: 'analytics',
  RESUMES: 'resumes',
  ACTIVITY_LOGS: 'activitylogs',
  WRITINGS: 'writings',
  HERO: 'heroes',
  ABOUT: 'abouts',
} as const;

/** Cloudinary folder paths */
export const CLOUDINARY_FOLDERS = {
  PROJECTS: 'arjunos/projects',
  RESUME: 'arjunos/resume',
  MEDIA: 'arjunos/media',
  CERTIFICATIONS: 'arjunos/certifications',
  AVATARS: 'arjunos/avatars',
  WRITINGS: 'arjunos/writings',
} as const;

/** Admin role constants */
export const ROLES = {
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Allowed MIME types for uploads */
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
] as const;

/** Maximum upload file size in bytes (10 MB) */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Default pagination values */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
