import type { ExportFormat } from '../enums.js';

/**
 * ExportBundle — a compiled, court-ready output package.
 *
 * Rules:
 * - Immutable after creation. No updates ever.
 * - manifestHash = SHA-256 of the manifest.json file in the bundle.
 * - Every included file's hash is verified before the bundle is generated.
 * - If any hash mismatch is detected, the export is aborted and a
 *   HASH_MISMATCH_DETECTED CoC event is written.
 */
export interface ExportBundle {
  id: string;               // UUID — immutable
  matterId: string;         // FK → Matter — immutable
  creatorId: string;        // FK → User — immutable
  createdAt: string;        // ISO 8601 — immutable
  format: ExportFormat;     // immutable
  bundlePath: string;       // absolute path to ZIP file — immutable
  manifestHash: string;     // SHA-256 of manifest.json — immutable
  includedItems: string[];  // EvidenceItem UUIDs — immutable
  includedExcerpts: string[]; // Excerpt UUIDs — immutable
  notes?: string | null;    // attorney notes — immutable
}

export interface CreateExportInput {
  matterId: string;
  format: ExportFormat;
  includedItems: string[];  // EvidenceItem IDs to include
  includedExcerpts?: string[]; // Excerpt IDs to include
  notes?: string;
}
