# Gemini Credentials Setup (for copygen)

Use this guide to create the credentials needed for local runs and GitHub Actions.

## 1) Create or select a Google Cloud project
1. Open Google AI Studio and sign in.
2. Click your project selector and create/select the project you want to use for CECE LAW copygen.
3. Make sure this same project is used for API key creation and billing.

## 2) Enable billing for the project
1. Open Google Cloud Console → Billing.
2. Link an active billing account to the selected project.
3. Verify billing is enabled on that exact project (not just at org level).

## 3) Create Gemini API key credentials
1. In Google AI Studio (or the linked Google Cloud credential flow), create an API key.
2. Copy the key value immediately.
3. (Recommended) Restrict the key to the Gemini API and expected usage scope.

## 4) Add credentials to GitHub
1. In GitHub repo → Settings → Secrets and variables → Actions.
2. Click **New repository secret**.
3. Name: `GEMINI_API_KEY`
4. Value: your Gemini API key.
5. Save.

## 5) Run locally with credentials
```bash
export GEMINI_API_KEY="<your-key>"
python scripts/copygen/run.py --request requests/example_homepage.json
```

## 6) Run in GitHub Actions
1. Go to Actions → `copygen` → Run workflow.
2. Keep `request_path` as needed.
3. Run the workflow.

## Common errors
- `429 RESOURCE_EXHAUSTED`: billing/quota issue. Confirm billing + quota limits for the same project tied to the key.
- `GEMINI_API_KEY is not set`: secret/env missing.
- Contract errors: model output format violated required 3-part contract.
