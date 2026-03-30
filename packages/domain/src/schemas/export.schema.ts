import { z } from 'zod';
import { ExportFormat } from '../enums.js';

export const CreateExportSchema = z.object({
  matterId: z.string().uuid(),
  format: z.nativeEnum(ExportFormat),
  includedItems: z
    .array(z.string().uuid())
    .min(1, 'At least one evidence item must be selected'),
  includedExcerpts: z.array(z.string().uuid()).optional().default([]),
  notes: z.string().max(2000).optional(),
});

export type CreateExportInput = z.infer<typeof CreateExportSchema>;
