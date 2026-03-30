/**
 * Excerpt — a user-defined, bounded selection of content.
 *
 * Rules:
 * - Immutable after creation. Changes require a new Excerpt record.
 * - For video/audio: startMs + endMs must both be set.
 * - For text: charStart + charEnd must both be set.
 * - At least one of the above pairs must be set.
 * - startMs must be < endMs; charStart must be < charEnd.
 * - clipAssetId is populated by the backend after CLIP_GENERATION job completes.
 */
export interface Excerpt {
  id: string;               // UUID — immutable
  matterId: string;         // FK → Matter — immutable (denormalized)
  evidenceId: string;       // FK → EvidenceItem — immutable
  segmentId?: string | null; // FK → TranscriptSegment — immutable
  issueId?: string | null;  // FK → Issue — editable (only mutable field)
  startMs?: number | null;  // immutable — set for media excerpts
  endMs?: number | null;    // immutable
  charStart?: number | null; // immutable — set for text excerpts
  charEnd?: number | null;  // immutable
  description?: string | null; // editable (sole editable field)
  clipAssetId?: string | null; // FK → MediaAsset — set after clip generation
  createdBy: string;        // FK → User.id — immutable
  createdAt: string;        // ISO 8601 — immutable
}

export interface CreateExcerptInput {
  matterId: string;
  evidenceId: string;
  segmentId?: string;
  issueId?: string;
  startMs?: number;
  endMs?: number;
  charStart?: number;
  charEnd?: number;
  description?: string;
}

/** Only description and issueId may be updated after creation */
export interface UpdateExcerptInput {
  description?: string | null;
  issueId?: string | null;
}
