# Privacy Model

<!-- To be completed in PR07 when the processing engine is built -->

## Core Principle

All evidence files, transcripts, and annotations are stored locally on the user's device by default.
No data is transmitted to any external service without explicit per-matter opt-in.

## What Stays Local (Always)

- Raw video, audio, document, and image files
- SHA-256 file hashes
- Transcripts and transcript segments
- Annotations and issue tags
- Chain-of-custody event log
- Export bundles

## What Is Optional Cloud (Explicit Opt-In Only)

- Metadata sync (Phase 6; encrypted; per-matter setting)
- Remote ASR transcription (requires `allow_remote_ai=true` per matter + runtime consent)
- Remote summarization (same gate)

## Signing Key

On first run, the backend generates a random 256-bit installation key stored in the local SQLite
`settings` table. This key is used for HMAC-SHA256 signing of chain-of-custody events and export
manifests. It never leaves the device. Back it up alongside your SQLite database file.
