import { z } from 'zod';
import { MatterStatus } from '../enums.js';

export const CreateMatterSchema = z.object({
  clientId: z.string().uuid('clientId must be a valid UUID'),
  title: z.string().min(1, 'title is required').max(255),
  description: z.string().max(2000).optional(),
  jurisdiction: z.string().max(255).optional(),
  matterNumber: z.string().max(100).optional(),
  tags: z.array(z.string().max(100)).optional().default([]),
});

export const UpdateMatterSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).nullable().optional(),
  jurisdiction: z.string().max(255).nullable().optional(),
  matterNumber: z.string().max(100).nullable().optional(),
  tags: z.array(z.string().max(100)).optional(),
  allowRemoteAi: z.boolean().optional(),
});

export const ArchiveMatterSchema = z.object({
  status: z.literal(MatterStatus.ARCHIVED),
});

export const CreateClientSchema = z.object({
  name: z.string().min(1, 'name is required').max(255),
  contactInfo: z.record(z.unknown()).optional(),
});

export const UpdateClientSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  contactInfo: z.record(z.unknown()).nullable().optional(),
});

export type CreateMatterInput = z.infer<typeof CreateMatterSchema>;
export type UpdateMatterInput = z.infer<typeof UpdateMatterSchema>;
export type CreateClientInput = z.infer<typeof CreateClientSchema>;
export type UpdateClientInput = z.infer<typeof UpdateClientSchema>;
