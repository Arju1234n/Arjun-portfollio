/**
 * Shared TypeScript interfaces for the ArjunOS backend.
 */

/**
 * Standard API response envelope used by all endpoints.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: Record<string, unknown>;
}

/**
 * Pagination metadata included in list responses.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Decoded payload of an access JWT.
 */
export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Decoded payload of a refresh JWT.
 */
export interface RefreshTokenPayload {
  id: string;
  version: number;
  iat: number;
  exp: number;
}

/**
 * Cloudinary upload result shape (subset of the full SDK type).
 */
export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  folder: string;
  original_filename: string;
}

/**
 * Generic paginated list helper used across list controllers.
 */
export interface PaginatedList<T> {
  items: T[];
  meta: PaginationMeta;
}
