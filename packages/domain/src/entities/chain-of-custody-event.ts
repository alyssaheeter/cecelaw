import type { CoCAction } from '../enums.js';

/**
 * ChainOfCustodyEvent — append-only, immutable audit record.
 *
 * Rules:
 * - Append-only: no UPDATE or DELETE ever. Enforced at DB level via trigger.
 * - timestamp is set by the server — never accepted from client.
 * - actorId is a User UUID, or the sentinel string "SYSTEM" for automated steps.
 * - signature: HMAC-SHA256 of the event record using the installation signing key.
 * - V1: no prev_event_id chain (deferred to Phase 6).
 */
export interface ChainOfCustodyEvent {
  id: string;               // UUID — immutable
  evidenceId: string;       // FK → EvidenceItem — immutable
  matterId: string;         // FK → Matter — immutable (denormalized)
  timestamp: string;        // ISO 8601 — set by server — immutable
  actorId: string;          // User UUID or "SYSTEM"
  action: CoCAction;        // immutable
  details?: Record<string, unknown> | null; // action-specific payload — immutable
  hashBefore?: string | null; // file hash before action — immutable
  hashAfter?: string | null;  // file hash after action — immutable
  signature?: string | null;  // HMAC-SHA256 of this record
}

/** Input shape for creating a CoC event — used by CustodyService internally */
export interface CreateCoCEventInput {
  evidenceId: string;
  matterId: string;
  actorId: string;
  action: CoCAction;
  details?: Record<string, unknown>;
  hashBefore?: string;
  hashAfter?: string;
}
