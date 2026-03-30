import { z } from 'zod';

export const CreateExcerptSchema = z
  .object({
    matterId: z.string().uuid(),
    evidenceId: z.string().uuid(),
    segmentId: z.string().uuid().optional(),
    issueId: z.string().uuid().optional(),
    startMs: z.number().int().nonnegative().optional(),
    endMs: z.number().int().nonnegative().optional(),
    charStart: z.number().int().nonnegative().optional(),
    charEnd: z.number().int().nonnegative().optional(),
    description: z.string().max(1000).optional(),
  })
  .refine(
    (data) =>
      (data.startMs !== undefined && data.endMs !== undefined) ||
      (data.charStart !== undefined && data.charEnd !== undefined),
    {
      message:
        'Either (startMs + endMs) for media or (charStart + charEnd) for text must be set',
    },
  )
  .refine(
    (data) =>
      data.startMs === undefined ||
      data.endMs === undefined ||
      data.startMs < data.endMs,
    { message: 'startMs must be less than endMs' },
  )
  .refine(
    (data) =>
      data.charStart === undefined ||
      data.charEnd === undefined ||
      data.charStart < data.charEnd,
    { message: 'charStart must be less than charEnd' },
  );

export const UpdateExcerptSchema = z.object({
  description: z.string().max(1000).nullable().optional(),
  issueId: z.string().uuid().nullable().optional(),
});

export type CreateExcerptInput = z.infer<typeof CreateExcerptSchema>;
export type UpdateExcerptInput = z.infer<typeof UpdateExcerptSchema>;
