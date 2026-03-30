import type { IssueStatus, IssueSource } from '../enums.js';

/**
 * Issue — a named legal question or theme grouping annotations and excerpts.
 *
 * Rules:
 * - source = HUMAN for all issues created via the API by users.
 * - source = AI for AI-suggested issues. These require explicit human acceptance
 *   (POST /issues/:id/accept) which emits a ISSUE_ACCEPTED_FROM_AI CoC event.
 * - AI-sourced issues are stored with status = 'deferred' until accepted.
 */
export interface Issue {
  id: string;             // UUID — immutable
  matterId: string;       // FK → Matter — immutable
  title: string;          // editable
  description?: string | null; // editable
  priority?: number | null;    // 1 = highest — editable
  status: IssueStatus;    // editable
  source: IssueSource;    // HUMAN | AI — immutable
  createdAt: string;      // ISO 8601 — immutable
}

export interface CreateIssueInput {
  matterId: string;
  title: string;
  description?: string;
  priority?: number;
}

export interface UpdateIssueInput {
  title?: string;
  description?: string | null;
  priority?: number | null;
  status?: IssueStatus;
}
