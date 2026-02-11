# CECE LAW — Website Copy Repository Builder

This repository is an audit-ready copy operations system for CECE LAW.

## What this repository contains

- Single authoritative master copy file (TXT + MD) in `master/`
- Reusable prompt library in `prompts/`
- Operator docs for manual and automated workflows in `docs/`
- Request templates in `requests/`
- Inputs placeholders in `inputs/`
- Automated copy generator in `scripts/copygen/`
- GitHub Action workflow in `.github/workflows/copygen.yml`
- Generated outputs in `generated/`

## Source of Truth

Squarespace is the rendered layer.
The master copy file is the content authority.
All edits should be done in the master file first (or immediately after emergency edits) and logged in the changelog footer.

## Quickstart (Manual Workflow)

1. Open `prompts/system_instructions.txt`.
2. Open one prompt file from `prompts/`.
3. Provide input payload from `requests/` and data from `inputs/`.
4. Run in AI Studio/Gemini and collect output.
5. Verify output includes only:
   - INSERT BLOCK
   - CHANGELOG ENTRY
   - REUSE TAGS
6. Paste INSERT BLOCK into `master/CECE_LAW_WEBSITE_COPY_v1.0.md` (and `.txt` as needed).
7. Append CHANGELOG ENTRY to master changelog footer.

## Quickstart (Automated Workflow)

### Local run
```bash
pip install -r scripts/copygen/requirements.txt
python scripts/copygen/run.py --request requests/example_homepage.json
```

### GitHub Action run
1. Add repo secret:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
2. Go to **Actions → copygen → Run workflow**.
3. Set `request_path` (example: `requests/example_homepage.json`).
4. Optionally set `create_pr=true`.
5. Download generated artifacts or merge generated PR.

## Request File Pattern

Each request in `requests/*.json` should include:
- `prompt_name` (must map to a prompt file in `prompts/`)
- `tier`
- `page_or_module`
- `target_ref`
- `request_payload` object with task-specific fields

## Compliance Rules (Always On)

- No legal advice
- No outcome promises
- No fabricated facts/credentials/metrics
- Use `[FILL-IN]` placeholders when unknown
- Maintain ethics-safe location language
- Keep CRM system of record references aligned to PracticePanther
