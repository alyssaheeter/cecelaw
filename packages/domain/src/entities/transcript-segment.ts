/**
 * TranscriptSegment — a single timestamped utterance within a Transcript.
 *
 * Note: V1 uses speaker_label (string) directly on the segment.
 * A full Speaker entity is added in Phase 4 when automated diarization is introduced.
 */
export interface TranscriptSegment {
  id: string;             // UUID — immutable
  transcriptId: string;   // FK → Transcript — immutable
  sequence: number;       // order within transcript — immutable
  startMs: number;        // milliseconds from media start — immutable
  endMs: number;          // immutable
  speakerLabel?: string | null; // user-assigned label e.g. "Witness 1" — editable
  text: string;           // transcribed text — immutable
  confidence?: number | null;   // ASR confidence score 0-1 — immutable
}

export interface CreateTranscriptSegmentInput {
  transcriptId: string;
  sequence: number;
  startMs: number;
  endMs: number;
  text: string;
  confidence?: number;
  speakerLabel?: string;
}

export interface UpdateSegmentSpeakerInput {
  speakerLabel: string | null;
}

/** Search result shape — segment with evidence context */
export interface SegmentSearchResult {
  segmentId: string;
  transcriptId: string;
  evidenceId: string;
  evidenceFilename: string;
  startMs: number;
  endMs: number;
  text: string;           // may be a snippet with highlights
  speakerLabel?: string | null;
  rank: number;           // FTS5 rank score (lower = more relevant)
}
