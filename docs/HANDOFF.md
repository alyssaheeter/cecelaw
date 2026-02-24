# Cece Case Evidence Analyzer - Handoff

This repository contains the architecture for the Cece Case Evidence Analyzer:

1. **`/web`**: Next.js static export deployed to Firebase Hosting. Provides the UI for case review and CSV exports.
2. **`/services/api`**: Cloud Run API for read operations (dashboard, cases, outline generation).
3. **`/services/worker`**: Cloud Run service processing Pub/Sub events for audio/video segmentation, transcription, and Gemini extraction.
4. **`/tools/local-ingestor`**: Python script to recursively scan the Windows `C:\Users\fcece\Carter` folder, hash files, and upload them to GCS, triggering the API.
5. **`/infra`**: Automation scripts to bootstrap GCP resources and deploy code.

This architecture enforces compliance (no outcome promises, citations required for every fact mapping back to video timestamps or document offsets).
