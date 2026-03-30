/**
 * @cece/domain — barrel export
 * Single import point for all domain types, interfaces, and schemas.
 *
 * Import rule: this package has ZERO runtime dependencies except zod.
 * It must never import from @cece/config, apps/*, or any other @cece package.
 */

// ─── Enums ───────────────────────────────────────────────────────────────────
export * from './enums.js';

// ─── Entity Interfaces ───────────────────────────────────────────────────────
export type { Client, ClientWithMatters, CreateClientInput, UpdateClientInput } from './entities/client.js';

export type {
  Matter,
  CreateMatterInput,
  UpdateMatterInput,
} from './entities/matter.js';

export type {
  User,
  UserPublic,
  CreateUserInput,
  UpdateUserInput,
  LoginInput,
  AuthToken,
} from './entities/user.js';

export type {
  EvidenceItem,
  CreateEvidenceItemInput,
  UpdateEvidenceStatusInput,
  UpdateReviewStatusInput,
  AssignEvidenceInput,
} from './entities/evidence-item.js';
export { VALID_STATUS_TRANSITIONS, VALID_REVIEW_TRANSITIONS } from './entities/evidence-item.js';

export type {
  MediaAsset,
  CreateMediaAssetInput,
} from './entities/media-asset.js';

export type {
  Transcript,
  CreateTranscriptInput,
  TranscriptWithCounts,
} from './entities/transcript.js';

export type {
  TranscriptSegment,
  CreateTranscriptSegmentInput,
  UpdateSegmentSpeakerInput,
  SegmentSearchResult,
} from './entities/transcript-segment.js';

export type {
  Annotation,
  CreateAnnotationInput,
  UpdateAnnotationInput,
} from './entities/annotation.js';

export type {
  Tag,
  CreateTagInput,
  UpdateTagInput,
} from './entities/tag.js';

export type {
  Issue,
  CreateIssueInput,
  UpdateIssueInput,
} from './entities/issue.js';

export type {
  Excerpt,
  CreateExcerptInput,
  UpdateExcerptInput,
} from './entities/excerpt.js';

export type {
  ChainOfCustodyEvent,
  CreateCoCEventInput,
} from './entities/chain-of-custody-event.js';

export type {
  ExportBundle,
  CreateExportInput,
} from './entities/export-bundle.js';

// ─── Zod Schemas ─────────────────────────────────────────────────────────────
export {
  CreateMatterSchema,
  UpdateMatterSchema,
  ArchiveMatterSchema,
  CreateClientSchema,
  UpdateClientSchema,
} from './schemas/matter.schema.js';

export {
  CreateEvidenceItemSchema,
  UpdateEvidenceStatusSchema,
  UpdateReviewStatusSchema,
  AssignEvidenceSchema,
  UpdateDisplayNameSchema,
} from './schemas/evidence.schema.js';

export {
  CreateAnnotationSchema,
  UpdateAnnotationSchema,
  CreateTagSchema,
  UpdateSegmentSpeakerSchema,
} from './schemas/annotation.schema.js';

export {
  CreateIssueSchema,
  UpdateIssueSchema,
} from './schemas/issue.schema.js';

export {
  CreateExcerptSchema,
  UpdateExcerptSchema,
} from './schemas/excerpt.schema.js';

export { CreateExportSchema } from './schemas/export.schema.js';

export {
  LoginSchema,
  CreateUserSchema,
  UpdateUserSchema,
  ChangePasswordSchema,
} from './schemas/auth.schema.js';
