import type { MatterStatus } from '../enums.js';

export interface Matter {
  id: string;             // UUID — immutable
  clientId: string;       // FK → Client — immutable
  title: string;
  description?: string | null;
  jurisdiction?: string | null;
  matterNumber?: string | null;
  status: MatterStatus;
  allowRemoteAi: boolean; // default: false — must be explicitly enabled
  tags: string[];
  createdAt: string;      // ISO 8601 — immutable
  updatedAt: string;      // ISO 8601
}

export interface CreateMatterInput {
  clientId: string;
  title: string;
  description?: string;
  jurisdiction?: string;
  matterNumber?: string;
  tags?: string[];
}

export interface UpdateMatterInput {
  title?: string;
  description?: string | null;
  jurisdiction?: string | null;
  matterNumber?: string | null;
  tags?: string[];
  allowRemoteAi?: boolean;
}
