# Cece Law Evidence Manager

A privacy-first, local-first evidence management workbench for legal professionals.

Ingest, organize, transcribe, annotate, and export legal evidence for multiple matters and clients — with all sensitive data staying on your device by default.

## Features

- **Matter Management** — Create and organize legal matters per client
- **Evidence Ingestion** — Scan local folders; auto-compute SHA-256 hashes
- **Local Transcription** — On-device ASR via Whisper; no cloud required
- **Annotations & Issues** — Time-coded notes linked to transcript segments
- **Keyword Search** — Full-text search across all transcripts
- **Excerpt / Clip Creation** — Define and generate video/audio clips
- **Export** — Chain-of-custody–compliant CSV inventory, timeline, and signed manifest
- **Privacy-First** — All processing local by default; no mandatory cloud dependency

## Quick Start

### Prerequisites

- Node.js ≥ 20.0.0
- npm ≥ 10.0.0
- ffmpeg (bundled via `ffmpeg-static` — no system install required)
- Whisper model (download via `scripts/download-models.sh`)

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd cece-law-platform
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env — set EVIDENCE_ROOT and JWT_SECRET at minimum

# 3. Download Whisper model
bash scripts/download-models.sh

# 4. Start the backend API
npm run dev:backend

# 5. Start the web UI (new terminal)
npm run dev:web

# 6. Open http://localhost:3000
```

See [docs/setup_guide.md](docs/setup_guide.md) for detailed instructions.

## Architecture

```
apps/web       → Next.js UI (port 3000)
apps/backend   → Fastify REST API (port 3001)
packages/
  domain       → Shared TypeScript types and Zod schemas
  config       → Environment loader
  ingest       → CLI for evidence ingestion
  analysis     → Local processing (ffmpeg, Whisper)
```

See [docs/architecture.md](docs/architecture.md) for the full design.

## Privacy Model

All evidence processing runs locally by default. No file, transcript, or annotation is transmitted to any external service without an explicit opt-in per matter.

See [docs/privacy_model.md](docs/privacy_model.md).

## Development

See [docs/developer_workflow.md](docs/developer_workflow.md) for contribution guidelines, naming conventions, and the PR process.

## License

Proprietary — Cece Law. All rights reserved.
