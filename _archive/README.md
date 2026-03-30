# _archive — Legacy Code

This directory contains the original cece-law-platform code preserved for reference.

**Nothing in this directory is imported or executed by any active package.**
**Do not import from here. Do not delete this directory.**

## Contents

| Directory | Original Location | Notes |
|---|---|---|
| `services-api-original/` | `services/api/` | Express API hardcoded to Carter case; single-tenant Firestore |
| `services-worker-original/` | `services/worker/` | Cloud Run worker; BigQuery insertion; mocked AI analysis |
| `tools-runner-original/` | `tools/runner/` | Python scripts; GCS enumeration; case-specific prompts |
| `tools-local-ingestor-original/` | `tools/local-ingestor/` | Python ingestor; no auth; GCS upload |
| `web-original/` | `VideoAnalyzer/` | Next.js UI hardcoded to Carter; generateStaticParams |
| `config-original/` | `config/` | app.config.json with GCP project number and Carter prefix |
| `infra-original/` | `infra/` | GCP deployment scripts |
| `firebase-original/` | Root firebase files | .firebaserc, firebase.json, firestore.rules, etc. |

## Why Keep This?

1. Reference for any data migration (Firestore → SQLite)
2. Historical record for legal audit purposes
3. Understanding of original behaviour for bug triage
