import { z } from 'zod';

export const EnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Storage
  EVIDENCE_ROOT: z.string().min(1, 'EVIDENCE_ROOT is required'),

  // Server
  PORT: z.coerce.number().default(3001),

  // Auth
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters for HMAC-SHA256'),
  JWT_EXPIRY: z.string().default('8h'),

  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Whisper ASR
  WHISPER_MODEL: z.enum(['tiny', 'small', 'medium', 'large']).default('small'),
  WHISPER_BINARY_PATH: z.string().optional(),

  // FFmpeg
  FFMPEG_BINARY_PATH: z.string().optional(),
});

export type Config = z.infer<typeof EnvSchema>;
