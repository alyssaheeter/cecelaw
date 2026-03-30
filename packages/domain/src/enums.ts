/**
 * Shared enums for Cece Law Evidence Manager.
 * This file is the single source of truth for all enum values.
 * Used by domain interfaces, Zod schemas, Prisma schema, and API handlers.
 */

// ─── Evidence ────────────────────────────────────────────────────────────────

export enum EvidenceType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  IMAGE = 'IMAGE',
  OTHER = 'OTHER',
}

export enum EvidenceStatus {
  INGESTED = 'ingested',
  PROCESSING = 'processing',
  TRANSCRIBED = 'transcribed',
  REVIEWED = 'reviewed',
  ARCHIVED = 'archived',
  PROCESSING_FAILED = 'processing_failed',
}

export enum ReviewStatus {
  UNREVIEWED = 'unreviewed',
  IN_PROGRESS = 'in_progress',
  REVIEWED = 'reviewed',
  FLAGGED = 'flagged',
}

// ─── Media Assets ─────────────────────────────────────────────────────────────

export enum AssetType {
  ORIGINAL = 'ORIGINAL',
  AUDIO_EXTRACT = 'AUDIO_EXTRACT',
  CLIP = 'CLIP',
  REDACTED = 'REDACTED',
  THUMBNAIL = 'THUMBNAIL',
}

// ─── Transcription ────────────────────────────────────────────────────────────

export enum TranscriptSource {
  LOCAL = 'LOCAL',
  REMOTE = 'REMOTE',
}

export enum WhisperModel {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

// ─── Annotations ─────────────────────────────────────────────────────────────

export enum AnnotationSource {
  HUMAN = 'HUMAN',
  AI = 'AI',
}

// ─── Issues ──────────────────────────────────────────────────────────────────

export enum IssueStatus {
  OPEN = 'open',
  RESOLVED = 'resolved',
  DEFERRED = 'deferred',
}

export enum IssueSource {
  HUMAN = 'HUMAN',
  AI = 'AI',
}

// ─── Matters ─────────────────────────────────────────────────────────────────

export enum MatterStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  CLOSED = 'closed',
}

// ─── Users ───────────────────────────────────────────────────────────────────

export enum UserRole {
  ADMIN = 'admin',
  ATTORNEY = 'attorney',
  REVIEWER = 'reviewer',
  INVESTIGATOR = 'investigator',
}

// ─── Jobs ────────────────────────────────────────────────────────────────────

export enum JobType {
  AUDIO_EXTRACTION = 'AUDIO_EXTRACTION',
  TRANSCRIPTION = 'TRANSCRIPTION',
  CLIP_GENERATION = 'CLIP_GENERATION',
}

export enum JobStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETE = 'complete',
  FAILED = 'failed',
  PERMANENTLY_FAILED = 'permanently_failed',
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export enum ExportFormat {
  CSV = 'CSV',
  PDF = 'PDF',
  ZIP = 'ZIP',
  MIXED = 'MIXED',
}

// ─── Chain of Custody ─────────────────────────────────────────────────────────

export enum CoCAction {
  // Ingest pipeline
  INGESTED = 'INGESTED',
  HASH_VERIFIED = 'HASH_VERIFIED',
  AUDIO_EXTRACTED = 'AUDIO_EXTRACTED',
  TRANSCRIBED = 'TRANSCRIBED',
  EMBEDDINGS_GENERATED = 'EMBEDDINGS_GENERATED',

  // Speaker
  SPEAKER_LABELED = 'SPEAKER_LABELED',

  // Annotations
  ANNOTATION_CREATED = 'ANNOTATION_CREATED',
  ANNOTATION_EDITED = 'ANNOTATION_EDITED',
  ANNOTATION_DELETED = 'ANNOTATION_DELETED',

  // Excerpts
  EXCERPT_CREATED = 'EXCERPT_CREATED',
  CLIP_GENERATED = 'CLIP_GENERATED',
  REDACTED = 'REDACTED',

  // Review
  REVIEW_STATUS_CHANGED = 'REVIEW_STATUS_CHANGED',

  // Issues
  ISSUE_CREATED = 'ISSUE_CREATED',
  ISSUE_ACCEPTED_FROM_AI = 'ISSUE_ACCEPTED_FROM_AI',

  // Export
  EXPORTED = 'EXPORTED',
  HASH_MISMATCH_DETECTED = 'HASH_MISMATCH_DETECTED',

  // Remote AI (requires explicit consent)
  REMOTE_AI_CALL = 'REMOTE_AI_CALL',

  // Matter lifecycle
  MATTER_ARCHIVED = 'MATTER_ARCHIVED',
  BACKUP_CREATED = 'BACKUP_CREATED',
  SYNC_UPLOADED = 'SYNC_UPLOADED',
}
