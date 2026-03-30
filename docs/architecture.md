# Architecture

<!-- To be completed in PR03 when the backend scaffold is built -->
<!-- See Stage 1 Final Design Spec for the authoritative component diagram -->

## Components

- `apps/web` — Next.js UI layer
- `apps/backend` — Fastify REST API, business logic, chain-of-custody
- `packages/domain` — Shared TypeScript types and Zod schemas
- `packages/config` — Environment loader and constants
- `packages/ingest` — CLI: scan, hash, register evidence
- `packages/analysis` — ffmpeg wrapper, Whisper ASR, job queue

## Package Import Boundaries

| Package | May Import | Must NOT Import |
|---|---|---|
| `packages/domain` | Nothing | Anything |
| `packages/config` | `domain` | `apps/*`, processing packages |
| `packages/ingest` | `domain`, `config` | `apps/*`, `analysis` |
| `packages/analysis` | `domain`, `config` | `apps/*`, `ingest` |
| `apps/backend` | All `packages/*` | `apps/web` |
| `apps/web` | `domain`, `config` | `analysis`, `ingest` directly |

## Local-Only vs Optional Cloud

All evidence, transcription, and annotation processing is local-only by default.
Cloud sync is optional and requires explicit per-matter configuration (Phase 6).
