import type { EvidenceType, EvidenceStatus, ReviewStatus } from '../enums.js';

export interface EvidenceItem {
  id: string;               // UUID — immutable
  matterId: string;         // FK → Matter — immutable
  type: EvidenceType;       // immutable
  filename: string;         // original filename at ingest — immutable
  displayName?: string | null; // user-editable label
  contentType: string;      // MIME type — immutable
  sizeBytes: number;        // immutable
  hash: string;             // SHA-256 hex digest — immutable; computed at ingest
  storagePath: string;      // relative path within EVIDENCE_ROOT — immutable
  ingestDate: string;       // ISO 8601 — immutable
  origin?: string | null;   // source description — immutable once set
  status: EvidenceStatus;
  reviewStatus: ReviewStatus;
  assignedTo?: string | null; // FK → User.id
  createdAt: string;        // ISO 8601 — immutable
  updatedAt: string;        // ISO 8601
}

/** Valid status transitions enforced by status-machine.ts */
export const VALID_STATUS_TRANSITIONS: Record<EvidenceStatus, EvidenceStatus[]> = {
  [EvidenceStatus.INGESTED]: [EvidenceStatus.PROCESSING, EvidenceStatus.ARCHIVED],
  [EvidenceStatus.PROCESSING]: [
    EvidenceStatus.TRANSCRIBED,
    EvidenceStatus.PROCESSING_FAILED,
  ],
  [EvidenceStatus.TRANSCRIBED]: [EvidenceStatus.REVIEWED, EvidenceStatus.ARCHIVED],
  [EvidenceStatus.REVIEWED]: [EvidenceStatus.ARCHIVED],
  [EvidenceStatus.ARCHIVED]: [],
  [EvidenceStatus.PROCESSING_FAILED]: [EvidenceStatus.PROCESSING],
};

/** Valid review status transitions */
export const VALID_REVIEW_TRANSITIONS: Record<ReviewStatus, ReviewStatus[]> = {
  [ReviewStatus.UNREVIEWED]: [ReviewStatus.IN_PROGRESS, ReviewStatus.FLAGGED],
  [ReviewStatus.IN_PROGRESS]: [ReviewStatus.REVIEWED, ReviewStatus.FLAGGED],
  [ReviewStatus.REVIEWED]: [ReviewStatus.FLAGGED],
  [ReviewStatus.FLAGGED]: [ReviewStatus.IN_PROGRESS, ReviewStatus.REVIEWED],
};

export interface CreateEvidenceItemInput {
  matterId: string;
  type: EvidenceType;
  filename: string;
  displayName?: string;
  contentType: string;
  sizeBytes: number;
  hash: string;
  storagePath: string;
  origin?: string;
}

export interface UpdateEvidenceStatusInput {
  status: EvidenceStatus;
}

export interface UpdateReviewStatusInput {
  reviewStatus: ReviewStatus;
}

export interface AssignEvidenceInput {
  assignedTo: string | null;
}
