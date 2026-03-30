import type { UserRole } from '../enums.js';

/**
 * Full User — used internally only. password_hash is NEVER returned from API.
 * Use UserPublic for all API responses.
 */
export interface User {
  id: string;           // UUID — immutable
  name: string;
  email: string;        // unique per installation
  role: UserRole;
  passwordHash: string; // bcrypt — NEVER expose in API response
  createdAt: string;    // ISO 8601 — immutable
  lastLoginAt?: string | null;
}

/**
 * Safe user shape for all API responses.
 * password_hash is explicitly excluded.
 */
export interface UserPublic {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string | null;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;   // plain text — hashed in service layer
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  expiresAt: string;  // ISO 8601
  user: UserPublic;
}
