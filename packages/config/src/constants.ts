// ─── Shared System Constants ──────────────────────────────────────────────────

/** File extensions supported by the ingest scanner */
export const SUPPORTED_EXTENSIONS = [
  // Video
  '.mp4', '.mov', '.avi', '.mkv', '.webm',
  // Audio
  '.mp3', '.wav', '.m4a', '.flac', '.aac',
  // Documents
  '.pdf', '.doc', '.docx', '.txt', '.csv',
  // Images
  '.jpg', '.jpeg', '.png', '.heic',
];

/** Hash algorithm used across the entire platform for evidence fingerprinting */
export const HASH_ALGORITHM = 'sha256';

/** Job queue polling interval */
export const JOB_POLL_INTERVAL_MS = 2000;

/** Maximum retries for a processing job before marking it permanently_failed */
export const MAX_JOB_RETRIES = 3;

/** Audio extraction sample rate required by Whisper */
export const WHISPER_SAMPLE_RATE = 16000;

/** Single-user default email for V1 */
export const DEFAULT_ADMIN_EMAIL = 'frank@cecelaw.com';
