import type { Matter } from './matter.js';

export interface Client {
  id: string;           // UUID — immutable
  name: string;         // Legal name
  contactInfo?: Record<string, unknown> | null;
  createdAt: string;    // ISO 8601 — immutable
  updatedAt: string;    // ISO 8601
}

/** Client with related matters loaded */
export interface ClientWithMatters extends Client {
  matters: Matter[];
}

/** Payload for creating a new client */
export interface CreateClientInput {
  name: string;
  contactInfo?: Record<string, unknown>;
}

/** Payload for updating a client */
export interface UpdateClientInput {
  name?: string;
  contactInfo?: Record<string, unknown> | null;
}
