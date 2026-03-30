import type { AnnotationSource } from '../enums.js';

/**
 * Annotation — user-created note attached to evidence or a transcript segment.
 *
 * Rules:
 * - At least one of evidenceId or segmentId must be set.
 * - source is set by the server and is permanent — cannot be changed via API.
 * - Soft-delete only: deleted_at is set; the record is never hard-deleted.
 * - start_ms / end_ms are set for media-anchored annotations; immutable once created.
 */
export interface Annotation {
  id: string;               // UUID — immutable
  matterId: string;         // FK → Matter — immutable (denormalized)
  evidenceId?: string | null; // FK → EvidenceItem — immutable
  segmentId?: string | null;  // FK → TranscriptSegment — immutable
  issueId?: string | null;    // FK → Issue — editable
  userId: string;           // FK → User (author) — immutable
  content: string;          // free-text note — editable
  source: AnnotationSource; // HUMAN | AI — immutable; set by server
  startMs?: number | null;  // media-anchored — immutable
  endMs?: number | null;    // immutable
  tags: string[];           // Tag names — editable
  createdAt: string;        // ISO 8601 — immutable
  updatedAt: string;        // ISO 8601
  deletedAt?: string | null; // soft-delete timestamp
}

export interface CreateAnnotationInput {
  matterId: string;
  evidenceId?: string;
  segmentId?: string;
  issueId?: string;
  content: string;
  startMs?: number;
  endMs?: number;
  tagIds?: string[];
}

/** Only these fields may be updated — all others are immutable */
export interface UpdateAnnotationInput {
  content?: string;
  issueId?: string | null;
  tagIds?: string[];
}
