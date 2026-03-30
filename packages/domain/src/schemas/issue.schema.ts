import { z } from 'zod';
import { IssueStatus } from '../enums.js';

export const CreateIssueSchema = z.object({
  matterId: z.string().uuid(),
  title: z.string().min(1, 'title is required').max(255),
  description: z.string().max(2000).optional(),
  priority: z.number().int().min(1).max(10).optional(),
});

export const UpdateIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).nullable().optional(),
  priority: z.number().int().min(1).max(10).nullable().optional(),
  status: z.nativeEnum(IssueStatus).optional(),
});

export type CreateIssueInput = z.infer<typeof CreateIssueSchema>;
export type UpdateIssueInput = z.infer<typeof UpdateIssueSchema>;
