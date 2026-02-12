# CECE LAW — Website Copy Repository Builder

This repository is an audit-ready copy operations system for CECE LAW.

## What this repository contains

- Single authoritative master copy file (TXT + MD) in `master/`
- Reusable prompt library in `prompts/`
- Operator docs for manual and automated workflows in `docs/`
- GTM readiness checklist in `docs/GTM_READINESS_CHECKLIST.md`
- Wild Orchid brand kit and token standard in `docs/CECE_LAW_BRAND_KIT.md`
- CSS variable tokens in `styles/wild-orchid-tokens.css`
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
1. Create credentials first (project + billing + API key):
   - Follow `docs/GEMINI_CREDENTIALS_SETUP.md`
2. Add repo secret:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
3. Go to **Actions → copygen → Run workflow**.
4. Set `request_path` (example: `requests/example_homepage.json`).
5. Optionally set `create_pr=true`.
6. Download generated artifacts or merge generated PR.

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


## Gemini Billing + Quota Troubleshooting (429 `RESOURCE_EXHAUSTED`)

If GitHub Actions fails with quota/billing errors for `gemini-2.5-pro`:

1. Open Google AI Studio and verify the project tied to your API key.
2. In Google Cloud Console for that project:
   - Attach an active billing account.
   - Ensure billing is enabled for the current project (not only the organization).
3. Confirm Gemini API usage and limits are enabled for the key/project.
4. Re-run the workflow after quota refresh.

This repo also supports controlled CI fallback when quota is unavailable:
- Workflow input: `allow_mock_on_api_failure=true` (default)
- Env used by runner: `COPYGEN_ALLOW_MOCK_ON_API_FAILURE=true`

When fallback is used, outputs are still validated against the strict 3-part contract and written to `generated/`.


## Credential Setup

For complete step-by-step credential creation (project, billing, API key, GitHub secret, and local env), see `docs/GEMINI_CREDENTIALS_SETUP.md`.
