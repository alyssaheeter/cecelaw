import { z } from 'zod';

export const CreateAnnotationSchema = z
  .object({
    matterId: z.string().uuid(),
    evidenceId: z.string().uuid().optional(),
    segmentId: z.string().uuid().optional(),
    issueId: z.string().uuid().optional(),
    content: z.string().min(1, 'content is required').max(10000),
    startMs: z.number().int().nonnegative().optional(),
    endMs: z.number().int().nonnegative().optional(),
    tagIds: z.array(z.string().uuid()).optional().default([]),
  })
  .refine(
    (data) => data.evidenceId !== undefined || data.segmentId !== undefined,
    { message: 'At least one of evidenceId or segmentId must be set' },
  )
  .refine(
    (data) =>
      data.startMs === undefined ||
      data.endMs === undefined ||
      data.startMs < data.endMs,
    { message: 'startMs must be less than endMs' },
  );

export const UpdateAnnotationSchema = z.object({
  content: z.string().min(1).max(10000).optional(),
  issueId: z.string().uuid().nullable().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
});

export const CreateTagSchema = z.object({
  matterId: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'color must be a hex color e.g. #FF5733')
    .optional(),
  description: z.string().max(500).optional(),
});

export const UpdateSegmentSpeakerSchema = z.object({
  speakerLabel: z.string().max(100).nullable(),
});

export type CreateAnnotationInput = z.infer<typeof CreateAnnotationSchema>;
export type UpdateAnnotationInput = z.infer<typeof UpdateAnnotationSchema>;
export type CreateTagInput = z.infer<typeof CreateTagSchema>;
