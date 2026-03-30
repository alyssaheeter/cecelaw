import type { TranscriptSource, WhisperModel } from '../enums.js';

export interface Transcript {
  id: string;           // UUID — immutable
  evidenceId: string;   // FK → EvidenceItem — immutable
  language: string;     // BCP-47 code e.g. 'en-US' — immutable
  modelName: string;    // e.g. 'whisper' — immutable
  modelVersion: string; // e.g. 'small-20231117' — immutable
  source: TranscriptSource; // LOCAL | REMOTE — immutable
  accuracy?: number | null; // WER estimate 0-1 if available — immutable
  createdAt: string;    // ISO 8601 — immutable
}

/**
 * Transcripts are immutable once generated.
 * Re-running transcription creates a new Transcript row.
 * User corrections are Annotations, not mutations.
 */

export interface CreateTranscriptInput {
  evidenceId: string;
  language: string;
  modelName: string;
  modelVersion: string;
  source: TranscriptSource;
  accuracy?: number;
}

/** Summary counts returned alongside a Transcript */
export interface TranscriptWithCounts extends Transcript {
  segmentCount: number;
  durationMs: number; // max segment end_ms
}
