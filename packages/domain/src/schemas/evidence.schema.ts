import { z } from 'zod';
import { EvidenceType, EvidenceStatus, ReviewStatus } from '../enums.js';

export const CreateEvidenceItemSchema = z.object({
  matterId: z.string().uuid(),
  type: z.nativeEnum(EvidenceType),
  filename: z.string().min(1).max(500),
  displayName: z.string().max(500).optional(),
  contentType: z.string().min(1).max(100),
  sizeBytes: z.number().int().positive(),
  hash: z.string().regex(/^[a-f0-9]{64}$/, 'hash must be a 64-char hex SHA-256'),
  storagePath: z.string().min(1).max(1000),
  origin: z.string().max(500).optional(),
});

export const UpdateEvidenceStatusSchema = z.object({
  status: z.nativeEnum(EvidenceStatus),
});

export const UpdateReviewStatusSchema = z.object({
  reviewStatus: z.nativeEnum(ReviewStatus),
});

export const AssignEvidenceSchema = z.object({
  assignedTo: z.string().uuid().nullable(),
});

export const UpdateDisplayNameSchema = z.object({
  displayName: z.string().max(500).nullable(),
});

export type CreateEvidenceItemInput = z.infer<typeof CreateEvidenceItemSchema>;
export type UpdateEvidenceStatusInput = z.infer<typeof UpdateEvidenceStatusSchema>;
export type UpdateReviewStatusInput = z.infer<typeof UpdateReviewStatusSchema>;
