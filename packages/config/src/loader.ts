import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { EnvSchema, type Config } from './env.schema.js';

let cachedConfig: Config | null = null;

/**
 * Loads and validates environment variables.
 * Throws a descriptive error if required variables are missing or invalid.
 * Uses a singleton cache after first successful load.
 */
export function loadConfig(options?: { forceReload?: boolean }): Config {
  if (cachedConfig && !options?.forceReload) {
    return cachedConfig;
  }

  // Find the .env file in the monorepo root
  const rootDir = process.cwd(); // Assume process runs from the monorepo root or app root
  
  // Try loading .env (dotenv handles missing file gracefully, fallback to system vars)
  dotenv.config({ path: resolve(rootDir, '.env') });
  
  // Also try walking up to the monorepo root if running from an app directory
  dotenv.config({ path: resolve(rootDir, '../../.env') });

  const parseResult = EnvSchema.safeParse(process.env);

  if (!parseResult.success) {
    console.error('❌ Invalid environment variables:');
    
    for (const issue of parseResult.error.issues) {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    }
    
    throw new Error('Environment validation failed. Check your .env setup.');
  }

  cachedConfig = parseResult.data;
  return cachedConfig;
}
