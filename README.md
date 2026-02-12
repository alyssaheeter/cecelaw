# Cece Law Website

Production-ready Next.js (App Router) marketing site for Cece Law, using Dark Authority styling tokens, Tailwind CSS, and JSON-driven content.

## Getting started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the development server
   ```bash
   npm run dev
   ```
3. Lint and build
   ```bash
   npm run lint
   npm run build
   ```

## Content editing
All copy and key facts live in JSON under `src/content/`:
- `site.json`: firm-wide details (phones, offices, disclaimers, theme tokens).
- `attorney.frank-cece-jr.json`: attorney bio, education, admissions, memberships, recognition.
- `practice-areas.json`: criminal defense and personal injury subpages, including FAQs.
- `testimonials.json`: testimonials plus required disclaimer.
- `resources.json`: resource guides and checklists with FAQ entries.

Update these files to change text; page components read directly from them so no code edits are needed for routine content updates.

## Styling
Global variables and behaviors are defined in `src/styles/globals.css` (CECE LAW | DARK AUTHORITY REFACTOR). Tailwind uses these tokens for consistent theming.

## SEO and Schema
Utilities in `src/lib/seo.ts` and `src/lib/schema.ts` generate metadata and JSON-LD for LegalService, Attorney, LocalBusiness, and FAQPage schemas. Pages render schema snippets based on available FAQs and context.

## CI
GitHub Actions workflow `.github/workflows/ci.yml` runs lint and build on pushes and pull requests to `main`.

## Compliance reminders
- No guarantees or promises of outcomes.
- Disclaimers appear in the footer site-wide, on the Disclaimer page, and on Results/Testimonials pages as required.
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
